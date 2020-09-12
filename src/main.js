import Vue from "vue";
import Master from "@/layouts/Master.vue";
import utils from "./utils";

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

Vue.filter("capitalize", utils.textToUppercase);

Vue.config.productionTip = false;

new Vue({
  metaInfo: {
    titleTemplate: "f",
  },
  store,
  router,
  render: (h) => h(Master),
}).$mount("#app");
