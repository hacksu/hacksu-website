<template>
<div style="width: 100vw; height: 85vh; overflow-y: hidden; background: linear-gradient(to top left, #35c982, #4683FF);">
	<div style="text-align: center; margin-left: auto; margin-right: auto; margin-top: 10vh;">

		<h2 style="font-size: 5.5vh">Meetings</h2>
		<p style="font-size: 4vh; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-bottom: 1.5vh;">
			{{ info }}
		</p>
		<p style="font-size: 3vh; font-weight: bold; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-top: 0px;">
			Taylor Hall, Rooms 226 & 226A
		</p>
		<div class="rounded hovercontents" v-bind:onclick="'https://map.concept3d.com/?id=568#!m/57964?sbc/?s/' + building"
			style="overflow: hidden; cursor: pointer; margin-left: auto; margin-right: auto; height: 40vh; max-height: 50vw; width: 80vw; max-width: 80vh; background-image: url(https://iidaohky.org/sites/default/files/field/image/Image%202%20Cover.jpg); background-size: cover; background-position: center;">
			<div class="hovercontent" style="transform: scale(1); background-image: url(../../assets/images/taylor-map.png); background-size: cover; background-position: center; text-align: center; height: 100%; margin-top: 0px;">
				<div style="font-size: 4vh; margin-top: 0px; padding-top: calc(20vh - 2vh - 0.5vh);" class="">
					<h1 style="padding-top: 0.5vh; padding-bottom: 0.5vh; font-size: 4vh; max-width: 45vh; margin-left: auto; margin-right: auto; margin-top: 0px;" class="green-bg rounded">Show me on a map</h1>
				</div>
			</div>
		</div>
		<button onclick="window.location.href='https://map.concept3d.com/?id=568#!m/57964?sbc/?s/taylor%20hall';"
			style="background-color: transparent; font-size: 2vh; width: 90vw; max-width: 80vh; margin-left: auto; margin-right: auto; margin-top: 0px;">
			I need help finding Taylor Hall!
		</button>

	</div>

  <br>

</div>
</template>

<script>
export default {
  data: () => {
    return {
      info: "Every Tuesday at 9:00 PM",
      rooms: "abc",
      building: "Taylor Hall",
    }
  },
}

console.log("yeet");
</script>
