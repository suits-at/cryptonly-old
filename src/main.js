// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueMaterial from "vue-material";
// only import components used, e.g.: import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-material.css";
import App from "./App";
import router from "./router";
import "../node_modules/normalize.css/normalize.css";

Vue.use(VueMaterial);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
