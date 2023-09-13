<template>
  <Navbar id="nav">
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
  components: {
    Navbar,
    Navbtn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

#nav {
  padding-left: 10px;
  padding-right: 10px;
  height: 38px;
  .navbar-color {
    background-color: rgb(20, 32, 39);
  }
  .navbtn {
    @include responsive(padding, 8px, 10px, 12px);
    @include transition;
    font-size: 2vh;
  	padding-left: 2vw!important;
  	padding-right: 2vw!important;
  	padding-bottom: 10px;
  }
}

</style>
