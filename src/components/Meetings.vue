<template>
  <div class="meetings">
    <h2>Meetings</h2>
    <p class="time">{{ time }}</p>
    <p v-if="virtual" class="location" v-html="location.virtual"></p>
    <p v-else class="location">
      <a :href="location.building.url"><b>{{location.building.name}}</b></a>
       - {{location.building.room}}
    </p>
    <a v-if="!virtual" class="building" v-bind:href="location.building.url">
      <div class="photo" v-bind:style="{ 'background-image': 'url(' + location.building.image + ')'}">

        <div class="map">
          <button class="show-map">Show me on a map</button>
        </div>
      </div>
    </a>
    <a v-if="discord && virtual" class="discord" v-bind:href="discord" v-bind:title="discord">
      <img src="@/assets/discord-white.svg">
    </a>
    <br>
    <!--<button v-on:click="virtual = !virtual" style="color: black; max-width: 80vw;">
      click me to toggle between virtual or not, for debugging purposes
    </button>-->
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
  padding-bottom: 10vh;
  overflow: hidden;

  a, a:visited {
    color: inherit;
  }
  h2 {
    font-size: 5vh;
  }
  .time, .location {
    @include center;
    width: 95vw;
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
  .building {
    text-decoration: none;
    color: white;
    .photo {
      @include rounded;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: inline-block;
      width: 60vw;
      height: 30vw;
      max-width: 800px;
      max-height: 400px;
      overflow: hidden;
      @include mobile {
        width: 80vw;
        height: 45vw;
      }
      .map {
        @include background(url('../assets/images/bowman-map.jpg'));
        height: 100%;
        opacity: 0;
        transition: opacity 0.25s, transform 0.25s;
      }
      .show-map {
        @include green-bg;
        position: relative;
        transition: opacity 0.25s, transform 0.25s, filter 0.25s;
        transform: scale(0.95);
        top: calc(50% - 3vh);
        min-width: 20vw;
        font-size: 3vh;
        //top: 20%;
      }
      /*@include mobile {
        .map {
          opacity: 1;
          background: transparent;
        }
        .show-map {
          font-size: 2vh;
          top: 10%;
        }
      }*/
      &:hover {
        .map {
          opacity: 1;
          transform: scale(1.05);
        }
        .show-map {
          transform: scale(1.1);
        }
      }
    }
  }
}

</style>
