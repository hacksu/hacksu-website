<template>
  <div class="navbar"
    v-bind:class="{ 'scrolled': scrolled, 'animated': !home }"
    v-bind:style="{ 'padding': padding, 'background-color': color, 'box-shadow': shadow, }"
  >
    <span class="background" v-on:click="hideMenu"></span>
    <button class="hamburger navbtn" v-on:click="showMenu">Menu</button>
    <span class="buttons">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import Navbtn from '@/components/navigation/Navbtn.vue'

export default {
  name: 'Navbar',
  components: {
    Navbtn,
  },
  data() {
    return {
      scrolled: false,
      offset: 0,
      distance: 100,
      progress: 0,
      home: false,
    }
  },
  computed: {
    padding() {
      let n = 30 * (1 - this.progress) + 10 * this.progress
      return `${n}px 10px ${10 + n}px 10px`;
    },
    color() {
      return `rgba(20, 32, 39, ${this.progress})`;
    },
    shadow() {
      return `0 5px 15px rgba(0,0,0,${0.25 * (this.progress)})`;
    }
  },
  methods: {
    showMenu() {
      document.querySelector("#app").classList.add('menu');
    },
    hideMenu() {
      document.querySelector("#app").classList.remove('menu');
    },
    computeScrolled() {
      this.offset = document.firstElementChild.scrollTop;
      this.scrolled = this.offset != 0;
      let home = this.$route.name == 'Home';
      if (home && !this.home) {
        let _this = this;
        setTimeout(function() {
          _this.home = _this.$route.name == 'Home';
        }, 1000)
      } else {
        this.home = home;
      }
      if (home) {
        this.progress = Math.min(1, (this.offset / this.distance));
      } else {
        this.progress = 1;
      }
      return this.scrolled;
    }
  },
  watch: {
    '$route.name': function() {
      this.computeScrolled();
    }
  },
  mounted() {
    let _this = this;
    let compute = function() {
      _this.computeScrolled();
    }
    document.addEventListener('scroll', compute)
    document.addEventListener('resize', compute)
    this.computeScrolled();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.navbar {
  position: fixed;
  width: 100vw;
  height: 4vh;
  top: 0px;
  left: 0px;
  padding: 30px 10px 30px 10px;
  z-index: 100;
  &.animated {
    transition: background 0.25s, padding 0.25s;
  }

  &.scrolled {
    //background-color: #142027;
    //padding: 10px 10px 20px 10px;
  }

  .hamburger {
    @include hide('tablet');
    @include hide('desktop');
    @include background(url('../../assets/hamburger.svg'), contain);
    padding: 10px;
    background-color: transparent;
    background-position: left center !important;
    width: calc(4vh + 150px);
    font-size: 3vh;
    line-height: 2vh;
    //color: transparent;
    margin-left: 10px;
    margin-top: 5px;
    margin-right: 20px;
    border-radius: 0px;
    transition: opacity 0.05s;
  }

  @include mobile {
    .buttons {
      @include rounded;
      @include white-bg;
      pointer-events: none;
      //display: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 10000;
      display: block;
      position: fixed;
      width: calc(100vw - 50px);
      top: 25px;
      left: 25px;
      padding: 10px 0px 10px 0px;
      .navbtn {
        display: block;
        text-align: center;
        width: 100%;
        padding: 20px;
        color: black!important;
      }
    }
    .background {
      transition: opacity 0.15s;
      pointer-events: none;
      display: block;
      position: fixed;
      opacity: 0;
      top: 0px;
      left: 0px;
      background-color: black;
      width: 100vw;
      height: 100vh;
    }
  }
}

@include mobile {
  #app.menu {
    .buttons {
      opacity: 1;
      pointer-events: all;
      .navbtn.underline {
        &:after {
          background: none!important;
        }
      }
    }
    .navbar {
      .hamburger {
        opacity: 0;
      }
      .background {
        opacity: 0.5;
        pointer-events: all;
      }
    }
  }
}

</style>
