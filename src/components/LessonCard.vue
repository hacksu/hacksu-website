<template>
  <div class="lesson-container" @click="$emit('click')">
    <div class="lesson">
      <h2 class="lesson-title">{{ displayName }}</h2>
      
      <p class="lesson-description" v-if="repo.description">
        {{ repo.description }}
      </p>
      
      <div class="lesson-footer">
        <span class="update-time">Updated {{ formatDate(repo.updated_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['repo']);

// Extract hierarchical category path from topics
// Topics should be like: ['lesson', 'frameworks', 'javascript', 'express']
// This creates a breadcrumb: Framework → Javascript → Express (most general to most specific)
const categoryPath = computed(() => {
  if (!props.repo.topics) return [];
  
  // Filter out 'lesson' tag and return the rest as category path
  // Reverse to show most general first (frameworks → javascript → express)
  return props.repo.topics
    .filter(topic => topic !== 'lesson')
    .reverse()
    .map(topic => topic.charAt(0).toUpperCase() + topic.slice(1)); // Capitalize
});

// Display topics excluding 'lesson' tag
const displayTopics = computed(() => {
  if (!props.repo.topics) return [];
  return props.repo.topics.filter(topic => topic !== 'lesson');
});

// Clean display name - remove category prefixes if present
// e.g., "angular-guestbook-lesson" → "Guestbook Lesson"
const displayName = computed(() => {
  let name = props.repo.name;
  
  // Remove category prefixes (e.g., "angular-" from "angular-guestbook-lesson")
  categoryPath.value.forEach(category => {
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

// Language colors based on GitHub's language colors
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
  'React': '#61dafb',
};

const getLanguageColor = (language) => {
  return languageColors[language] || '#8b949e';
};
</script>

<style scoped lang="scss">
.lesson-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 1;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto 0 auto;
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }
  
  &:active {
    transform: translateY(-3px);
  }
  
  &:first-of-type {
    margin-top: 0;
  }
}

.lesson {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  padding: 28px;
  overflow: hidden;
  box-sizing: border-box;
}

.lesson-title {
  font-size: 1.6rem;
  margin: 0 0 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  
  /* Truncate to single line */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lesson-description {
  margin: 0 0 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.05rem;
  width: 100%;
  box-sizing: border-box;
  
  /* Truncate to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.lesson-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  text-align: left;
}

.update-time {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}
</style>
