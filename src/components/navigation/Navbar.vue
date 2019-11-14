<template>
<div id="navbar">
	<button style="position: absolute; padding: 0px; left: 30px; background-color: transparent; color: transparent;"><img style="height: 4vh;" src="../../assets/images/hamburger.svg" /></button>
	<div class="laptopdesktop" style="margin-left: calc(10vh + 2.5vw); float: left; margin-top: -0.5vh; display: none;">
		<slot></slot>
	</div>
</div>
</template>

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
</style>
