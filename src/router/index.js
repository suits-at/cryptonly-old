import Vue from "vue";
import Router from "vue-router";
import Coins from "@/components/Coins";
import Gainers1h from "@/components/Gainers1h";
import Gainers24h from "@/components/Gainers24h";
import Gainers7d from "@/components/Gainers7d";
import Information from "@/components/Information";
import Loosers1h from "@/components/Loosers1h";
import Loosers24h from "@/components/Loosers24h";
import Loosers7d from "@/components/Loosers7d";
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
      path: "/loosers1h",
      name: "Loosers1h",
      component: Loosers1h
    },
    {
      path: "/loosers24h",
      name: "Loosers24h",
      component: Loosers24h
    },
    {
      path: "/loosers7d",
      name: "Loosers7d",
      component: Loosers7d
    },
    {
      path: "/information",
      name: "Information",
      component: Information
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
