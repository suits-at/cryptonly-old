import Vue from "vue";
import Router from "vue-router";
import Coins from "@/components/Coins";
import Hello from "@/components/Hello";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Coins",
      component: Coins
    },
    {
      path: "/hello",
      name: "Hello",
      component: Hello
    }
  ]
});
