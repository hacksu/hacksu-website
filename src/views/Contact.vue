<template>
  <div class="contact">
    <div class="header">
      <div style="height: 5vh"/>
      <h1>{{ title }}</h1>
      <h3 class="description" v-html="description"/>
    </div>
    <div class="body">
      contact ok
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { contact as details } from '@/details'

export default {
  name: 'Contact',
  data() {
    return details;
  },
}
</script>

<style scoped lang="scss">

.contact {
  @include white-bg;
  .header {
    text-align: center;
    width: 100vw;
    padding-top: $navbar-height;
    padding-bottom: 5vh;
    background: linear-gradient(to top left, #35c982, #4683FF);
    .description {
      @include center;
      width: 80vw;
      max-width: 60vmin;
      font-weight: 200;
    }
  }
  .body {
    color: black;
  }
}



</style>
