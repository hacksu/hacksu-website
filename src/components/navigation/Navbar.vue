<template>
  <div class="navbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.navbar {
  position: fixed;
  width: 100vw;
  height: 4vh;
  top: 0px;
  left: 0px;
  padding: 30px 10px 30px 10px;
}

</style>
