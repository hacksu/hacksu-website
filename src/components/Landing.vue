<template>
  <div class="landing" v-bind:style="(height) ? { 'height': height + 'px', } : {}">

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
          :key="item.link"
        >
          <img v-bind:src="item.img">
        </a>
      </div>
      <img class="main-logo" src="@/assets/logo.svg">
      <h1>{{ title }}</h1>
      <p>{{ body }}</p>
      <br>
      <button id="get-involved"><a href="#involved">{{ button }}</a></button>
    </div>
  </div>
</template>

<script>
import { landing as details } from '@/details';

export default {
  name: 'Landing',
  data() {
    return {
      ...details,
      height: false,
    };
  },
  mounted() {
    /*
      This is to fix a weird issue with the address bar on mobile browsers
      changing in height as you scroll, which leads to big fuckups
      with the responsiveness of this component, as it is set to
      100vh, or 100% of vertical height of the display....
        ....which changes when you scroll..... great, right?

      so to fix this, we manually detect the height of the browser with code,
      which bypasses the cheap magic the address bar uses (technically, it
      just pushes the page downard off-screen, meaning 100vh is placed
      beyond the bottom of your screen, which is unintended side effect).
      So, we set the height of the element to the ACTUAL height if there
      is a mismatch between its CSS 100vh height and the actual browser height
      (aka, window.innerHeight).
    */
    let landingHeight = document.querySelector('.landing').clientHeight;
    let totalHeight = window.innerHeight;
    if (landingHeight != totalHeight) {
      this.height = totalHeight;
    }
    //this.height = [landingHeight, totalHeight]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.landing {
  width: 100%;
  /*@include display-not(mobile) {
    height: 100vh;
  }
	height: 100vh;*/
  height: 100vh;
  //min-height: -webkit-fill-available;
  overflow: hidden;

  #get-involved {
    @include transition;
  }

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
      a, a:visited {
        text-decoration: none;
        color: white;
      }
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
    @include display-not(mobile) {
      bottom: 0px;
    }
    /*@include mobile {
      top: calc(100vh - 50vw);
    }*/
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
