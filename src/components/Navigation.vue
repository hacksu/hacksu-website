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
  data() {
    return {
      navigation,
    }
  },
  components: {
    Navbar,
    Navbtn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
