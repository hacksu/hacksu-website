<template>
  <div class="involved">
    <div class="details">
      <h2>Get Involved!</h2>
      <p>{{ title }}</p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import { involved as details } from '@/details';

export default {
  name: 'Involved',
  data() {
    return details;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.involved {
  @include center;
  @include white-bg;
  color: black;
  padding-top: 5vh;
  padding-bottom: 5vh;
  h2 {
    font-size: 4vh;
  }
  .details {
    p {
      @include center;
      max-width: 80vw;
      font-size: 2.5vh;
    }
  }
}

</style>
