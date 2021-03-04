<template>
  <div class="alumni">
    <div class="header">
      <div style="height: 5vh"/>
      <h1>{{ title }}</h1>
      <h3 class="description" v-html="description"/>
    </div>
    <div class="list" v-for="(row, rowIndex) in organized" v-bind:key="rowIndex">
      <h2 class="year">Class of {{ row.year }}</h2>
      <span class="group">
        <AlumniItem v-for="(alumni, index) in row.list" v-bind:key="index" v-bind:alumni="alumni"/>
      </span>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { alumni as details } from '@/details'
import AlumniItem from '@/components/AlumniItem.vue'

const DAY = 24 * 60 * 60 * 1000;
const MONTH = 30 * DAY;

const TODAY = new Date(new Date().getTime() + 0 * MONTH);
const currentYear = TODAY.getFullYear();
let ACADEMICYEAR = TODAY.getFullYear();


const SEMESTERS = {
  Fall: 0.3,
  Spring: 0.6,
  Summer: 0,
}
const SEMESTER = SEMESTERS[(() => {
  let month = TODAY.getMonth();
  let day = TODAY.getDate();
  if (day > 22) {
    month = (month + 1) % 12;
    ACADEMICYEAR++;
  }
  if (month < 4) {
    ACADEMICYEAR--;
    return "Spring"
  } else if (month < 7) {
    return "Summer"
  } else {
    return "Fall"
  }
})()];

console.log(`${ACADEMICYEAR} - ${ACADEMICYEAR + 1}, `, SEMESTER);

export default {
  name: 'Alumni',
  data() {
    return details;
  },
  computed: {
    organized() {
      let years = {};

      let currentSemester = 0;
      let showCurrent = this.showCurrent;
      for (let x of this.list) {
        let index = 'current';
        let year = currentYear;
        if (x.graduate) {
          index = String(x.graduate).split(' ').pop();
          year = Number(index);
        }
        if (index) {
          if (!(index in years)) {
            years[index] = {
              year: year,
              list: [],
            }
          }
          x.year = year;
          if (x.graduate && x.graduate.indexOf(' ') > 0) {
            let semester = SEMESTERS[x.graduate.split(' ')[0]];
            x.year += semester;
          }
          x.graduated = x.year <= ACADEMICYEAR + SEMESTER;
          //console.log(x.name, x.year, '<', ACADEMICYEAR, '+', SEMESTER);
          if (showCurrent || x.graduated) {
            years[index].list.push(x);
          }
        }
      }
      years = Object.values(years).sort((a, b) => {
        return b.year - a.year;
      })
      for (let x of years) {
        x.list.sort((a, b) => {
          return b.year - a.year;
        })
      }
      return years.filter(o => o.list.length > 0);
    }
  },
  components: {
    AlumniItem,
  }
}
</script>

<style scoped lang="scss">

.alumni {
  @include white-bg;
  .header {
    text-align: center;
    width: 100vw;
    padding-top: $navbar-height;
    padding-bottom: 5vh;
    background: linear-gradient(to top left, #35c982, #4683FF);
    .description {
      @include center;
      width: 80vw;
      max-width: 60vmin;
      font-weight: 200;
    }
  }
  .list {
    @include center;
    color: black;
    max-width: 90vw;
    .year {
      text-align: left;
    }
    .group {
      @include center;
      //display: table;
      //border-spacing: 20px;
      display: block;
      .alumni-item {
        vertical-align:top;
        margin: 20px;
      }
    }
  }
}

</style>
