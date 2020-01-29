<template>
<div id="app">
	<navbar>
		<navbtn link="/">Home</navbtn>
		<navbtn link="/khe">Kent Hack Enough</navbtn>
		<navbtn link="/alumni">Alumni</navbtn>
		<navbtn link="/contact">Contact</navbtn>
		<navbtn link="/constitution">Constitution</navbtn>
		<navbtn dropdown>Dropdown
			<dropdown>
				<button>yeet</button>
				<button>ok</button>
				<button>what</button>

			</dropdown>
		</navbtn>
	</navbar>
	<router-view />
	<!-- <tooltip></tooltip> -->
</div>
</template>


<script>

export default {

}
</script>

<style>
* {
	font-family: Arial;
}

body {
	background-color: rgb(4, 16, 23);
	overflow-x: hidden;
	margin: 0px;
	color: white;
	font-family: 'Ropa Sans', sans-serif;
}

@font-face {
	font-family: abel;
	src: url(assets/fonts/abel-regular.ttf);
}

/* latin-ext */
@font-face {
	font-family: 'Ropa Sans';
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: local('Ropa Sans Regular'), local('RopaSans-Regular'), url(https://fonts.gstatic.com/s/ropasans/v9/EYqxmaNOzLlWtsZSScy6UzNpY5I.woff2) format('woff2');
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
	font-family: 'Ropa Sans';
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: local('Ropa Sans Regular'), local('RopaSans-Regular'), url(https://fonts.gstatic.com/s/ropasans/v9/EYqxmaNOzLlWtsZSScy6XTNp.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.green {
	color: rgb(53, 201, 130);
}

.green-bg {
	background-color: rgb(53, 201, 130);
}

.red {
	color: rgb(251, 53, 53);
}

.red-bg {
	background-color: rgb(251, 53, 53);
}

.rounded {
	border-radius: 1vh;
}

button {
	border: none;
	outline: none;
	color: white;
	padding: 1.25vh;
	cursor: pointer;
	transition: transform 0.25s, filter 0.25s;
}

button:hover {
	transform: scale(1.1);
	filter: brightness(120%);
}

.hovercontents .hovercontent {
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.25s, transform 0.25s;
}

.hovercontents:hover .hovercontent {
	opacity: 1;
	pointer-events: auto;
	transform: scale(1.1) !important;
}

.grid {
	display: grid;
	text-align: center;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

/* ----------- Non-Retina Screens ----------- */
@media screen and (min-device-width: 1200px) and (-webkit-min-device-pixel-ratio: 1) {
	.laptopdesktop {
		display: initial !important;
	}
}

/* ----------- Retina Screens ----------- */
@media screen and (min-device-width: 1200px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
	.laptopdesktop {
		display: initial !important;
	}
}

.underline:after {
	content: "";
	display: block;
	height: 2px;
	margin-left: 50%;
	transition: width 0.3s ease 0s, padding-right 0.3s ease 0s, margin-left 0.3s ease 0s;
	width: 0;
	bottom: 0;
	padding-right: 0px;
	background: none repeat scroll 0 0 transparent;
	margin-top: 5px;
	border-radius: 5vh;
}

.underline:hover:after {
	width: 100%; /*calc(100% + 20px);*/
	padding-right: 20px;
	margin-left: -10px;
}

::-webkit-scrollbar {
	width: 1rem;
}

::-webkit-scrollbar-thumb {
	border: 0px solid #35c982;
	background: #424b50;
	-webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-track {
	background: #0e171d;
	-webkit-box-shadow: inset 0 0 5px #12171c;
	box-shadow: inset 0 0 5px #12171c;
}
</style>
