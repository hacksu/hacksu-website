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
import { ref, watch } from "vue";
import { showingNavigationMenu } from "./globals.js"
import { Head } from "@unhead/vue/components";
import { useRoute } from "vue-router";

import Navigation from "./components/Navigation";

const route = useRoute();

// load route metadata for initial-server side render
const title = ref(route?.meta?.title);
const description = ref(route?.meta?.description);
const image = ref(route?.meta?.image);

watch(route, (to) => {
	// update route metadata on client-side navigation
	title.value = to?.meta?.title;
	description.value = to?.meta?.description;
	image.value = to?.meta?.image;
}, {flush: 'pre', immediate: true, deep: true});

</script>

<style lang="scss">
/*body {
  background-color: #142027;
}*/
body {
	@include white-bg;
}
</style>
