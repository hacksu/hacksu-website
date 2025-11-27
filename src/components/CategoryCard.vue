<template>
  <div class="category-card" @click="navigateToCategory">
    <div class="category-icon">
      <Icon 
        v-if="getIconName(categoryName)" 
        :icon="getIconName(categoryName)"
        :width="140"
        :height="140"
      />
      <span v-else class="fallback-icon">{{ getFallbackIcon(categoryName) }}</span>
    </div>
    <h3 class="category-name">{{ categoryName }}</h3>
    <p class="category-count" v-if="itemCount > 0">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</p>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { remult } from 'remult';
import { LessonIcon } from '../../db/entities';
import { ref, onMounted } from 'vue';

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

// Icon mappings loaded from database
const iconMappings = ref({});

onMounted(async () => {
  try {
    const repo = remult.repo(LessonIcon);
    const icons = await repo.find();
    iconMappings.value = Object.fromEntries(
      icons.map(icon => [icon.categoryName.toLowerCase(), icon.iconifyId])
    );
  } catch (error) {
    console.error('Error loading icon mappings:', error);
  }
});

// Get icon from database mappings
const getIconName = (name) => {
  return iconMappings.value[name.toLowerCase()] || null;
};

// Fallback emoji icons
const getFallbackIcon = (name) => {
  const emojiMap = {
    'javascript': '🟨',
    'typescript': '🔷',
    'python': '🐍',
    'rust': '🦀',
    'java': '☕',
    'go': '🐹',
    'ruby': '💎',
    'php': '🐘',
    'swift': '🦅',
    'kotlin': '🟪',
    'csharp': '🔵',
    'c': '🗂️',
    'cs': '🔵',
    'framework': '🏗️',
    'language': '📝',
    'library': '📚',
    'tool': '🔧',
    'database': '🗄️',
    'testing': '🧪',
    'other': '🎲',
  };
  
  return emojiMap[name.toLowerCase()] || '📁';
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
