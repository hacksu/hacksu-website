<template>
<div style="width: 100%; height: 100vh; overflow-y: hidden;">
	<div class="hacksu-box" style="background-position-y: 7vh; background-position-x: -14vh; left: 0px; bottom: 0px;"></div>

	<div class="hacksu-box" style="transform: rotate(90deg); background-position-x: -7vh; background-position-y: -14vh; right: 0px; top: 0px;"></div>

	<button hidden style="position: absolute; width: 10vh; right: 30px; bottom: 10px; background: transparent; opacity: 0.25;" onclick="window.location.href = '';">
		<img style="width: 10vh;" src="../../assets/images/github-white.svg" data-old-src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" />
	</button>
	<div v-if="!$app.mobile" style="position: absolute; width: 10vh; right: 30px; bottom: 10px; background: transparent; opacity: 0.25;">
		<button style="margin-top: 0px; background-color: transparent;" title="GitHub" onclick="window.location.href = 'https://github.com/hacksu';">
			<img style="width: 10vh;" src="../../assets/images/github-white.svg" data-old-src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" />
		</button>
		<button style="top: -10vh; background-color: transparent;" onclick="window.location.href = '';" hidden>
			<img data-tooltip="GitHub" style="width: 10vh;" src="../../assets/images/github-white.svg" data-old-src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" />
		</button>
		<button style="top: -20vh; background-color: transparent;" onclick="window.location.href = '';" hidden>
			<img data-tooltip="GitHub" style="width: 10vh;" src="../../assets/images/github-white.svg" data-old-src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg" />
		</button>
	</div>
	<div style="text-align: center; margin-left: auto; margin-right: auto; margin-top: 20vh;">

		<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/816158/hacksu-logo.svg" style="width: 60vw; max-width: 60vh;" />

		<h1 style="font-size: 6vh;">Learn. Grow. Create.</h1>
		<p style="font-size: 3.5vh; width: 80vw; max-width: 80vh; margin-left: auto; margin-right: auto;">Hacksu teaches anyone, regardless of skill level or major, how to code.</p>

		<br />

		<button data-tooltip="We'll let you know when events are going on!" class="green-bg rounded" style="font-size: 3vh; width: 60vw; max-width: 40vh;" onclick="$vue(document.getElementById('modal1')).toggle()">Get Involved</button>

	</div>

</div>
</template>

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
</style>
