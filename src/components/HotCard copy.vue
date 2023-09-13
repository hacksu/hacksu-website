<template>
  <div>
      <div class="landing card-front">

      <div class="hacksu-box box1" style=""/>
      <div class="hacksu-box box2" style=""/>
      <div class="background"/>

      <div class="content">
        <!-- <div class="buttons" hidden>
          <a
            v-for="(item, index) in social"
            v-bind:title="item.title"
            v-bind:href="item.link"
            v-bind:style="{ 'top': ('-' + (index * 10) + 'vh'), }"
          >
            <img v-bind:src="item.img">
          </a>
        </div> -->
        <img class="main-logo" src="@/assets/logo.svg">
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
        <br>
        <!-- <button v-on:click="getInvolved">{{ button }}</button> -->
        <img class="qr" src="@/assets/BlastOff-QR-21c.png">
        <p style="">{{ meetings }}</p>
      </div>
    </div>
    <div class="landing card-back">

      <div class="hacksu-box box1" style=""/>
      <div class="hacksu-box box2" style=""/>
      <div class="background"/>

      <div class="content" style="padding: 0.25in">
        <div style="float: left">
          <h3>hi</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { landing as details } from '@/details';
import BlastOffQR from '@/assets/BlastOff-QR-21b.png';

export default {
  name: 'Landing',
  data() {
    return {
      title: "Interested in Programming?",
      body: `Hacksu teaches anyone, regardless of skill level or major, how to code!`,
      meetings: `Tuesdays at 7 PM`,
      height: false,
    };
  },
  methods: {
    getInvolved() {
      this.$el.parentElement.querySelector('.meetings').scrollIntoView();
      window.scrollBy(0, -68);
    }
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

.qr {
  border-radius: 0.5em;
  max-height: 1.5in;
}

.landing {
  width: 4.25in;
  /*@include display-not(mobile) {
    height: 100vh;
  }
	height: 100vh;*/
  height: 5.5in;
  //min-height: -webkit-fill-available;
  overflow: hidden;

  .content {
    @include center;
    @include white;
    // margin-top: 20vh;
    h1 {
      font-size: calc(0.045 * 5.5in);
    }
    p {
      @include center;
      font-size: calc(0.035 * 5.5in);
      width: 80%;
      max-width: 80%;
    }
    button {
      @include green-bg;
      font-size: 1.5vh;
      width: 80%;
      max-width: 80%;
    }
  }
  .main-logo {
    margin-top: calc(0.075 * 5.5in);
    height: calc(0.2 * 5.5in);
  }
  .buttons {
    @include display-hide(mobile);
    position: absolute;
    width: 10%;
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
    //top: 0px;
    //left: 0px;
    height: 5.5in;
    width: 4.25in;
    background-color: #142027;
  }
}

.hacksu-box {
	position: absolute;
	background-image: url(../assets/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: calc(0.4 * 4.25in);
	max-width: calc(0.5 * 4.25in);
	height: calc(0.4 * 5.5in);
	max-height: calc(0.5 * 5.5in);
	z-index: -1;
  &.box1 {
    background-position-y: calc(0.15 * 5.5in);
    background-position-x: calc(-0.12 * 5.5in);
    left: 0px;
    top: calc(5.5in - (0.4 * 5.5in));
    /*@include mobile {
      top: calc(100vh - 50vw);
    }*/
  }
  &.box2 {
    transform: rotate(90deg);
    background-position-x: calc(-0.07 * 5.5in);
    background-position-y: calc(-0.14 * 5.5in);
    left: calc(4.25in - (0.46 * 4.25in));
    top:-30px;
  }
}

.card-back {
  overflow: hidden;
  z-index: -5;
  .background {
    z-index: -30;
  }
  .hacksu-box {
    z-index: -20;
    &.box1 {
      left: 0px;
      top: calc(5.5in + 5.5in - (0.4 * 5.5in));
    }
    &.box2 {
      left: calc(4.25in - (0.46 * 4.25in));
      top: calc(-30px + 5in);
    }
  }
}

</style>
