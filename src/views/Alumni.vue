<template>
  <div class="alumni">
    <div class="header">
      <div style="height: 5vh"/>
      <h1>{{ title }}</h1>
      <span v-html="header"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { alumni as details } from '@/details'

export default {
  name: 'Alumni',
  data() {
    return details;
  },
}
</script>

<style scoped lang="scss">

.alumni {
  .header {
    text-align: center;
    width: 100vw;
    padding-top: $navbar-height;
    padding-bottom: 5vh;
    background: linear-gradient(to top left, #35c982, #4683FF);
  }
}

</style>
