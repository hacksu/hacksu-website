<template>
  <router-link 
    v-if="to"
    :to="to" 
    class="hover-back-button"
    :class="{ 'is-easter-egg': isEasterEgg }"
    :style="{ top: `${buttonTop}px` }"
  >
    <div v-if="isEasterEgg" class="easter-egg-container">
      <img src="@/assets/images/beautiful_mason.png" alt="Back" class="easter-egg-img" />
    </div>
    <div v-else class="back-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </div>
    <span class="back-text">Back</span>
  </router-link>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

const isEasterEgg = ref(false);

// Mouse tracking for back button
const mouseY = ref(0);
const buttonTop = computed(() => {
  // Clamp the button position to keep it visible and not too close to edges
  return Math.max(100, Math.min(window.innerHeight - 100, mouseY.value));
});

const updateMousePosition = (e) => {
  mouseY.value = e.clientY;
};

onMounted(() => {
  // 1 in 50 chance
  isEasterEgg.value = Math.random() < (1/50);
  
  window.addEventListener('mousemove', updateMousePosition);
  // Initialize mouseY to center if not moved yet
  mouseY.value = window.innerHeight / 2;
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition);
});
</script>

<style scoped lang="scss">
.hover-back-button {
  position: fixed;
  left: 0;
  transform: translateY(-50%);
  background: white;
  padding: 12px 16px 12px 12px;
  border-radius: 0 50px 50px 0;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #4683FF;
  font-weight: 700;
  z-index: 100;
  transition: width 0.3s ease, padding 0.3s ease, transform 0.1s ease-out;
  width: 40px;
  overflow: hidden;
  white-space: nowrap;
  
  &:hover {
    width: 100px;
    
    .back-text {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &.is-easter-egg {
    padding: 0;
    background: transparent;
    box-shadow: none;
    width: auto;
    border-radius: 0;
    overflow: visible;
    
    &:hover {
      width: auto;
      transform: translateY(-50%) scale(1.1);
    }
    
    .back-text {
      display: none;
    }
  }
  
  @media (max-width: 900px) {
    display: none; // Hide on smaller screens as it might cover content
  }
}

.back-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.easter-egg-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.easter-egg-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.back-text {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}
</style>
