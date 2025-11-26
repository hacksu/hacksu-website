<template>
  <div class="category-card" @click="navigateToCategory">
    <div class="category-icon">
      <Icon 
        v-if="getIconName(categoryName)" 
        :icon="getIconName(categoryName)"
        :width="160"
        :height="160"
      />
      <span v-else class="fallback-icon">{{ getFallbackIcon(categoryName) }}</span>
    </div>
    <h3 class="category-name">{{ categoryName }}</h3>
    <p class="category-count" v-if="itemCount > 0">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</p>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  categoryName: {
    type: String,
    required: true
  },
  itemCount: {
    type: Number,
    default: 0
  },
  path: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['navigate']);

const navigateToCategory = () => {
  emit('navigate', props.categoryName);
};

// Map category names to Iconify icon identifiers
const getIconName = (name) => {
  const iconMap = {
    // Languages
    'javascript': 'logos:javascript',
    'typescript': 'logos:typescript-icon',
    'python': 'logos:python',
    'java': 'logos:java',
    'ruby': 'logos:ruby',
    'go': 'logos:go',
    'rust': 'logos:rust',
    'php': 'logos:php',
    'swift': 'logos:swift',
    'kotlin': 'logos:kotlin',
    'csharp': 'logos:c-sharp',
    'c#': 'logos:c-sharp',
    
    // Frameworks/Libraries
    'react': 'logos:react',
    'vue': 'logos:vue',
    'angular': 'logos:angular-icon',
    'svelte': 'logos:svelte-icon',
    'nextjs': 'logos:nextjs-icon',
    'next': 'logos:nextjs-icon',
    'express': 'logos:express',
    'fastify': 'logos:fastify-icon',
    'flask': 'logos:flask',
    'django': 'logos:django-icon',
    'fastapi': 'logos:fastapi-icon',
    'spring': 'logos:spring-icon',
    'laravel': 'logos:laravel',
    'nodejs': 'logos:nodejs-icon',
    'node': 'logos:nodejs-icon',
    
    // Tools/Databases
    'git': 'logos:git-icon',
    'docker': 'logos:docker-icon',
    'kubernetes': 'logos:kubernetes',
    'mongodb': 'logos:mongodb-icon',
    'postgresql': 'logos:postgresql',
    'mysql': 'logos:mysql-icon',
    'redis': 'logos:redis',
  };
  
  return iconMap[name.toLowerCase()] || null;
};

// Fallback emoji icons
const getFallbackIcon = (name) => {
  const iconMap = {
    'framework': '🎨',
    'language': '🌐',
    'tool': '🔧',
    'database': '🗄️',
    'testing': '🧪',
    'other': '🎲',
    'library': '📚',
  };
  
  return iconMap[name.toLowerCase()] || '📁';
};
</script>

<style scoped lang="scss">
.category-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(70, 131, 255, 0.3);
  }
  
  &:active {
    transform: translateY(-3px);
  }
}

.category-icon {
  height: 160px;
  width: 160px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .fallback-icon {
    font-size: 5rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
}

.category-name {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.category-count {
  color: #6c757d;
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}
</style>

<style scoped lang="scss">
.category-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(70, 131, 255, 0.3);
  }
  
  &:active {
    transform: translateY(-3px);
  }
}

.category-icon {
  font-size: 3.5rem;
  margin-bottom: 14px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.category-name {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.category-count {
  color: #6c757d;
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}
</style>
