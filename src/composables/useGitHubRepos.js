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
 * Get all numbered tags from a repo, sorted by level
 */
const getOrderedTags = (repo) => {
    if (!repo.topics || repo.topics.length === 0) return [];

    const numberedTags = repo.topics
        .map(parseTag)
        .filter(tag => tag !== null)
        .sort((a, b) => a.level - b.level);

    return numberedTags;
};

/**
 * Vue composable for fetching and caching GitHub lesson repositories
 * With numbered tag hierarchy (e.g., framework-1, javascript-2, express-3)
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
     * Get categories at root level
     */
    const getCategoriesAtLevel = (path = []) => {
        if (path.length === 0) {
            return ['Framework', 'Language', 'Library', 'Database', 'Other'];
        }

        const targetLevel = path.length + 1;
        const categories = new Set();

        cachedRepos.value.forEach(repo => {
            const orderedTags = getOrderedTags(repo);

            const matchesPath = path.every((segment, index) => {
                const tagAtLevel = orderedTags.find(t => t.level === index + 1);
                return tagAtLevel && tagAtLevel.name.toLowerCase() === segment.toLowerCase();
            });

            if (matchesPath) {
                const nextTag = orderedTags.find(t => t.level === targetLevel);
                if (nextTag) {
                    categories.add(nextTag.name);
                }
            }
        });

        return Array.from(categories).sort();
    };

    /**
     * Get lessons at a specific level
     */
    const getLessonsAtLevel = (path = []) => {
        return cachedRepos.value.filter(repo => {
            const orderedTags = getOrderedTags(repo);

            if (orderedTags.length !== path.length) return false;

            return path.every((segment, index) => {
                const tagAtLevel = orderedTags.find(t => t.level === index + 1);
                return tagAtLevel && tagAtLevel.name.toLowerCase() === segment.toLowerCase();
            });
        });
    };

    /**
     * Get items grouped by next level tag
     */
    const getGroupedItemsAtLevel = (path = []) => {
        const grouped = {};
        const currentDepth = path.length;

        cachedRepos.value.forEach(repo => {
            const orderedTags = getOrderedTags(repo);

            // Check if repo matches current path
            const matchesPath = path.every((segment, index) => {
                const tagAtLevel = orderedTags.find(t => t.level === index + 1);
                return tagAtLevel && tagAtLevel.name.toLowerCase() === segment.toLowerCase();
            });

            if (matchesPath) {
                // If this repo has exactly the same depth as current path, it's a leaf lesson
                if (orderedTags.length === currentDepth) {
                    const groupKey = currentDepth > 0 ? path[currentDepth - 1] : 'lessons';

                    if (!grouped[groupKey]) {
                        grouped[groupKey] = new Set();
                    }

                    grouped[groupKey].add(repo);
                }
                // If repo has more depth, process it
                else if (orderedTags.length > currentDepth) {
                    const nextLevelTag = orderedTags[currentDepth];

                    if (nextLevelTag) {
                        const groupKey = nextLevelTag.name;

                        if (!grouped[groupKey]) {
                            grouped[groupKey] = new Set();
                        }

                        // If there's yet another level deeper
                        if (orderedTags.length > currentDepth + 1) {
                            const deeperLevelTag = orderedTags[currentDepth + 1];
                            grouped[groupKey].add(deeperLevelTag.name);
                        } else {
                            // This is the final level - add the repo
                            grouped[groupKey].add(repo);
                        }
                    }
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
     */
    const getBreadcrumbs = (repo) => {
        if (!repo) return [];

        const orderedTags = getOrderedTags(repo);
        return orderedTags.map(tag =>
            tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
        );
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
