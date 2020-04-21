import Vue from "vue";
import App from "./App";
import { router } from "./router";
// 增加移动端适配
import "amfe-flexible";
new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});
