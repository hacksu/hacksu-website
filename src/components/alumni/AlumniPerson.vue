<template>
  <div class="alumni-person" style="display: inline-block">
    <div style="border-radius: 100%; width: 80vw; height: 80vw; max-height: 20vh; max-width: 20vh; background-position: center; background-size: cover;" v-bind:style="{ 'background-image': 'url(' + $data.picture + ')'}">

    </div>
    <h3 style="margin-bottom: 20px; font-size: 20px;">{{ $data.info.name.first }} {{ $data.info.name.last }}</h3>
    <h4 style="margin-top: 5px; margin-bottom: 5px; font-weight: 300;" v-for="role in $data.info.role">{{ role }}</h4>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data: function() {
    var alumni = this.$parent.$parent.alumni;
    console.log(this);
    var person = Object.create(alumni[this.user]);
    if (!person.picture) {
      person.picture = "https://github.com/" + this.user + ".png";
    }
    return person;
  },

}

</script>

<style>

.alumni-person {
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.25s, box-shadow 0.25s;
  border-radius: 25px;
  margin: 15px;
  vertical-align: top;
}

.alumni-person:hover {
  background-color: rgb(235, 238, 240);
  box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
}

</style>
