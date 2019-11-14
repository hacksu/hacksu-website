import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import jQuery from 'jquery'
window.jQuery = window.$ = jQuery

// Load Vue Components
const requireComponent = require.context("./components/", true, /\.vue$/);
requireComponent.keys().forEach(filename => {
  console.log(filename);
  const component = requireComponent(filename)
  var componentName = filename.split("/").pop().replace(/\.\w+$/, "").replace(/-([a-z])/g,g=>g[1].toUpperCase()).replace(/(\b\w)/gi,m=>m.toUpperCase());
  componentName = componentName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase().substr(1);
  console.log(componentName);
  Vue.component(componentName, component.default || component);
});
// Components such as TableThing.vue will be converted to "<table-thing></table-thing>"

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
