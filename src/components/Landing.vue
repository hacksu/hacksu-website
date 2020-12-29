<template>
  <div class="landing">

    <div class="hacksu-box box1" style=""/>
    <div class="hacksu-box box2" style=""/>
    <div class="background"/>

    <div class="content">
      <div class="buttons">
        <a
          v-for="(item, index) in social"
          v-bind:title="item.title"
          v-bind:href="item.link"
          v-bind:style="{ 'top': ('-' + (index * 10) + 'vh'), }"
        >
          <img v-bind:src="item.img">
        </a>
      </div>
      <img class="main-logo" src="@/assets/logo.svg">
      <h1>{{ title }}</h1>
      <p>{{ body }}</p>
      <br>
      <button>{{ button }}</button>
    </div>
  </div>
</template>

<script>
import { landing as details } from '@/details';

export default {
  name: 'Landing',
  data() {
    return details;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.landing {
  width: 100%;
	height: 100vh;
  overflow: hidden;

  .content {
    @include center;
    @include white;
    margin-top: 20vh;
    h1 {
      font-size: 6vh;
    }
    p {
      @include center;
      font-size: 3.5vh;
      width: 80vw;
      max-width: 80vh;
    }
    button {
      @include green-bg;
      font-size: 3vh;
      width: 60vw;
      max-width: 40vh;
    }
  }
  .main-logo {
    width: 60vw;
    max-width: 60vh;
  }
  .buttons {
    @include display-hide(mobile);
    position: absolute;
    width: 10vh;
    right: 30px;
    bottom: 30px;
    background: transparent;
    opacity: 0.25;
    float: right;
    a {

    }
    img {
      @include transition;
      width: 10vh;
      margin-top: 20px;
    }
  }
  .background {
    position: absolute;
    z-index: -2;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: #142027;
  }
}

.hacksu-box {
	position: absolute;
	background-image: url(../assets/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: 40vh;
	max-width: 50vw;
	height: 40vh;
	max-height: 50vw;
	z-index: -1;
  &.box1 {
    background-position-y: 7vh;
    background-position-x: -14vh;
    left: 0px;
    bottom: 0px;
  }
  &.box2 {
    transform: rotate(90deg);
    background-position-x: -7vh;
    background-position-y: -14vh;
    right: 0px;
    top: 0px;
  }
}

</style>
