<template>
  <Navbar id="nav" v-if="showNavigation">
    <Navbtn v-for="[text, link, options] in buttons"
      :key="text"
      :link="link"
      :external="!!options?.external"
      :style="options?.style || {}">
      {{ text }}
    </Navbtn>
  </Navbar>
</template>

<script>
import Navbar from '@/components/navigation/Navbar.vue';
import Navbtn from '@/components/navigation/Navbtn.vue';
import { loggedIn } from "../globals.js";

export default {
  name: 'Navigation',
  computed: {
    showNavigation() {
      if (this.$route.fullPath.includes('/hotcard')) {
        console.log('hiding navbar')
        return false;
      }
      return true;
    },
    buttons(){
      const buttons = [
          ['Home', '/'],
          ['Meetings', '/meetings'],
          ['Leadership', '/leadership'],
          ['Contact', '/contact'],
          ['Useful Information & Links','/helpful_info']
        ];
        if (loggedIn.value){  
            buttons.push(
                ["Admin", "/admin", {style: {marginLeft: "auto"}}],
                ["Log Out", "/logout", {external: true}],
            );
        }
        return buttons;
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
  box-sizing: border-box;
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
