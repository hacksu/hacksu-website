<template>
  <Navbar id="nav" v-if="showNavigation">
    <Navbtn v-for="[text, link, options] in navigation"
    v-bind:key="text"
    v-bind:link="link"
    v-bind:style="options ? { 'float': (options.align || 'inherit'), } : {}">
      {{ text }}
    </Navbtn>
  </Navbar>
</template>

<script>
import { navigation } from '@/details'
import Navbar from '@/components/navigation/Navbar.vue'
import Navbtn from '@/components/navigation/Navbtn.vue'

export default {
  name: 'Navigation',
  props: {
    view: {
      default: 'default',
      type: String,
    },
  },
  data() {
    return {
      navigation: navigation[this.view],
    }
  },
  computed: {
    showNavigation() {
      console.log(this.$route);
      if (this.$route.fullPath.includes('/hotcard')) {
        console.log('hiding')
        return false;
      }
      return true;
    }
  },
  components: {
    Navbar,
    Navbtn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.navbar {
  &.scrolled, &.fixed, .navbar-color {
    // NAVBAR COLOR
    background-color: rgb(20, 32, 39);
  }
}
.navbar.side {
  &.scrolled, &.fixed, .navbar-color {
    // NAVBAR COLOR
    background-color: rgb(20, 32, 39)!important;
  }
}

</style>
