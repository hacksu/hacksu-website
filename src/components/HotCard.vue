<template>
  <div>
      <div class="landing card-front">

      <div class="guidelines">
        
      </div>

      <!-- <span style="transform: scale(2)"> -->
      <div class="hacksu-box box1 inversed" style=""/>
      <div class="hacksu-box box2 inversed" style=""/>
      <!-- </span> -->
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
        <h1 style="margin-bottom: 0px;">{{ title }}</h1>
        <p class="main-p" style="margin-top: 5px;">{{ body }}</p>
        <!-- <button v-on:click="getInvolved">{{ button }}</button> -->
        <!-- <img class="qr" style="margin-top: 5px;" src="@/assets/BlastOff-QR-21d.png"> -->
        <img class="qr" style="margin-top: 5px;" src="@/assets/HacKSU_Discord.png">
        <p style="margin-top: 2.5px; margin-bottom: 0px; font-size: 0.85em; opacity: 0.65;">{{ discord }}</p>
        <p style="margin-bottom: 0px; margin-top: 10px;">{{ meetings }}</p>
        <p style="margin-bottom: 5px; margin-top: 0px;">{{ meetings2 }}</p>
        <p style="margin-top: 0px; opacity: 0.5; font-size: 0.85em; margin-bottom: 10px;">hacksu.com</p>
        
      </div>
    </div>
    <div class="landing card-back">

      <div class="guidelines">
        
      </div>

      <div class="hacksu-box box1" style=""/>
      <div class="hacksu-box box2" style=""/>
      <div class="background"/>

      <div class="content" style="padding: 0.35in; padding-top: 0.15in;">
        <div style="float: left">
          <h3 style="text-align: left; margin-bottom: 5px;">We'll show you how to...</h3>
          <ul class="dashed" style="text-align: left;">
            <li v-for="(item, index) in showcases" v-html="item" v-bind:key="item" style="margin-bottom: 0px;"></li>
            <li class="no-before2" style="a-padding-left: 15px">And much more!</li>
          </ul>
          <p style="text-align: left; margin-top: 5px; margin-bottom: 10px;">Even if you have no experience, we'll show you the ropes; regardless of your major!</p>
        </div>
        <div style="float: left; text-align: left;">
          <h3 style="margin-bottom: 5px; margin-top: 10px;">Interested in the Career Fair?</h3>
          <p style="margin-top: 0px; margin-bottom: 0px">We host a resume workshop and bring in real managers to do mock interviews and give feedback on your resume!</p>
        </div>
        <div style="float: right; text-align: right;">
          <h3 style="text-align: right; margin-bottom: 5px; margin-top: 10px;">Just want to socialize?</h3>
          <p style="text-align: right; max-width: calc(0.625 * 4.5in); margin-top: 0px;">HacKSU is a great place to chat about coding and technology, or just hang out and play games!</p>
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
      title: "Interested in Coding?",
      body: `HacKSU teaches anyone, regardless of skill level or major, how to code!`,
      meetings: `Tuesdays, 7PM - 8PM`,
      meetings2: `via Discord`,
      discord: 'discord.gg/sfBBXCJt83',
      showcases: [
        "Design a website",
        "Create a mobile app",
        "Write a Discord bot",
        "Host a webserver",
        "Debug a program",
        // "Improve your Resume",
      ],
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$bleed: 0.125in;
$height: 5.5in;
$width: 4.25in;
$heightActual: calc(#{$height} + (2 * #{$bleed}));
$widthActual: calc(#{$width} + (2 * #{$bleed}));

@media print {
    .guidelines {
        display: none!important;
    }
}

.guidelines {
  position: absolute;
  top: 0px;
  left: 0px;
  width: $width;
  height: $height;
  border: $bleed solid rgba(255, 0, 0, 0.25);
}

.qr {
  border-radius: 0.5em;
  max-height: 1.5in;
}

.card-left {
  .content {
    padding: 0.25in;
    text-align: left;
    .main-logo {
      float: left;
      margin-top: 0px;
    }
    h1 {
      float: left;
    }
  }
}

ul {
  margin: 0;
}
ul.dashed {
  margin-left: -25px;
  list-style-type: none;
}
ul.dashed > li {
  text-indent: 0px;
}
ul.dashed > li:not(.no-before):before {
  content: "–  ";
  text-indent: 0px;
  padding-right: 5px;
}

// .pizza-emoji {
//   background-image: url('~@/assets/pizza-emoji.png');
//   width: 10px;
//   color: rgba(0, 0, 0, 0);
//   background-size: contain;
//   background-repeat: no-repeat;
//   transform: scale(1.5);
// }

.landing {
  width: $widthActual;
  /*@include display-not(mobile) {
    height: 100vh;
  }
	height: 100vh;*/
  height: $heightActual;
  //min-height: -webkit-fill-available;
  overflow: hidden;

  .content {
    @include center;
    @include white;
    // margin-top: 20vh;
    h1 {
      font-size: calc(0.045 * #{$height});
    }
    .main-p {
      @include center;
      font-size: calc(0.035 * #{$width});
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
    margin-top: calc(0.075 * #{$height});
    height: calc(0.2 * #{$height});
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
    height: $heightActual;
    width: $widthActual;
    background-color: #142027;
  }
}

.hacksu-box {
	position: absolute;
	background-image: url(../assets/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: calc(0.4 * #{$widthActual});
	max-width: calc(0.5 * #{$widthActual});
	height: calc(0.4 * #{$heightActual});
	max-height: calc(0.5 * #{$heightActual});
	z-index: -1;
  &.box1 {
    background-position-y: calc(0.15 * #{$height});
    background-position-x: calc(-0.12 * #{$height});
    left: 0px;
    top: calc(#{$heightActual} - (0.4 * #{$heightActual}));
    /*@include mobile {
      top: calc(100vh - 50vw);
    }*/
  }
  &.box2 {
    transform: rotate(90deg);
    background-position-x: calc(-0.07 * #{$heightActual});
    background-position-y: calc(-0.14 *  #{$heightActual});
    left: calc(#{$widthActual} - (0.46 * #{$widthActual}));
    top:-30px;
  }
  &.inversed2 {
    &.box1 {
      transform: scaleX(-1);

    }
    &.box2 {
      transform: rotate(90deg) scaleY(-1);
      left: 10px;
    }
  }
}

.card-back {
  overflow: hidden;
  z-index: -5;
  .guidelines {
    top: $heightActual;
  }
  .background {
    z-index: -30;
  }
  .hacksu-box {
    z-index: -20;
    &.box1 {
      left: 0px;
      top: calc(#{$heightActual} + #{$heightActual} - (0.4 * #{$heightActual}));
    }
    &.box2 {
      left: calc(#{$widthActual} - (0.46 * #{$widthActual}));
      top: calc(-30px + #{$heightActual});
    }
  }
}

</style>
