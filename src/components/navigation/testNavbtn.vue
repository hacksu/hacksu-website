<template>
  <router-link v-if="!dropdown" v-bind:to="link" class="navbtn detect-display" :class="{ open }">
    <slot></slot>
  </router-link>
  <span v-else class="dropdown"
  @mouseover="interact"
  @mouseleave="interact"
  :click="interact"
  :class="{ open }"
  >
    <a class="navbtn dropdown-btn">
      <slot v-if="!mobile || !open"></slot>
      <span v-else><span class="back-chevron">&lsaquo;</span>Back</span>
    </a>
    <span class="navbtn-dropdown navbar-color" :class="{ open }" :style="{ 'left': offset + 'px' }">
      <router-link v-for="[subtext, sublink] in dropdown" v-bind:to="sublink" class="navbtn dropdown-entry">
        {{ subtext }}
      </router-link>
    </span>
  </span>
</template>


<script>

export default {
  name: 'Navbtn',
  props: ['link'],
  data() {
    return {
      open: false,
      counter: 0,
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
    dropdown: function() {
      if (typeof(this.link) == 'string') {
        return false;
      } else {
        return this.link;
      }
    },
    offset: function() {
      this.counter;
      if (!this.$el) {
        return 0;
      }
      let [button, dropdown] = this.$el.children;
      return (button.offsetLeft + (button.offsetWidth / 2) - (dropdown.offsetWidth / 2));
    },
  },
  methods: {
    interact(event) {
      //this.counter++;
      let { type } = event;
      let mobile = this.mobile;
      if (type == 'click') {
        if (mobile) {
          this.open = !this.open;
        }
      } else if (!mobile && type == 'mouseover') {
        this.open = true;
      } else if (!mobile && type == 'mouseleave') {
        this.open = false;
      }
      let { open } = this;
      //console.log(type);
      //console.log(this);
      let this_ = this;
      requestAnimationFrame(function() {
        this_.counter++;
        this_.offset;
        //this_.open = (this_.open || this_.$el.lastChild.clientHeight != 0);
        //let { open } = this_;
        if (mobile) {
          let list = this_.$parent.$el.querySelector('.menu').classList;
          if (open) {
            list.add('dropdown-open')
          } else {
            list.remove('dropdown-open');
          }
        }
      });
    }
  },
};
</script>

<style lang="scss">

.navbtn {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
}

.dropdown {
  display: inline-block;
  @include mobile {
    display: block;
  }
  .navbtn-dropdown {
    display: none;
  }
  &.open .dropdown-btn {
    text-align: left;
    padding-left: 30px!important;
    .back-chevron {
      padding-right: 10px;
    }
  }
  &.open {
    .navbtn-dropdown {
      position: absolute;
      display: block;
      box-sizing: content-box;
      box-shadow: 0 5px 15px rgba(0,0,0,0.25);
      padding: 0px 10px 10px 10px;
      @include rounded;
      .navbtn {
        display: block;
        text-align: center;
      }
    }
  }
}

</style>
