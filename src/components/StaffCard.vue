<template>
  <component :is="(github || link) ? 'a' : 'div'" class="staff-item"
      :href="link ? link : github ? 'https://github.com/' + github : ''" target="_blank">
    <div class="photo" :style="{ 'background-image': 'url(' + image + ')', }"></div>
    <h3 class="name">{{ name }}</h3>
    <p class="graduated" v-if="graduate">Graduated {{ graduate }}</p>
    <div class="body">
      <p v-for="title in titles">{{ title }}</p>
    </div>
  </component>
</template>

<script>

export default {
  name: 'StaffCard',
  props: {
    staff: Object,
  },
  data() {
    return this.staff;
  },
  computed: {
    image(){
      if (this.photo){
        return this.photo;
      } else if (this.github){
        return `https://github.com/${this.github}.png`;
      } else {
        return "";
      }
    },
    graduate(){
      if (this.gradYear <= new Date().getFullYear()){
        return this.gradTerm + " " + this.gradYear;
      } else return null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.staff-item {
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
  text-decoration: none;
  color: inherit;
}

</style>
