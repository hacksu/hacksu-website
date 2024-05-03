<template>
  <div class="home">
    <Landing/>
    <Mission/>
    <Meetings/>
    <!-- <Involved/> -->
    <SocialMedia/>
  </div>
</template>

<script setup>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Mission from '@/components/Mission.vue'
import Meetings from '@/components/Location.vue'
// import Involved from '@/components/Involved.vue'
import SocialMedia from '@/components/SocialMedia.vue'
</script>

<style scoped lang="scss">

</style>
