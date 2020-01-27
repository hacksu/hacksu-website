<template>
  <div v-bind:style="{ 'display': (str != false) ? 'inline-block!important' : 'none', }" class="tooltip-main navbar-scroll rounded">
    {{ str }}
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      str: false,
    }
  },
  methods: {
    move: function(e) {
      var strr = false;
      if (this.$el && this.$el.style != undefined) {
        /*this.$el.style.left = e.clientX + "px";
        this.$el.style.top = e.clientY + "px";*/
        var cw = this.$el.clientWidth;
        var ch = this.$el.clientHeight;
        this.$el.style.left = (((e.clientX + cw) > (window.innerWidth * 0.95)) ? (e.clientX - cw) : (e.clientX)) + "px"; //(Math.min((e.clientX + cw), window.innerWidth) - cw) + "px";
        this.$el.style.top = (((e.clientY + ch) > (window.innerHeight * 0.95)) ? (e.clientY - ch) : (e.clientY)) + "px"; //e.clientY + "px";
        /*if (!this.$el.classList.contains("show")) {
          this.$el.classList.add("show");
        }*/
      }
      if (e.srcElement) {
        if (e.srcElement.dataset.tooltip) {
          strr = e.srcElement.dataset.tooltip;
        }
      }
      this.str = strr;
    },
  },
  created: function() {
    var _this = this;
    window.addEventListener("mousemove", function(e) {
      _this.move.apply(_this, [e])
    });
  },
  mounted: function() {
    //this.$el.classList.remove("show");
  }
}

</script>

<style>

.tooltip-main {
  padding: 10px!important;
  position: fixed;
  z-index: 99999999999999999999;
  pointer-events: none;
  opacity: 0.75;
  max-width: 20vw;
}


</style>
