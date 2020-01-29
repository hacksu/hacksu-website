<template>
<div class="section-landing">

	<!-- don't touch these boxes. it was a pain to get them to properly position -->
	<div class="hacksu-box" style="background-position-y: 7vh; background-position-x: -14vh; left: 0px; bottom: 0px;"></div>
	<div class="hacksu-box" style="transform: rotate(90deg); background-position-x: -7vh; background-position-y: -14vh; right: 0px; top: 0px;"></div>


	<!-- <button hidden style="position: absolute; width: 10vh; right: 30px; bottom: 10px; background: transparent; opacity: 0.25;" onclick="window.location.href = '';">
		<img style="width: 10vh;" src="../../assets/images/github-white.svg" data-old-src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" />
	</button> -->

	<div class="landing-button-panel" v-if="!$app.mobile">
		<button v-for="item, index in social" v-bind:title="item.title" v-bind:style="{ 'top': ('-' + (index * 10) + 'vh'), }" v-bind:data-link="item.link" onclick="window.location.href = this.dataset.link">
			<img v-bind:src="item.img" />
		</button>
	</div>
	<div class="landing-content center">

		<img class="landing-hacksu-logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/816158/hacksu-logo.svg" />

		<h1 style="font-size: 6vh;">{{ content.title }}</h1>
		<p class="center" style="font-size: 3.5vh; width: 80vw; max-width: 80vh;">{{ content.body }}</p>

		<br />

		<button class="green-bg rounded landing-button" onclick="$vue(document.getElementById('modal1')).toggle()">{{ content.button }}</button>

	</div>

</div>
</template>

<script>
export default {
	data: function() {
		return {
			content: {
				title: "Learn. Grow. Create.",
				body: "Hacksu teaches anyone, regardless of skill level or major, how to code.",
				button: "Get Involved",

			},
			social: [ // Please don't use more than 3 here or else it may overlap with the top right hacksu box
				{
					title: "Github",
					link: "https://github.com/hacksu",
					img: require("../../assets/images/github-white.svg"),

				},
			],

		}
	},

}

</script>

<style>
.hacksu-box {
	position: absolute;
	background-image: url(../../assets/images/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: 40vh;
	max-width: 50vw;
	height: 40vh;
	max-height: 50vw;
	z-index: -1;
}

.section-landing {
	width: 100%;
	height: 100vh;
	overflow-y: hidden;
}

.landing-button-panel {
	position: absolute;
	width: 10vh;
	right: 30px;
	bottom: 10px;
	background: transparent;
	opacity: 0.25;
}

.landing-button-panel button {
	background-color: transparent;
}

.landing-button-panel img {
	width: 10vh;
}

.landing-content {
	margin-top: 20vh;
}

.landing-hacksu-logo {
	width: 60vw;
	max-width: 60vh;
}

.landing-button {
	font-size: 3vh;
	width: 60vw;
	max-width: 40vh;
}


</style>
