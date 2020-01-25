<template>
<div id="navbar">
	<button v-on:click="toggleSidenav" style="z-index: 10000; position: absolute; padding: 0px; left: 30px; background-color: transparent; color: transparent;"><img style="height: 4vh;" src="../../assets/images/hamburger.svg" /></button>
	<div v-if="!$app.mobile" style="z-index: 10000; margin-left: calc(10vh + 2.5vw); float: left; margin-top: -0.5vh;">
		<slot></slot>
	</div>
	<div id="navbar-mobile" v-if="$app.mobile || true" v-bind:style="{ 'max-width': ($app.mobile) ? '40vh' : '15vw', 'margin-left': ($app.mobile) ? '-40vh' : '-15vw', }">
		<div id="navbar-mobile-darken" v-on:click="hideSidenav">
		</div>
		<div id="sidenav-contents">
			<slot></slot>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data: function() {
		return {
			sidenavActive: false,
		}
	},
	methods: {
		showSidenav: function() {
			if (!this.sidenavActive) {
				this.sidenavActive = true;
				document.getElementById("navbar-mobile").classList.add("active");

			}
		},
		hideSidenav: function() {
			if (this.sidenavActive) {
				this.sidenavActive = false;
				document.getElementById("navbar-mobile").classList.remove("active");

			}
		},
		toggleSidenav: function() {
			if (this.sidenavActive) {
				this.hideSidenav();
			} else {
				this.showSidenav();
			}
		}
	},
	mounted: function() {

	},
}

$(document).ready(function() {
  var html = document.documentElement;
  var status = false;
  var navbar = function(first, force) {
    console.log(html.scrollTop);
		console.log(document.getElementsByClassName("constitution"));
		if (document.getElementsByClassName("constitution") >= 0) {
			force = true;
		}
		var top = Math.max(html.scrollTop, document.body.scrollTop);
    if (top <= 0 && (!force)) {
      if (first === true || status == true) {
        status = false;
        document.getElementById("navbar").classList.remove("navbar-scroll");
      }
    } else {
      if (first === true || status == false || force) {
        status = true;
        document.getElementById("navbar").classList.add("navbar-scroll");
      }
    }
  }
  $(window).on("scroll", navbar);
  $(window).on("resize", navbar);
  navbar(true);
})
</script>

<style>
#navbar {
	position: fixed;
	height: calc(4vh + 0vh + 0px);
	width: 100vw;
	top: 0px;
	left: -5px;
	background-color: rgba(255, 255, 255, 0);
	transition: padding 0.25s, background-color 0.25s;
	/*padding-top: 40px;
  padding-bottom: 10px;*/
	padding-top: 30px;
	padding-bottom: 30px;
	padding-left: 10px;
	padding-right: 10px;
	z-index: 999999;
}

.navbar-scroll {
	background-color: #142027 !important;
	/*padding-top: 1vh!important;
  padding-bottom: 0px!important;*/
	padding-top: 20px !important;
	padding-bottom: 20px !important;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

#navbar-mobile {
	background-color: #142027 !important;
	position: fixed;
	top: 0px;
	left: 0px;
	height: 100vh;
	width: 80vw;
	padding-top: calc(4vh + 60px);
	z-index: 10;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: margin-left 0.25s;
}

#navbar-mobile.active {
	margin-left: 0px!important;
}

#navbar-mobile-darken {
	position: absolute;
	left: 100%;
	top: 0px;
	height: 100vh;
	width: 200vw;
	pointer-events: none;
	background-color: black;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.25s;
}

#navbar-mobile.active #navbar-mobile-darken {
	opacity: 0.25;
	pointer-events: all!important;
}

#sidenav-contents {
	z-index: 100;
	max-width: 100%;
	padding: 20px;
}
#sidenav-contents button {
	width: 100%;
	display: inline-block;
}
</style>
