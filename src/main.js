import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

// Load Vue Components
const requireComponent = require.context("./components/", true, /\.vue$/);
requireComponent.keys().forEach(function(filename) {
  console.log(filename);
  const component = requireComponent(filename)
  var componentName = filename.split("/").pop().replace(/\.\w+$/, "").replace(/-([a-z])/g,function(g) { return g[1].toUpperCase(); }).replace(/(\b\w)/gi,function(m) { return m.toUpperCase(); });
  componentName = componentName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase().substr(1);
  console.log(componentName);
  Vue.component(componentName, component.default || component);
});
// Components such as TableThing.vue will be converted to "<table-thing></table-thing>"

var app = new Vue({
  router,
  render: function (h) { return h(App) },
  data: function() {
		return {
			mobile: false,
		}
	},
});

Vue.prototype.$app = app;

app.$mount('#app');

var checkMobile = function() {
  if (window.innerWidth <= 800 || window.innerHeight <= 600) {
    app.$data.mobile = true;
  } else {
    app.$data.mobile = false;
  }
}

window.addEventListener("resize", checkMobile);
checkMobile();

window.$vue = function(el) {
  return el.__vue__;
}
