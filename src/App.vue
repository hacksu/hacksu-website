<template>
	<Head>
		<title v-if="title">{{ title }}</title>
		<meta name="title" v-if="title" :content="title" />
		<meta property="og:title" v-if="title" :content="title" />
		<meta name="description" v-if="description" :content="description" />
		<meta property="og:description" v-if="description" :content="description" />
		<meta property="og:image" v-if="image" :content="image" />
	</Head>
	<div id="navigation" :class="{menu: showingNavigationMenu}">
		<Navigation />
	</div>
	<router-view class="view" />
</template>

<script setup>
import { showingNavigationMenu } from "./globals.js"
import { Head } from "@unhead/vue/components";
import { useRoute } from "vue-router";

import Navigation from "./components/Navigation";

const route = useRoute();
const { title, description, image } = useRoute()?.meta;
</script>

<style lang="scss">
/*body {
  background-color: #142027;
}*/
body {
	@include white-bg;
}
</style>
