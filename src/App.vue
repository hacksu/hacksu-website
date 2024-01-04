<template>
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
