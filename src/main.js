import Vue from "vue";
import Master from "@/layouts/Master.vue";

import { store } from "@/store/index";

import router from "./router";

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  },
});

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(Master),
}).$mount("#app");
