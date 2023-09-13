<template>
	<!--<Navbar id="nav">
		<Navbtn link="/">Home</Navbtn>
		<Navbtn link="/khe">Kent Hack Enough</Navbtn>
		<Navbtn link="/alumni">Alumni</Navbtn>
		<Navbtn link="/contact">Contact</Navbtn>
		<Navbtn link="/constitution">Constitution</Navbtn>
	</Navbar>-->
	<Navigation />
	<router-view class="view" />
</template>

<script>
import Navigation from "./components/Navigation";
export default {
	components: { Navigation }
}
</script>

<style lang="scss">
/*body {
  background-color: #142027;
}*/
body {
	@include white-bg;
}
</style>
