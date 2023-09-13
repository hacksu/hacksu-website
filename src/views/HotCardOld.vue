<template>
  <div class="hot-card-root">
    <HotCardContent></HotCardContent>
  </div>
</template>

<script>
// @ is an alias to /src
import HotCardContent from '@/components/HotCardOld.vue'

export default {
  name: 'HotCardOld',
  components: {
      HotCardContent
  },
  mounted() {
    let style = document.createElement('style');
    style.innerHTML = `
        @page {
            size: 4.75in 6in;
        }
    `;
    this.$el.appendChild(style);
  }
}
</script>

<style scoped lang="scss">

.hot-card-root, .hot-card-root > .landing {
    height: 6in!important;
    width: 4.75in!important;
    // background-color: #142027;
}

// @media print {
//   body {
//     width: 5.5in;
//     height: 4.25in;
//   }
//   /* etc */
// }

</style>
