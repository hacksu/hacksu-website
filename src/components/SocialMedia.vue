<template>
  <div class="footer">
    <a class="social" href="https://www.facebook.com/groups/hacksu"><img src="../assets/facebook-white.svg"></a>
    <a class="social" href="https://twitter.com/_hacksu"><img src="../assets/twitter-white.svg"></a>
    <a class="social" href="https://www.instagram.com/hacksu/"><img src="../assets/instagram-white.svg"></a>
    <a class="social" href="https://github.com/hacksu"><img src="../assets/github-padded-white.svg"></a>
    <a v-if="discord" class="social" v-bind:href="discord"><img src="../assets/discord-square-white.svg"></a>
  </div>
</template>

<script>
import { discord } from '@/details';

export default {
  name: 'SocialMedia',
  data() {
    return {
      discord,
    }
  },
}
</script>

<style lang="scss" scoped>

.footer {
  padding-bottom: 5vh;
  background-color: rgb(20, 32, 39);
  text-align: center;
  .social {
    display: inline-block;
    padding: 5vh 1.25vh;
    img {
      height: 10vh;
      max-height: 15vw;
      transition: transform 0.25s, filter 0.25s;
    }
    &:hover {
      img {
        transform: scale(1.1);
        filter: brightness(120%);
      }
    }
  }
}

@media (max-width: 800px) {
  .footer {
    .social img {
      height: 10vw;
    }
  }
}

</style>
