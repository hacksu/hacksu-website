<template>
  <button :click="routelink" class="navbtn">
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
				//document.getElementById("navbar").__vue__.hideSidenav();
      }
    },
  },
}
</script>

<style scoped lang="scss">
.navbtn {
  @include underline;
	font-size: 2vh;
	padding-left: 2vw;
	padding-right: 2vw;
	height: 100%;
	background: none;
	padding-bottom: 10px;
}

</style>
