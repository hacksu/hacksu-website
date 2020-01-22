<template>
<div style="width: 100%; a-height: 85vh; overflow-y: hidden; background: linear-gradient(to top left, #35c982, #4683FF);">
	<div style="text-align: center; margin-left: auto; margin-right: auto; margin-top: 10vh;">

		<h2 style="font-size: 5.5vh">Meetings</h2>
		<p style="font-size: 4vh; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-bottom: 1.5vh;">
			{{ info }}
		</p>
		<p style="font-size: 3vh; font-weight: bold; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-top: 0px;">
			{{ building }}, {{ rooms }}
		</p>
		<div class="rounded hovercontents" v-on:click="link(building_url)"
			style="overflow: hidden; cursor: pointer; margin-left: auto; margin-right: auto; height: 40vh; max-height: 50vw; width: 80vw; max-width: 80vh; background-image: url(https://i.pinimg.com/originals/90/3d/b2/903db24fb1e148954205e4edf4faa669.jpg); background-size: cover; background-position: center;">
			<div class="hovercontent" :style="{'background-image': 'url(' + require('../../assets/images/taylor-map.png') + ')'}" style="transform: scale(1); background-size: cover; background-position: center; text-align: center; height: 100%; margin-top: 0px;">
				<div style="font-size: 4vh; margin-top: 0px; padding-top: calc(20vh - 2vh - 0.5vh);" class="">
					<h1 style="padding-top: 0.5vh; padding-bottom: 0.5vh; font-size: 4vh; max-width: 45vh; margin-left: auto; margin-right: auto; margin-top: 0px;" class="green-bg rounded">Show me on a map</h1>
				</div>
			</div>
		</div>
		<button v-on:click="link(building_url)"
			style="background-color: transparent; font-size: 2vh; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-top: 0px;">
			I need help finding {{ building }}
		</button>

	</div>

  <br>

</div>
</template>

<script>
export default {
	methods: {
		link(url) {
			window.location.href = (url);
		}
	},
  data: () => {
    return {
      info: "Every Tuesday at 7:00 PM",
      rooms: "Rooms 106 & 109",
      building: "Math & Science Building",
			building_url: "https://map.concept3d.com/?id=568#!m/57924?sbc/?s/math%20and%20science%20building",
    }
  },
}

</script>
