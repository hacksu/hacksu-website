<template>
  <div :style="style" :class="classes">
    <span class="navbar-color" hidden></span>
    <span v-if="mobile">
      <span class="background" @click="menu = false"></span>
      <button class="hamburger navbtn" @click="menu = true">Menu</button>
    </span>
    <span class="buttons" :class="{ 'menu': mobile }" v-if="!mobile || (mobile && !fresh)">
      <div class="menu-page">
        <slot></slot>
      </div>
    </span>
  </div>
</template>


<script>

let lerp = function(a, b, t) {
  return a * (1 - t) + b * t;
}
let lerpArray = function(a, b, t) {
  let arr2 = [];
  for (let i in a) {
    arr2.push(lerp(a[i], b[i], t))
  }
  return arr2;
}

export default {
  name: 'Navbar',
  data() {
    let { $route } = this;
    return {
      distance: 100,
      counter: 0,
      previous: false,
      fresh: true,
      menu: false,
      padding: [
        // [top, bottom]
        [10, 20], // 0%
        [30, 40]  // 100%
      ],
    }
  },
  computed: {
    mobile() {
      this.counter;
      if (this.$el) {
        return Boolean(getComputedStyle(this.$el).getPropertyValue('--mobile'))
      } else {
        return false;
      }
    },
    scrollable() {
      return 'scrollNav' in this.$route.meta;
    },
    progress() {
      this.counter;
      if (this.scrollable) {
        return 1 - Math.min(1, document.documentElement.scrollTop / this.distance);
      } else {
        this.previous = true;
        return 0;
      }
    },
    color() {
      this.counter;
      if (document.querySelector('.navbar-color')) {
        let color = getComputedStyle(document.querySelector('.navbar-color')).backgroundColor;
        if (color.includes('rgb')) {
          let nums = [...color.match(/\d+/g)].map(Number)
          if (nums.length == 3) {
            nums.push(1)
          }
          nums[3] *= (1 - this.progress);
          return `rgba(${nums.join(', ')})`;
        } else {
          console.log('CANNOT HANDLE THAT COLOR');
          return color;
        }
      } else {
        return false;
      }
    },
    shadow() {
      return `0 5px 15px rgba(0,0,0,${0.25 * (1 - this.progress)})`;
    },
    style() {
      this.counter;
      let { padding, progress } = this;
      let [top, bottom] = lerpArray(...padding, progress);
      return {
        'padding-top': top + 'px',
        'padding-bottom': bottom + 'px',
        'background-color': this.color,
        'box-shadow': this.shadow,
      }
    },
    classes() {
      let classes = {
        'detect-display': true,
        'active': this.menu,
      };
      if (this.previous && !this.fresh) {
        classes.animated = true;
      }
      return classes;
    }
  },
  methods: {
    recompute() {
      this.counter++;
      this.mobile;
    }
  },
  watch: {
    $route(route) {
      console.log(JSON.parse(JSON.stringify(route)));
      if (this.fresh) {
        let this_ = this;
        requestAnimationFrame(function() {
          this_.fresh = false;
        })
      }
      //this.progress = 'scrollNav' in $route.meta ? 1 : 0;
      if (this.scrollable && this.previous) {
        let this_ = this;
        setTimeout(function() {
          this_.previous = false;
        }, 250);
      }
    }
  },
  mounted() {
    this.previous = false;
    window.addEventListener('scroll', this.recompute);
    window.addEventListener('resize', this.recompute);
    this.counter++;
  },
};
</script>

<style lang="scss">

#nav {
  position: fixed;
  width: 100vw;
  &.animated {
    transition: padding 0.25s;
  }
  .menu {
    background-color: white;
    color: black;
  }
}

@include mobile {
  #nav {
    .hamburger {
      @include background(url('../../assets/hamburger.svg'), contain);
      padding: 10px;
      background-color: transparent;
      background-position: left center !important;
      //width: calc(4vh + 150px);
      width: 200px;
      font-size: 6vw!important;
      line-height: 2vh;
      //color: transparent;
      margin-left: 10px;
      margin-top: 5px;
      margin-right: 20px;
      border-radius: 0px;
      transition: opacity 0.05s;
    }
    .menu {
      @include rounded;
      position: absolute;
      display: block;
      .navbtn {
        display: block;
      }
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s;
      pointer-events: none;
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
        box-sizing: border-box;
      }
      overflow: hidden;
      &.dropdown-open {
        .menu-page > .navbtn, .dropdown:not(.open) {
          display: none;
        }
        .dropdown.open {
          display: block;
        }
        .navbtn-dropdown {
          position: relative;
          background-color: transparent;
          box-shadow: none;
          left: 0px!important;
          width: calc(100vw - 50px - 20px);
          /*left: 0px!important;
          top: 0px!important;
          z-index: 10010;
          width: calc(100vw - 50px - 20px);*/
          display: block;
        }
      }
    }
    &.active {
      .menu {
        opacity: 1;
        pointer-events: all;
      }
      .background {
        opacity: 0.5;
        pointer-events: all;
      }
      .hamburger {
        opacity: 0;
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

</style>
