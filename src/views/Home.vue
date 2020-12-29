<template>
  <div class="home">
    <Landing/>
    <Meetings/>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Meetings from '@/components/Meetings.vue'

export default {
  name: 'Home',
  components: {
    Landing,
    Meetings
  }
}
</script>

<style scoped lang="scss">

</style>
