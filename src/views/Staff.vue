<template>
  <div class="staff">
    <div class="header">
      <div style="height: 5vh"/>
      <h1>Alumni & Staff</h1>
      <h3 class="description">
        Past and present leaders of HacKSU
      </h3>
    </div>
    <div class="list" v-for="(row, rowIndex) in organized" v-bind:key="rowIndex">
      <h2 v-if="row.year != 'current'" class="year">
        Class of {{ row.year }}
      </h2>
      <h2 class="year" v-else>Current Leadership</h2>
      <span class="group">
        <StaffCard v-for="(staff, index) in row.staff" :key="index" :staff="staff"/>
      </span>
    </div>

  </div>
</template>

<script>
import { remult } from "remult";
import StaffCard from '@/components/StaffMember.vue'
import { StaffMember } from "../../db/entities";

function withinTermComparator(s1, s2){
  const terms = ["Spring", "Summer", "Fall"];
  return terms.indexOf(s1.gradTerm) - terms.indexOf(s2.gradTerm);
}

export default {
  name: 'Staff',
  data () {
    return {
      staff: []
    };
  },
  computed: {
    organized(){
      const years = [];
      for (const s of this.staff){
        const year = s.gradYear <= new Date().getFullYear() ? s.gradYear : 'current';
        if (years[year]){
          years[year].push(s);
        } else {
          years[year] = [s];
        }
      }
      const groups = [];
      for (const year of Object.keys(years).sort().reverse()){
        groups.push({
          year,
          staff: years[year].sort(withinTermComparator)
        });
      }
      return groups;
    }
  },
  mounted(){
    const repo = remult.repo(StaffMember);
    repo.find().then(staff => {
      this.staff = staff;
    });
  },
  components: {
    StaffCard,
  }
}
</script>

<style scoped lang="scss">

.staff {
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
      .staff-item {
        vertical-align:top;
        margin: 20px;
      }
    }
  }
}

</style>
