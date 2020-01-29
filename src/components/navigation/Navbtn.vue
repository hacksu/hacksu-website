<template>
<button v-on:click="routelink()" class="navbtn underline">
	<slot></slot>
</button>
</template>

<script>
export default {
  props: ["link", "dropdown"],
  methods: {
    routelink: function() {
      //console.log(this);
      if (this.link && !(this.$router.currentRoute.path == this.link)) {
        this.$router.push(this.link);
				document.getElementById("navbar").__vue__.hideSidenav();
      }
    },
  },
}
</script>

<style>
.navbtn {
	font-size: 2vh;
	padding-left: 2vw;
	padding-right: 2vw;
	height: 100%;
	background: none;
	padding-bottom: 10px;
}

.navbtn.underline:after {
	background: linear-gradient(to top left, #35c982, #4683FF);
}

</style>
