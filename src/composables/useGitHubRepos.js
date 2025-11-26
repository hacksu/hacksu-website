import { ref, computed } from 'vue';

// Cached repository data
const cachedRepos = ref([]);
const loading = ref(false);
const error = ref(null);
const lastFetch = ref(null);

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Parse a numbered tag like "framework-1" into {name: "framework", level: 1}
 */
const parseTag = (tag) => {
    const match = tag.match(/^(.+)-(\d+)$/);
    if (match) {
        return {
            name: match[1],
            level: parseInt(match[2], 10)
        };
    }
    return null;
};

/**
 * Get all numbered tags from a repo, grouped by level
 * Returns: { 1: ['framework'], 2: ['html', 'javascript', 'css'] }
 */
const getTagsByLevel = (repo) => {
    if (!repo.topics || repo.topics.length === 0) return {};

    const tagsByLevel = {};

    repo.topics.forEach(topic => {
        const parsed = parseTag(topic);
        if (parsed) {
            if (!tagsByLevel[parsed.level]) {
                tagsByLevel[parsed.level] = [];
            }
            tagsByLevel[parsed.level].push(parsed.name);
        }
    });

    return tagsByLevel;
};

/**
 * Vue composable for fetching and caching GitHub lesson repositories
 * Supports multiple tags at the same level (e.g., html-2, javascript-2, css-2)
 */
export function useGitHubRepos() {

    /**
     * Fetch repositories from the server API
     */
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

    /**
     * Get categories at current level
     */
    const getCategoriesAtLevel = (path = []) => {
        if (path.length === 0) {
            return ['Framework', 'Language', 'Library', 'Database', 'Other'];
        }

        const targetLevel = path.length + 1;
        const categories = new Set();

        cachedRepos.value.forEach(repo => {
            const tagsByLevel = getTagsByLevel(repo);

            // Check if repo matches current path (any tag at each level matches)
            const matchesPath = path.every((segment, index) => {
                const tagsAtLevel = tagsByLevel[index + 1] || [];
                return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
            });

            if (matchesPath) {
                // Add all tags at the next level
                const nextLevelTags = tagsByLevel[targetLevel] || [];
                nextLevelTags.forEach(tag => categories.add(tag));
            }
        });

        return Array.from(categories).sort();
    };

    /**
     * Get lessons at a specific level
     */
    const getLessonsAtLevel = (path = []) => {
        return cachedRepos.value.filter(repo => {
            const tagsByLevel = getTagsByLevel(repo);
            const maxLevel = Math.max(...Object.keys(tagsByLevel).map(Number), 0);

            // Must have exactly as many levels as path length
            if (maxLevel !== path.length) return false;

            // Must match all path segments (any tag at each level)
            return path.every((segment, index) => {
                const tagsAtLevel = tagsByLevel[index + 1] || [];
                return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
            });
        });
    };

    /**
     * Get items grouped by next level tag
     * Handles multiple tags per level - repo appears under ALL matching tags
     */
    const getGroupedItemsAtLevel = (path = []) => {
        const grouped = {};
        const currentDepth = path.length;

        cachedRepos.value.forEach(repo => {
            const tagsByLevel = getTagsByLevel(repo);
            const maxLevel = Math.max(...Object.keys(tagsByLevel).map(Number), 0);

            // Check if repo matches current path
            const matchesPath = path.every((segment, index) => {
                const tagsAtLevel = tagsByLevel[index + 1] || [];
                return tagsAtLevel.some(tag => tag.toLowerCase() === segment.toLowerCase());
            });

            if (matchesPath) {
                // If this repo has exactly the same depth as current path, it's a leaf lesson
                if (maxLevel === currentDepth) {
                    // Add to all categories at current level
                    const currentLevelTags = tagsByLevel[currentDepth] || [];
                    currentLevelTags.forEach(categoryTag => {
                        // Only include if it matches the last segment of the path
                        if (path.length === 0 || categoryTag.toLowerCase() === path[currentDepth - 1].toLowerCase()) {
                            const groupKey = categoryTag;

                            if (!grouped[groupKey]) {
                                grouped[groupKey] = new Set();
                            }

                            grouped[groupKey].add(repo);
                        }
                    });
                }
                // If repo has more depth, process it
                else if (maxLevel > currentDepth) {
                    const nextLevelTags = tagsByLevel[currentDepth + 1] || [];

                    // Add repo under each next-level tag
                    nextLevelTags.forEach(nextTag => {
                        const groupKey = nextTag;

                        if (!grouped[groupKey]) {
                            grouped[groupKey] = new Set();
                        }

                        // If there's yet another level deeper
                        if (maxLevel > currentDepth + 1) {
                            const deeperLevelTags = tagsByLevel[currentDepth + 2] || [];
                            deeperLevelTags.forEach(tag => grouped[groupKey].add(tag));
                        } else {
                            // This is the final level - add the repo
                            grouped[groupKey].add(repo);
                        }
                    });
                }
            }
        });

        // Convert Sets to Arrays
        const result = {};
        Object.keys(grouped).forEach(key => {
            result[key] = Array.from(grouped[key]);
        });

        return result;
    };

    /**
     * Get a specific lesson by its path
     */
    const getLessonByPath = (path) => {
        const repoName = path[path.length - 1];
        return cachedRepos.value.find(repo => repo.name === repoName) || null;
    };

    /**
     * Get breadcrumb path for a repository
     * For multi-tag repos, uses the first tag at each level
     */
    const getBreadcrumbs = (repo) => {
        if (!repo) return [];

        const tagsByLevel = getTagsByLevel(repo);
        const levels = Object.keys(tagsByLevel).map(Number).sort((a, b) => a - b);

        return levels.map(level => {
            const tags = tagsByLevel[level];
            const firstTag = tags[0]; // Use first tag as primary
            return firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
        });
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
        getBreadcrumbs
    };
}
