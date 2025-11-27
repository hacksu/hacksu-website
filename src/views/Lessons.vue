<template>
  <div class="lessons-page-container">
    <h1 style="text-align: center;">HacKSU Lessons</h1>
    <p class="page-subtitle" v-if="!currentPath.length && !isSearching">
      Explore our collection of programming lessons and tutorials
    </p>
    
    <!-- Search Bar -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search lessons by title or tags..."
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>
    
    <!-- Breadcrumbs -->
    <LessonBreadcrumbs v-if="currentPath.length > 0 && !isSearching" :breadcrumbs="breadcrumbs" />
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading lessons from GitHub...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>⚠️ {{ error }}</p>
      <button @click="loadRepos" class="retry-button">Retry</button>
    </div>
    
    <!-- Search Results -->
    <div v-else-if="isSearching" class="search-results">
      <h2 class="search-results-title">
        {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }} found
      </h2>
      
      <div v-if="searchResults.length === 0" class="no-results">
        <p>No lessons found matching "{{ searchQuery }}"</p>
      </div>
      
      <div v-else class="results-list">
        <div
          v-for="result in searchResults"
          :key="result.repo.id"
          class="search-result-item"
          @click="navigateToSearchResult(result)"
        >
          <div class="result-breadcrumbs">
            <span v-for="(crumb, index) in result.breadcrumbs" :key="index" class="breadcrumb">
              {{ crumb }}
              <span v-if="index < result.breadcrumbs.length - 1" class="separator">→</span>
            </span>
          </div>
          <div class="result-title">{{ getItemDisplayName(result.repo, '') }}</div>
          <div v-if="result.repo.description" class="result-description">{{ result.repo.description }}</div>
        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div v-else>
      <!-- Root level: Show category cards -->
      <div v-if="isRootLevel" class="content-grid">
        <CategoryCard
          v-for="category in categories"
          :key="category"
          :categoryName="capitalize(category)"
          :itemCount="getCategoryItemCount(category)"
          @navigate="navigateToCategory(category)"
        />
      </div>
      
      <!-- Deeper levels: Show grouped sections -->
      <div v-else class="grouped-sections">
        <div v-for="(items, subcategory) in groupedItems" :key="subcategory" class="section">
          <h2 class="section-heading">{{ capitalize(subcategory) }}</h2>
          
          <!-- Show categories as cards or lessons as list items -->
          <div v-if="hasCategories(items)" class="category-grid">
            <template v-for="(item, index) in items" :key="typeof item === 'string' ? item : item.id">
              <!-- Category card for strings -->
              <CategoryCard
                v-if="typeof item === 'string'"
                :categoryName="capitalize(item)"
                :itemCount="getRecursiveLessonCount(currentPath, item)"
                @navigate="navigateToCategoryInSection(item, subcategory)"
              />
              <!-- Lesson card for objects -->
              <LessonCard
                v-else
                :repo="item"
                @click="navigateToLesson(item)"
              />
            </template>
          </div>
          
          <!-- Or show as cards if they're all lessons -->
          <div v-else class="section-lessons">
            <LessonCard
              v-for="item in items"
              :key="item.id"
              :repo="item"
              @click="navigateToLesson(item)"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="!loading && !error && categories.length === 0 && Object.keys(groupedItems).length === 0" class="empty-state">
      <p>No lessons found at this level.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGitHubRepos } from '../composables/useGitHubRepos.js';
import CategoryCard from '../components/CategoryCard.vue';
import LessonCard from '../components/LessonCard.vue';
import LessonBreadcrumbs from '../components/LessonBreadcrumbs.vue';

const route = useRoute();
const router = useRouter();
const { fetchRepos, getCategoriesAtLevel, getGroupedItemsAtLevel, searchLessons, getRecursiveLessonCount, loading, error } = useGitHubRepos();

// Search state
const searchQuery = ref('');
const searchResults = ref([]);

// Current path in the hierarchy
const currentPath = computed(() => {
  const pathMatch = route.params.pathMatch;
  // pathMatch can be undefined, a string, or an array
  if (!pathMatch) return [];
  if (Array.isArray(pathMatch)) return pathMatch;
  return pathMatch.split('/');
});

// Check if we're searching
const isSearching = computed(() => searchQuery.value.trim().length > 0);

// Check if we're at root level
const isRootLevel = computed(() => currentPath.value.length === 0 && !isSearching.value);

// Breadcrumbs for navigation
const breadcrumbs = computed(() => {
  return currentPath.value.map(segment => capitalize(segment));
});

// Categories at current level (for root)
const categories = ref([]);

// Grouped items by subcategory (for deeper levels)
const groupedItems = ref({});

// Check if items array contains any string categories
const hasCategories = (items) => {
  return items.some(item => typeof item === 'string');
};

// Load repositories and update view
const loadRepos = async () => {
  try {
    await fetchRepos();
    updateView();
  } catch (err) {
    console.error('Failed to load repositories:', err);
  }
};

