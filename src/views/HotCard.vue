<template>
  <div class="hot-card-root">
    <HotCardContent></HotCardContent>
  </div>
</template>

<script>
// @ is an alias to /src
import HotCardContent from '@/components/HotCard.vue'

export default {
  name: 'HotCard',
  components: {
      HotCardContent
  },
  mounted() {
    let style = document.createElement('style');
    style.innerHTML = `
        @page {
            size: 4.25in 5.5in;
        }
    `;
    this.$el.appendChild(style);
  }
}
</script>

<style scoped lang="scss">

.hot-card-root, .hot-card-root > .landing {
    height: 5.5in!important;
    width: 4.25in!important;
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
