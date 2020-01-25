<template>
  <div class="dropdown">
    <div class="dropdown-box rounded navbar-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fix: function() {
      var ow = this.$el.parentNode.offsetWidth;
      var pad = (ow - this.$el.offsetWidth) / 2;
      var w = ow + "px";
      Object.values(this.$el.getElementsByTagName("button")).forEach(function(item) {
        item.style.width = w;
        item.classList.add("navbtn");
        item.classList.add("underline");
        item.style.fontSize = "1.5vh";
      });
      this.$el.style.marginLeft = "-" + pad + "px";
      this.$el.firstChild.style.maxWidth = w;
      if (this.$el.parentNode.parentNode.id == "sidenav-contents") {
        this.$el.style.marginLeft = "-2vw";
        if (this.$root.$data.mobile) {
          console.log(ow);
          Object.values(this.$el.getElementsByTagName("button")).forEach(function(item) {
            item.style.width = ow + "px";
          });
          this.$el.firstChild.style.maxWidth = ow + "px";
        }
      }
    },
  },
  mounted: function() {
    this.fix();
    var self = this;
    this.$el.parentNode.addEventListener("mouseover", function() {
      self.$el.classList.add("active");
      if (self.$el.parentNode.parentNode.id == "sidenav-contents") {
        self.fix();
      }
    })
    this.$el.parentNode.addEventListener("mouseleave", function() {
      self.$el.classList.remove("active");
    })
  },

}

</script>

<style>

.dropdown {
  height: 0px;
  opacity: 0;
  transition: opacity 0.25s, max-height 0.25s;
  pointer-events: none;
}

.dropdown.active {
  opacity: 1;
  pointer-events: initial;
}

.dropdown.active .dropdown-box {

}

.dropdown-box {
  position: absolute;
  overflow: hidden;
  /*transition: max-height 0.25s;*/
  margin-top: 15px;
}

.dropdown-box button {
  width: initial;
  display: inline-block;
  background-color: transparent;
}

</style>
