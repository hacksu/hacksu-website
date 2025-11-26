<template>
  <nav class="lesson-breadcrumbs" v-if="breadcrumbs.length > 0">
    <router-link to="/lessons" class="breadcrumb-item">
      Lessons
    </router-link>
    <span class="breadcrumb-separator">/</span>
    
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link 
        v-if="index < breadcrumbs.length - 1"
        :to="getBreadcrumbPath(index)"
        class="breadcrumb-item"
      >
        {{ crumb }}
      </router-link>
      <span v-else class="breadcrumb-item current">{{ crumb }}</span>
      
      <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
    </template>
  </nav>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => []
  }
});

const getBreadcrumbPath = (index) => {
  const path = props.breadcrumbs.slice(0, index + 1);
  return `/lessons/${path.map(c => c.toLowerCase()).join('/')}`;
};
</script>

<style scoped lang="scss">
.lesson-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 6px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
  
  &.current {
    color: white;
    font-weight: 700;
    cursor: default;
  }
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
}
</style>
