<template>
  <div class="home">
    <Landing/>
    <Meetings/>
    <Involved/>
    <SocialMedia/>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Meetings from '@/components/Meetings.vue'
import Involved from '@/components/Involved.vue'
import SocialMedia from '@/components/SocialMedia.vue'

export default {
  name: 'Home',
  components: {
    Landing,
    Meetings,
    Involved,
    SocialMedia
  }
}
</script>

<style scoped lang="scss">

</style>
