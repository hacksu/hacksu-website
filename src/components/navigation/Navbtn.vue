<template>
  <component :is="external ? 'a' : 'router-link'" v-if="!dropdown"
      :href="link" :to="link" class="navbtn underline">
    <slot></slot>
  </component>
  <span class="navbtn-dropdown" v-else
  @mouseover="calculate"
  @mouseleave="calculate"
  v-on:click="calculate"
  v-bind:class="{ 'open': open, }">
    <a class="navbtn underline dropdown-btn">
      <slot v-if="!mobile || !open"></slot>
      <span v-else><span class="back-chevron">&lsaquo;</span>Back</span>
    </a>
    <div class="navbtn-dropdown-content" v-bind:style="{ 'margin-left': offset, }">
      <div class="navbtn-dropdown-box navbar-color">
        <router-link v-for="([subtext, sublink], index) in dropdown"
        v-bind:key="index"
        v-bind:to="sublink"
        class="navbtn underline">
          {{ subtext }}
        </router-link>
      </div>
    </div>
  </span>
</template>

<script>
import { showingNavigationMenu } from "../../globals.js";
export default {
  name: 'Navbtn',
  props: ["link", "external"],
  data() {
    return {
      open: false,
      width: 0,
      offset: '0px',
      mobile: false,
    }
  },
  computed: {
    dropdown: function() {
      if (typeof(this.link) == 'string') {
        return false;
      } else {
        return this.link;
      }
    },
  },
  methods: {
    calculate: function(evt) {
      let mobile = getComputedStyle(this.$parent.$el.querySelector('.buttons')).zIndex != 'auto';
      this.mobile = mobile;
      if (evt.type == 'click') {
        if (mobile) {
          this.open = !this.open;
        }
      } else if (!mobile && evt.type == 'mouseover') {
        this.open = true;
      } else if (!mobile && evt.type == 'mouseleave') {
        this.open = false;
      }
      let buttons = this.$parent.$el.lastChild;
      if (this.open) {
        let button = this.$el.firstChild;
        let dropdown = this.$el.lastChild;
        buttons.classList.add('dropdown-open')
        let this_ = this;
        if (mobile) {
          this.offset = '0px';
        } else {
          window.requestAnimationFrame(function() {
            this_.offset = -(button.offsetWidth / 2) - (dropdown.offsetWidth / 2) + 'px';
          });
        }
      } else {
        buttons.classList.remove('dropdown-open')
      }
    },
  },
}
</script>

<style lang="scss">
.navbtn {
  font-size: 2vh;
  padding-left: 2vw!important;
  padding-right: 2vw!important;
  height: 100%;
  background: none;
  padding-bottom: 10px;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  box-sizing: border-box;
}

.navbtn-dropdown {
  text-align: center;
  .navbtn {
    cursor: pointer;
  }
  &.open {
    .navbtn-dropdown-content {
      display: inline-block!important;
      box-sizing: border-box;
      padding-top: 10px;
      @include rounded;
      @include mobile {
        padding-top: 0px;
      }
      @include display-not(mobile) {
        .navbtn-dropdown-box {
          margin-top: 0px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.25);
        }
      }
    }
  }
  @include mobile {
    &.open > .navbtn {
      text-align: left;
      padding-left: 30px!important;
      .back-chevron {
        padding-right: 10px;
      }
    }
  }
  .navbtn-dropdown-content {
    .navbtn-dropdown-box {
      text-align: center;
      padding-bottom: 10px;
      margin-top: 10px;
      @include rounded;
      .navbtn {
        display: block;
      }
    }
    display: none;
    position: absolute;
  }
}

</style>
