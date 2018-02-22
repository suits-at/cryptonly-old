import Vue from 'vue';
import Router from 'vue-router';
import Coins from '@/components/Coins';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Coins',
      component: Coins,
    },
  ],
});
