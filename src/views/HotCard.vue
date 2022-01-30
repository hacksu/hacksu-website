<template>
  <div class="hot-card-root">
    <HotCardContent></HotCardContent>
    <div className="hidePrint" style="position: fixed; left: 500px; top: 200px; color: black">
      <h1>Instructions</h1>
      <ol>
        <li>Use Chrome</li>
        <li>Print (Ctrl+P)</li>
        <li>Destination: "Save as PDF" (NOT Microsoft PDF)</li>
        <li>Uncheck Header (if applicable)</li>
        <li>Check "Background Graphics"</li>
        <li>Set Margins to "None"</li>
      </ol>
    </div>
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
            size: calc(4.25in + (2 * 0.125in)) calc(5.5in + (2 * 0.125in));
        }
    `;
    this.$el.appendChild(style);
  }
}
</script>

<style scoped lang="scss">

.hot-card-root, .hot-card-root > .landing {
    height: calc(5.5in + (2 * 0.125in))!important;
    width: calc(4.25in + (2 * 0.125in))!important;
    font-family: atkinson;
    // background-color: #142027;
}

@media print {
  .hidePrint {
    display: none;
  }
}

// @media print {
//   body {
//     width: 5.5in;
//     height: 4.25in;
//   }
//   /* etc */
// }

</style>
