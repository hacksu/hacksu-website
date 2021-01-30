<template>
  <div class="navbar"
    v-bind:class="{ 'scrolled': scrolled, 'fixed': !scrollNav, 'animated': !scrollNav && from }"
    v-bind:style="{ 'padding': padding, 'background-color': color, 'box-shadow': shadow, }"
  >
    <span class="colordetect" hidden></span>
    <span class="background" v-on:click="hideMenu"></span>
    <button class="hamburger navbtn" v-on:click="showMenu">Menu</button>
    <span class="buttons">
      <slot></slot>
    </span>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
      scrolled: false,
      offset: 0,
      distance: 100,
      progress: 0,
      scrollNav: false,
      from: false,
    }
  },
  computed: {
    padding() {
      let n = 30 * (1 - this.progress) + 10 * this.progress
      return `${n}px 10px ${10 + n}px 10px`;
    },
    color() {
      if (this.$el) {
        let bgc = getComputedStyle(this.$el.querySelector('.colordetect')).backgroundColor;
        let a = `rgba(${bgc.substr(4).split(')')[0]}, ${this.progress})`;
        //console.log(a);
        return a;
      } else {
        return `rgba(${this.progress}, 0, 0, 0)`;
      }
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
      let scrollNav = this.$route.meta.scrollNav || false;
      if (scrollNav && !this.scrollNav) {
        let this_ = this;
        setTimeout(function() {
          this_.scrollNav = this_.$route.meta.scrollNav || false;
        }, 1000)
      } else {
        this.scrollNav = scrollNav;
      }
      if (scrollNav) {
        this.progress = Math.min(1, (this.offset / this.distance));
      } else {
        this.progress = 1;
      }
      return this.scrolled;
    }
  },
  watch: {
    '$route': function(route) {
      if (!this.from) {
        let _this = this;
        setTimeout(function() {
          if (!_this.from) {
            _this.from = route;
          }
        }, 300)
      } else {
        this.from = route;
      }
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
  height: 38px;
  @include mobile {
    text-align: left;
  }
  //height: 4vh;
  /*@include mobile {
    height: 9vw;
  }*/
  top: 0px;
  left: 0px;
  padding: 30px 10px 30px 10px;
  z-index: 100;
  &.animated {
    //transition: background 0.25s, padding 0.25s;
    transition: padding 0.25s;
  }

  &.scrolled, &.fixed, .colordetect {
    //background-color: red;
    //background-color: #142027;
    //padding: 10px 10px 20px 10px;
  }

  .hamburger {
    @include display-hide('tablet');
    @include display-hide('desktop');
    @include background(url('../../assets/hamburger.svg'), contain);
    padding: 10px;
    background-color: transparent;
    background-position: left center !important;
    //width: calc(4vh + 150px);
    width: 200px;
    font-size: 3vh;
    @include mobile {
      font-size: 6vw;
    }
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

.navbar.side {
  @include display-not(mobile) {
    background-color: blue!important;
    position: fixed;
    height: 100vh;
    width: 300px;
    .buttons {
      .navbtn {
        display: block;
        width: 100%;
        height: 4vh;
        text-align: center;
      }
    }
  }
}

</style>
