<template>
  <div class="home">
    <Landing/>
    <Meetings/>
    <Involved/>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Meetings from '@/components/Meetings.vue'
import Involved from '@/components/Involved.vue'

export default {
  name: 'Home',
  components: {
    Landing,
    Meetings,
    Involved
  }
}
</script>

<style scoped lang="scss">

</style>
