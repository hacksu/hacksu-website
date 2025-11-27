import { ref, computed } from 'vue';

// Cached repository data
const cachedRepos = ref([]);
const loading = ref(false);
const error = ref(null);
const lastFetch = ref(null);

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Parse a numbered tag like "framework-1" or "language-1a" into {name, level, chain}
 * Supports:
 * - Simple: "language-1" → {name: "language", level: 1, chain: undefined}
 * - Chain: "language-1a" → {name: "language", level: 1, chain: "a"}
 * - Multi-word: "game-engine-2" → {name: "game-engine", level: 2, chain: undefined}
 */
const parseTag = (tag) => {
    const match = tag.match(/^(.+)-(\d+)([a-z])?$/);
    if (match) {
        return {
            name: match[1],
            level: parseInt(match[2], 10),
            chain: match[3] || undefined
        };
    }
    return null;
};

/**
 * Get all numbered tags from a repo, grouped by chain and level
 * Returns: { 'a': { 1: ['language'], 2: ['bash'] }, '_default': { 1: ['other'], 2: ['development'], 3: ['unix'] } }
 */
const getTagsByLevel = (repo) => {
    if (!repo.topics || repo.topics.length === 0) return {};

    const tagsByChainAndLevel = {};

    repo.topics.forEach(topic => {
        const parsed = parseTag(topic);
        if (parsed) {
            const chainKey = parsed.chain || '_default';

            if (!tagsByChainAndLevel[chainKey]) {
                tagsByChainAndLevel[chainKey] = {};
            }

            if (!tagsByChainAndLevel[chainKey][parsed.level]) {
                tagsByChainAndLevel[chainKey][parsed.level] = [];
            }

            tagsByChainAndLevel[chainKey][parsed.level].push(parsed.name);
        }
    });

    return tagsByChainAndLevel;
};

/**
 * Vue composable for fetching and caching GitHub lesson repositories
 * Supports chain IDs for independent hierarchies
 */
export function useGitHubRepos() {

    const fetchRepos = async (force = false) => {
        if (!force && cachedRepos.value.length > 0 && lastFetch.value) {
            const timeSinceLastFetch = Date.now() - lastFetch.value;
            if (timeSinceLastFetch < CACHE_DURATION) {
                return cachedRepos.value;
            }
        }

        loading.value = true;
        error.value = null;

        try {
            const response = await fetch('/api/lessons/repos');

            if (!response.ok) {
                throw new Error(`Failed to fetch repositories: ${response.status}`);
            }

            const repos = await response.json();
            cachedRepos.value = repos;
            lastFetch.value = Date.now();
            return repos;
        } catch (err) {
            console.error('Error fetching repositories:', err);
            error.value = err.message || 'Failed to load repositories';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const getCategoriesAtLevel = (path = []) => {
        if (path.length === 0) {
            return ['Framework', 'Language', 'Library', 'Database', 'Other'];
        }

        const targetLevel = path.length + 1;
        const categories = new Set();

        cachedRepos.value.forEach(repo => {
            const tagsByChainAndLevel = getTagsByLevel(repo);

            Object.values(tagsByChainAndLevel).forEach(tagsByLevel => {
                const matchesPath = path.every((segment, index) => {
                    const tagsAtLevel = tagsByLevel[index + 1] || [];
                    return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
                });

                if (matchesPath) {
                    const nextLevelTags = tagsByLevel[targetLevel] || [];
                    nextLevelTags.forEach(tag => categories.add(tag));
                }
            });
        });

        return Array.from(categories).sort();
    };

    const getLessonsAtLevel = (path = []) => {
        return cachedRepos.value.filter(repo => {
            const tagsByChainAndLevel = getTagsByLevel(repo);

            return Object.values(tagsByChainAndLevel).some(tagsByLevel => {
                const maxLevel = Math.max(...Object.keys(tagsByLevel).map(Number), 0);

                if (maxLevel !== path.length) return false;

                return path.every((segment, index) => {
                    const tagsAtLevel = tagsByLevel[index + 1] || [];
                    return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
                });
            });
        });
    };

    const getGroupedItemsAtLevel = (path = []) => {
        const grouped = {};
        const currentDepth = path.length;

        cachedRepos.value.forEach(repo => {
            const tagsByChainAndLevel = getTagsByLevel(repo);

            Object.values(tagsByChainAndLevel).forEach(tagsByLevel => {
                const maxLevel = Math.max(...Object.keys(tagsByLevel).map(Number), 0);

                const matchesPath = path.every((segment, index) => {
                    const tagsAtLevel = tagsByLevel[index + 1] || [];
                    return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
                });

                if (matchesPath) {
                    if (maxLevel === currentDepth) {
                        const currentLevelTags = tagsByLevel[currentDepth] || [];
                        currentLevelTags.forEach(categoryTag => {
                            if (path.length === 0 || categoryTag.toLowerCase() === path[currentDepth - 1].toLowerCase()) {
                                const groupKey = categoryTag;

                                if (!grouped[groupKey]) {
                                    grouped[groupKey] = new Set();
                                }

                                grouped[groupKey].add(repo);
                            }
                        });
                    }
                    else if (maxLevel > currentDepth) {
                        const nextLevelTags = tagsByLevel[currentDepth + 1] || [];

                        nextLevelTags.forEach(nextTag => {
                            const groupKey = nextTag;

                            if (!grouped[groupKey]) {
                                grouped[groupKey] = new Set();
                            }

                            if (maxLevel > currentDepth + 1) {
                                const deeperLevelTags = tagsByLevel[currentDepth + 2] || [];
                                deeperLevelTags.forEach(tag => grouped[groupKey].add(tag));
                            } else {
                                grouped[groupKey].add(repo);
                            }
                        });
                    }
                }
            });
        });

        const result = {};
        Object.keys(grouped).forEach(key => {
            result[key] = Array.from(grouped[key]);
        });

        return result;
    };

    const getLessonByPath = (path) => {
        const repoName = path[path.length - 1];
        return cachedRepos.value.find(repo => repo.name === repoName) || null;
    };

    const getBreadcrumbs = (repo) => {
        if (!repo) return [];

        const tagsByChainAndLevel = getTagsByLevel(repo);
        const chains = Object.keys(tagsByChainAndLevel);

        if (chains.length === 0) return [];

        const firstChain = tagsByChainAndLevel[chains[0]];
        const levels = Object.keys(firstChain).map(Number).sort((a, b) => a - b);

        return levels.map(level => {
            const tags = firstChain[level];
            const firstTag = tags[0];
            return firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
        });
    };

    const searchLessons = (query) => {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();

        return cachedRepos.value
            .filter(repo => {
                if (repo.name.toLowerCase().includes(searchTerm)) {
                    return true;
                }

                if (repo.description && repo.description.toLowerCase().includes(searchTerm)) {
                    return true;
                }

                const tagsByChainAndLevel = getTagsByLevel(repo);
                const allTags = Object.values(tagsByChainAndLevel)
                    .flatMap(chain => Object.values(chain))
                    .flat();

                if (allTags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                    return true;
                }

                return false;
            })
            .map(repo => ({
                repo,
                breadcrumbs: getBreadcrumbs(repo),
                name: repo.name
            }));
    };

    return {
        cachedRepos: computed(() => cachedRepos.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),

        fetchRepos,
        getCategoriesAtLevel,
        getLessonsAtLevel,
        getGroupedItemsAtLevel,
        getLessonByPath,
        getBreadcrumbs,
        searchLessons
    };
}
