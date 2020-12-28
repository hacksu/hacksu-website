<template>
  <div class="landing">

    <div class="hacksu-box box1" style=""></div>
    <div class="hacksu-box box2" style=""></div>

    <div class="content">
      <img class="main-logo" src="@/assets/logo.svg">
      <h1>{{ content.title }}</h1>
      <p>{{ content.body }}</p>
      <br>
      <button>{{ content.button }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
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

.landing {
  width: 100%;
	height: 100vh;
  overflow: hidden;

  .content {
    @include center;
    @include white;
    margin-top: 20vh;
    h1 {
      font-size: 6vh;
    }
    p {
      @include center;
      font-size: 3.5vh;
      width: 80vw;
      max-width: 80vh;
    }
    button {
      @include green-bg;
      font-size: 3vh;
      width: 60vw;
      max-width: 40vh;
    }
  }
  .main-logo {
    width: 60vw;
    max-width: 60vh;
  }
}

.hacksu-box {
	position: absolute;
	background-image: url(../assets/hacksu-box.png);
	background-size: contain;
	background-repeat: no-repeat;
	width: 40vh;
	max-width: 50vw;
	height: 40vh;
	max-height: 50vw;
	z-index: -1;
  &.box1 {
    background-position-y: 7vh;
    background-position-x: -14vh;
    left: 0px;
    bottom: 0px;
  }
  &.box2 {
    transform: rotate(90deg);
    background-position-x: -7vh;
    background-position-y: -14vh;
    right: 0px;
    top: 0px;
  }
}

</style>
