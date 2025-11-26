<template>
  <div class="lesson-container" @click="$emit('click')">
    <div class="lesson">
      <!-- Hierarchical breadcrumb showing category path -->
      <div class="lesson-breadcrumb" v-if="categoryPath.length > 0">
        <span v-for="(category, index) in categoryPath" :key="index">
          <span class="breadcrumb-item">{{ category }}</span>
          <span v-if="index < categoryPath.length - 1" class="breadcrumb-separator">→</span>
        </span>
      </div>
      
      <div class="lesson-title">
        <img
          class="github-icon"
          src="@/assets/images/github-white.svg"
          alt="GitHub"
        />
        <h2>{{ displayName }}</h2>
      </div>
      
      <p class="lesson-description" v-if="repo.description">
        {{ repo.description }}
      </p>
      
      <div class="lesson-topics" v-if="displayTopics.length > 0">
        <span
          v-for="topic in displayTopics"
          :key="topic"
          class="topic-tag"
        >
          {{ topic }}
        </span>
      </div>
      
      <div class="lesson-footer">
        <div class="lesson-meta">
          <span v-if="repo.language" class="meta-item">
            <span class="language-dot" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
            {{ repo.language }}
          </span>
          <span class="meta-item">
            Updated {{ formatDate(repo.updated_at) }}
          </span>
        </div>
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
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto 0 auto;
  position: relative;
  max-width: 100%;
  min-height: 280px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
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
  
  a:visited,
  a {
    color: white;
  }
  
  h2 {
    display: inline;
    font-size: 1.6rem;
    margin: 0;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
}

.lesson-breadcrumb {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.breadcrumb-item {
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.breadcrumb-separator {
  margin: 0 2px;
  opacity: 0.6;
}

.lesson-title {
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.github-icon {
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.lesson-description {
  margin: 0 0 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.05rem;
}

.lesson-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.topic-tag {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25));
    transform: translateY(-1px);
  }
}

.lesson-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
}

.lesson-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.language-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

strong {
  font-weight: 700;
}
</style>
