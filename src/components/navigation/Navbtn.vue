<template>
  <button v-on:click="routelink" class="navbtn underline">
  	<slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Navbtn',
  props: ["link", "dropdown"],
  methods: {
    routelink: function() {
      //console.log(this);
      if (this.link && !(this.$router.currentRoute.path == this.link)) {
        this.$router.push(this.link);
        document.querySelector("#app").classList.remove('menu')
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
}

</style>
