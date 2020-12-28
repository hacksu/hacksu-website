<template>
  <div class="meetings">
    hi
  </div>
</template>

<script>
export default {
  name: 'Meetings',
  data() {
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
					img: require("@/assets/images/github-white.svg"),

				},
			],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.meetings {
  @include background(linear-gradient(to top left, #35c982, #4683FF));
  width: 100%;
	min-height: 100vh;
  overflow: hidden;
}

</style>
