<template>
  <div class="constitution">
    <embed id="embed" type="application/pdf" width="100%" src="constitution.pdf">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Constitution',

}
</script>

<style scoped lang="scss">

.constitution {
  max-height: 100vh;
  overflow-y: hidden;

  embed {
    height: $navbar-height-remaining;
    margin-top: $navbar-height;
  }
}


</style>