// Update the view based on current path
const updateView = () => {
  const path = currentPath.value;
  
  if (isRootLevel.value) {
    // At root: show category cards
    categories.value = getCategoriesAtLevel(path);
    groupedItems.value = {};
  } else {
    // Deeper: show grouped sections
    categories.value = [];
    const grouped = getGroupedItemsAtLevel(path);
    groupedItems.value = grouped;
    
    // Auto-navigate if there's only one lesson and no categories
    const allItems = Object.values(grouped).flat();
    const hasOnlyOneLesson = allItems.length === 1 && typeof allItems[0] === 'object';
    
    if (hasOnlyOneLesson) {
      const lesson = allItems[0];
      navigateToLesson(lesson);
    }
  }
};

// Get count of items (categories + lessons) within a category
const getCategoryItemCount = (category) => {
  const newPath = [...currentPath.value, category.toLowerCase()];
  const grouped = getGroupedItemsAtLevel(newPath);
  return Object.values(grouped).reduce((sum, items) => sum + items.length, 0);
};

// Navigate to a category
const navigateToCategory = (category) => {
  const newPath = [...currentPath.value, category.toLowerCase()];
  router.push(`/lessons/${newPath.join('/')}`);
};

// Navigate to a category within a section
const navigateToCategoryInSection = (categoryName, subcategory) => {
  const newPath = [...currentPath.value, subcategory.toLowerCase(), categoryName.toLowerCase()];
  router.push(`/lessons/${newPath.join('/')}`);
};

// Navigate to a lesson detail page
const navigateToLesson = (lesson) => {
  const lessonPath = [...currentPath.value, lesson.name].join('/');
  router.push(`/lessons/detail/${lessonPath}`);
};

// Get display name for an item
const getItemDisplayName = (item, subcategory) => {
  if (typeof item === 'string') {
    // It's a category name - just capitalize it
    return capitalize(item);
  }
  
  // It's a lesson object
  let name = item.name;
  
  // Remove all category prefixes from the path including the subcategory
  const allPrefixes = [...currentPath.value, subcategory];
  allPrefixes.forEach(category => {
    const prefix = category.toLowerCase() + '-';
    if (name.toLowerCase().startsWith(prefix)) {
      name = name.substring(prefix.length);
    }
  });
  
  // Convert kebab-case to Title Case
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Capitalize first letter
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Handle search input
const handleSearch = () => {
  if (searchQuery.value.trim().length === 0) {
    searchResults.value = [];
    return;
  }
  
  searchResults.value = searchLessons(searchQuery.value);
};

// Navigate to search result
const navigateToSearchResult = (result) => {
  navigateToLesson(result.repo);
};

// Watch route changes to update view
watch(currentPath, () => {
  updateView();
});

// Watch search query
watch(searchQuery, () => {
  handleSearch();
});

// Load on mount
onMounted(() => {
  loadRepos();
});
</script>

<style scoped lang="scss">
.lessons-page-container {
  background: linear-gradient(to top left, #35c982, #4683FF);
  min-height: 100vh;
  padding: 80px 100px 100px 100px;
  
  @media (max-width: 700px) {
    padding: 100px 20px 60px 20px;
  }
  
  overflow: auto;
}

h1 {
  color: white;
  font-size: 3.5rem;
  margin-bottom: 12px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 700px) {
    font-size: 2.5rem;
  }
}

.page-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.3rem;
  margin-bottom: 40px;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 700px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
}

.search-container {
  max-width: 800px;
  margin: 0 auto 40px;
  position: relative;
  
  @media (max-width: 700px) {
    margin-bottom: 30px;
  }
}

.search-input {
  width: 100%;
  padding: 18px 55px 18px 24px;
  font-size: 1.1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  pointer-events: none;
}

.search-results {
  max-width: 1200px;
  margin: 0 auto;
}

.search-results-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.no-results {
  background: rgba(255, 255, 255, 0.1);
  padding: 48px;
  border-radius: 16px;
  text-align: center;
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin: 0;
  }
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-result-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  padding: 20px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
    transform: translateX(8px);
    border-color: rgba(255, 255, 255, 0.3);
  }
}

.result-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .separator {
    opacity: 0.6;
  }
}

.result-title {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.result-description {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  line-height: 1.5;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.grouped-sections {
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  margin-bottom: 48px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-heading {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
  letter-spacing: -0.5px;
  
  @media (max-width: 700px) {
    font-size: 1.8rem;
  }
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.section-lessons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.item-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}

.loading-container {
  text-align: center;
  padding: 80px 20px;
  color: white;
  
  p {
    margin-top: 24px;
    font-size: 1.3rem;
    font-weight: 500;
  }
}

.loading-spinner {
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top: 5px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 80px 20px;
  color: white;
  
  p {
    font-size: 1.3rem;
    margin-bottom: 24px;
    font-weight: 500;
  }
}

.retry-button {
  background: white;
  color: #4683FF;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    background: #f8f9fa;
  }
  
  &:active {
    transform: translateY(-1px);
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
}
</style>
