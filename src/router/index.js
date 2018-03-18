import Vue from "vue";
import Router from "vue-router";
import Coins from "@/components/Coins";
import Gainers1h from "@/components/Gainers1h";
import Gainers24h from "@/components/Gainers24h";
import Gainers7d from "@/components/Gainers7d";
import Information from "@/components/Information";
import Loosers from "@/components/Loosers";
import Portfolio from "@/components/Portfolio";
import Profile from "@/components/Profile";
import Settings from "@/components/Settings";
import Watchlist from "@/components/Watchlist";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Coins",
      component: Coins
    },
    {
      path: "/gainers1h",
      name: "Gainers1h",
      component: Gainers1h
    },
    {
      path: "/gainers24h",
      name: "Gainers24h",
      component: Gainers24h
    },
    {
      path: "/gainers7d",
      name: "Gainers7d",
      component: Gainers7d
    },
    {
      path: "/information",
      name: "Information",
      component: Information
    },
    {
      path: "/loosers",
      name: "Loosers",
      component: Loosers
    },
    {
      path: "/portfolio",
      name: "Portfolio",
      component: Portfolio
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/watchlist",
      name: "Watchlist",
      component: Watchlist
    }
  ]
});
