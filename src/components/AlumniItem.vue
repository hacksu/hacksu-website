<template>
  <div class="alumni-item">
    <div class="photo" v-bind:style="{ 'background-image': 'url(' + image + ')', }">Photo of {{ name }}</div>
    <h3 class="name">{{ name }}</h3>
    <p class="graduated" v-if="graduated">Graduated {{ graduate }}</p>
    <div class="body" v-html="body"/>

  </div>
</template>

<script>

export default {
  name: 'AlumniItem',
  props: {
    alumni: Object,
  },
  data() {
    return this.alumni;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.alumni-item {
  @include white-bg;
  @include rounded;
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
  //transform: scale(0.95);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
  }
  //display: table-cell;
  display: inline-block;
  padding: 2vh;
  text-align: center;
  @include mobile {
    @include center;
    display: block;
  }
  .photo {
    @include center;
    background-position: center;
    background-size: cover;
    border-radius: 100%;
    color: transparent;
    height: 20vh;
    width: 20vh;
    max-width: 60vw;
    max-height: 60vw;
  }
  .name {
    margin-bottom: 5px;
  }
  .graduated {
    margin-top: 0px;
    font-weight: lighter;
    font-size: 1rem;
  }
  .body {
    display: inline;
  }
}

</style>
