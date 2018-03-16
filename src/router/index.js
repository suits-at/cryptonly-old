import Vue from "vue";
import Router from "vue-router";
import Coins from "@/components/Coins";
import Gainers from "@/components/Gainers";
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
      path: "/gainers",
      name: "Gainers",
      component: Gainers
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
