<template>
  <div style="background-color: rgb(235, 238, 240); color: black; text-align: center; padding-top: 100px; padding-bottom: 50px;">
    <div style="margin-left: auto; margin-right: auto; margin-bottom: 15vh;" v-for="(items, index) in _alumni()">
      <div style="text-align: center; width: 130vmin; max-width: 95vw; margin-left: auto; margin-right: auto;">
        <div class="bar">
          Class of {{ items[0].year }}
        </div>
        <alumni-person v-for="user in items[1]" v-bind:user="user.username"></alumni-person>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return this.$parent.$data;
    },
    methods: {
      _alumni: function() {
        var gradYears = {};
        var alum = this.$parent.alumni;
        Object.keys(alum).forEach(key => {
          var obj = alum[key];
          var gradsemester = /*(obj.graduation.semester * 10000) +*/ obj.graduation.year;
          gradsemester = 10000 - gradsemester;
          if (!gradYears[gradsemester]) {
            gradYears[gradsemester] = [obj.graduation, []];
          }
          obj.username = key;
          gradYears[gradsemester][1].push(obj);
        });
        return gradYears;
      }
    },
    mounted: function() {

    },
  }

</script>

<style>

.bar {
  text-align: left;
  font-size: 25px;
  padding-bottom: 25px;
}
.bar:after {
  content: " ";
  display: inline-block;
  width: 100%;
  position: relative;
  left: 0px;

  float: right;
  height: 1px;
  background-color: #142027;
  opacity: 0;
}

</style>
