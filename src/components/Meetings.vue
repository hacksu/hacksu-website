<template>
  <div class="meetings">
    <h2>Meetings</h2>
    <p class="time">{{ time }}</p>
    <p v-if="virtual" class="location" v-html="location.virtual"></p>
    <p v-else="virtual" class="location" v-html="location.building.details"></p>
    <div v-if="!virtual">

    </div>
    <a v-if="discord && virtual" class="discord" v-bind:href="discord">
      <img src="@/assets/discord-white.svg">
    </a>
  </div>
</template>

<script>
import { meetings as details } from '@/details';

export default {
  name: 'Meetings',
  data() {
    return details;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.meetings {
  @include background(linear-gradient(to top left, #35c982, #4683FF));
  @include center;
  width: 100%;
	//min-height: 100vh;
  padding-top: 5vh;
  padding-bottom: 5vh;
  overflow: hidden;

  h2 {
    font-size: 5vh;
  }
  .time, .location {
    @include center;
    width: 90vw;
    max-width: 80vh;
  }
  .time {
    font-size: 3.5vh;
    margin-bottom: 1.5vh;
  }
  .location {
    font-size: 2.5vh;
    margin-top: 0px;
  }
  .discord {
    @include transition;
    @include center;
    @include rounded;
    display: inline-block;
    background: transparent;
    cursor: pointer;
    img {
      height: 20vmin;
      max-width: 40vh;
      max-height: 20vh;
    }
  }
}

</style>
