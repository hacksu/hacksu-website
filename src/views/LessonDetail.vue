<template>
  <div class="lesson-detail-container">
    <LessonBreadcrumbs v-if="breadcrumbs.length > 0" :breadcrumbs="breadcrumbs" />
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading lesson...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error || !lesson" class="error-container">
      <p>⚠️ Lesson not found</p>
      <router-link to="/lessons" class="back-button">Back to Lessons</router-link>
    </div>
    
    <!-- Lesson Content -->
    <div v-else class="lesson-content">
      <!-- Header -->
      <div class="lesson-header">
        <h1 class="lesson-title">{{ displayName }}</h1>
        <div class="lesson-meta">
          <span
            v-if="lesson.language"
            class="meta-item"
          >
            <span
              class="language-dot"
              :style="{ backgroundColor: getLanguageColor(lesson.language) }"
            ></span>
            {{ lesson.language }}
          </span>
          <span class="meta-item">
            Updated {{ formatDate(lesson.updated_at) }}
          </span>
          <a
            :href="lesson.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
          >
            <img src="@/assets/images/github-white.svg" alt="GitHub" class="github-icon" />
            View on GitHub
          </a>
        </div>
      </div>
      
      <!-- README Content -->
      <div v-if="readmeLoading" class="readme-loading">
        <div class="loading-spinner"></div>
        <p>Loading README...</p>
      </div>
      <div class="readme-container" v-else-if="readme">
        <div class="readme-content" v-html="readme"></div>
      </div>
      <div v-else class="no-readme">
        <p>No README available for this lesson.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGitHubRepos } from '../composables/useGitHubRepos.js';
import LessonBreadcrumbs from '../components/LessonBreadcrumbs.vue';

const route = useRoute();
const { fetchRepos, getLessonByPath, getBreadcrumbs, loading: reposLoading, error: reposError } = useGitHubRepos();

const lesson = ref(null);
const readme = ref(null);
const readmeLoading = ref(false);
const readmeError = ref(null);

// Combined loading state
const loading = computed(() => reposLoading.value || readmeLoading.value);
const error = computed(() => reposError.value || readmeError.value);

// Extract path from route
const lessonPath = computed(() => {
  const pathMatch = route.params.pathMatch;
  // pathMatch can be undefined, a string, or an array
  if (!pathMatch) return [];
  if (Array.isArray(pathMatch)) return pathMatch;
  return pathMatch.split('/');
});

// Breadcrumbs including the lesson name
const breadcrumbs = computed(() => {
  if (!lesson.value) return [];
  return getBreadcrumbs(lesson.value);
});

// Clean display name
const displayName = computed(() => {
  if (!lesson.value) return '';
  
  let name = lesson.value.name;
  
  // Remove category prefixes
  breadcrumbs.value.forEach(category => {
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
});

// Fetch README on demand
const fetchReadme = async (repoName) => {
  readmeLoading.value = true;
  readmeError.value = null;
  
  try {
    const response = await fetch(`/api/lessons/repos/${repoName}/readme`);
    
    if (!response.ok) {
      if (response.status === 404) {
        readme.value = null;
        return;
      }
      throw new Error('Failed to fetch README');
    }
    
    const data = await response.json();
    readme.value = data.readme;
  } catch (err) {
    console.error('Error fetching README:', err);
    readmeError.value = err.message;
  } finally {
    readmeLoading.value = false;
  }
};

// Load lesson
const loadLesson = async () => {
  try {
    await fetchRepos();
    const lessonData = getLessonByPath(lessonPath.value);
    lesson.value = lessonData;
    
    // Fetch README after lesson is loaded
    if (lessonData) {
      await fetchReadme(lessonData.name);
    }
  } catch (err) {
    console.error('Failed to load lesson:', err);
  }
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
};

// Language colors
const languageColors = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'C#': '#178600',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#ffac45',
  'Kotlin': '#A97BFF',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Vue': '#41b883',
};

const getLanguageColor = (language) => {
  return languageColors[language] || '#8b949e';
};

onMounted(() => {
  loadLesson();
});
</script>

<style scoped lang="scss">
.lesson-detail-container {
  background: linear-gradient(to top left, #35c982, #4683FF);
  min-height: 100vh;
  padding: 80px 100px 100px 100px;
  
  @media (max-width: 700px) {
    padding: 100px 20px 60px 20px;
  }
}

.lesson-content {
  max-width: 1200px;
  margin: 0 auto;
}

.lesson-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  padding: 32px;
  border-radius: 20px;
  margin-bottom: 32px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.lesson-title {
  color: white;
  font-size: 3rem;
  margin: 0 0 20px;
  font-weight: 800;
  letter-spacing: -1px;
  
  @media (max-width: 700px) {
    font-size: 2rem;
  }
}

.lesson-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.github-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}

.github-icon {
  width: 24px;
  height: 24px;
}

.readme-loading {
  background: white;
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  color: #6a737d;
  
  .loading-spinner {
    border: 4px solid rgba(70, 131, 255, 0.2);
    border-top: 4px solid #4683FF;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 1.1rem;
    margin: 0;
  }
}

.readme-container {
  background: white;
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 700px) {
    padding: 24px;
  }
}

.readme-content {
  color: #333;
  line-height: 1.7;
  
  &:deep(h1), &:deep(h2), &:deep(h3), &:deep(h4), &:deep(h5), &:deep(h6) {
    margin-top: 24px;
    margin-bottom: 12px;
    color: #2c3e50;
    font-weight: 700;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  &:deep(h1) { 
    font-size: 2.5rem;
    border-bottom: 2px solid #e1e4e8;
    padding-bottom: 12px;
  }
  &:deep(h2) { 
    font-size: 2rem;
    border-bottom: 1px solid #e1e4e8;
    padding-bottom: 8px;
  }
  &:deep(h3) { font-size: 1.6rem; }
  &:deep(h4) { font-size: 1.3rem; }
  
  &:deep(p) {
    margin-bottom: 16px;
  }
  
  &:deep(code) {
    background-color: #f6f8fa;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
    color: #d73a49;
    border: 1px solid #e1e4e8;
  }
  
  &:deep(pre) {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 16px;
    border: 1px solid #e1e4e8;
    
    code {
      background-color: transparent;
      padding: 0;
      border: none;
      color: inherit;
    }
  }
  
  &:deep(a) {
    color: #0366d6;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  &:deep(ul), &:deep(ol) {
    margin-left: 24px;
    margin-bottom: 16px;
    
    li {
      margin-bottom: 8px;
    }
  }
  
  &:deep(blockquote) {
    border-left: 4px solid #dfe2e5;
    padding-left: 16px;
    margin: 16px 0;
    color: #6a737d;
  }
  
  &:deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 16px;
    
    th, td {
      border: 1px solid #e1e4e8;
      padding: 8px 12px;
      text-align: left;
    }
    
    th {
      background-color: #f6f8fa;
      font-weight: 700;
    }
    
    tr:nth-child(even) {
      background-color: #f6f8fa;
    }
  }
  
  &:deep(img) {
    max-width: 100%;
    border-radius: 8px;
    margin: 16px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:deep(hr) {
    border: none;
    border-top: 1px solid #e1e4e8;
    margin: 24px 0;
  }
}

.loading-container, .error-container {
  text-align: center;
  padding: 80px 20px;
  color: white;
  
  p {
    font-size: 1.3rem;
    margin-bottom: 24px;
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

.back-button, .retry-button {
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
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    background: #f8f9fa;
  }
}

.no-readme {
  background: white;
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  color: #6a737d;
  font-size: 1.2rem;
}
</style>
