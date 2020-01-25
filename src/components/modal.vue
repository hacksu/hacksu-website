<template>
  <div class="modal-container" v-bind:class="{ active: active, }" v-on:click="outsidehide" v-on:scroll="cancelscroll" v-on:wheel="cancelscroll">
    <div class="modal-box rounded" v-bind:style="{ 'max-width': ($app.mobile) ? '90vw' : '50vh', }">
      <div class="modal-padding">
        <button v-if="!$app.mobile" v-on:click="hide" style="opacity: 0.25; position: absolute; padding: 0px; right: 30px; top: 25px; background-color: transparent; color: transparent;"><img style="height: 2vh;" src="../assets/images/close.svg" /></button>

          <slot></slot>
          <button style="filter: brightness(100%)!important; color: black; opacity: 0.25;" v-on:click="hide">Close this dialog</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        active: false,
      }
    },
    methods: {
      toggle: function() {
        this.$data.active = !this.$data.active;
      },
      show: function() {
        this.$data.active = true;
      },
      hide: function() {
        this.$data.active = false;
      },
      outsidehide: function(e) {
        if (e) {
          if (e.srcElement && !e.srcElement.classList.contains("modal-container")) {
            return false;
          }
        }
        this.hide();
      },
      cancelscroll: function(e) {
        e.preventDefault();
      }
    },
  }
</script>

<style>
  .modal-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9999999999;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .modal-container.active {
    pointer-events: initial!important;
    opacity: 1;
  }

  .modal-container .modal-box {
    background-color: rgb(235, 238, 240);
    margin: auto;
    margin-top: 50vh;
    max-height: 80vh;
    padding: 10px;
    transition: transform 0.25s;
    transform: scale(0) translateY(-50%);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
  }

  .modal-container.active .modal-box {
    transform: scale(1)  translateY(-50%)!important;
  }

  .modal-container .modal-box .modal-padding {
    padding: 15px;
    min-height: 20vh;
    max-width: calc(80vw - 30px);
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    max-height: calc(80vh - 30px);
    margin-left: auto;
    margin-right: auto;
  }
</style>
