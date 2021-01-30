<template>
  <Navbar id="nav">
    <Navbtn v-for="[text, link] in navigation" v-bind:key="text" v-bind:link="link">{{ text }}</Navbtn>
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

.navbar {
  &.scrolled, &.fixed, .colordetect {
    // NAVBAR COLOR
    background-color: rgb(20, 32, 39);
  }
}

</style>
