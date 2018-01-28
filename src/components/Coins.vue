<template>
  <div id="container">
    <div v-if="globals" id="globals">
      <ul id="globalsList">
        <li><strong>Total Market Cap</strong> ${{globals.total_market_cap_usd}}</li>
        <li><strong>24h Volume</strong> ${{globals.total_24h_volume_usd}}</li>
        <li><strong>BTC Dominance</strong> {{globals.bitcoin_percentage_of_market_cap}}%</li>
      </ul>
    </div>
    <div v-if="coins && coins.length">
      <table id="marketCap" class="display" cellspacing="0" width="100%">
        <thead>
        <tr class="textRight">
          <th>#</th>
          <th class="textLeft hideMobile">Name</th>
          <th class="textLeft">Symbol</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>Market Cap</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="coin of coins" class="textRight">
          <td>{{coin.rank}}</td>
          <td class="textLeft hideMobile">{{coin.name}}</td>
          <td class="textLeft">{{coin.symbol}}</td>
          <td>${{coin.price_usd}}</td>
          <td><span v-bind:class="{ positive: coin.percent_change_1h > 0, negative: coin.percent_change_1h < 0}">{{coin.percent_change_1h}}%</span></td>
          <td><span v-bind:class="{ positive: coin.percent_change_24h > 0, negative: coin.percent_change_24h < 0}">{{coin.percent_change_24h}}%</span></td>
          <td><span v-bind:class="{ positive: coin.percent_change_7d > 0, negative: coin.percent_change_7d < 0}">{{coin.percent_change_7d}}%</span></td>
          <td>${{coin.market_cap_usd}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="errors && errors.length">
      <div v-for="error of errors">
        {{error.message}}
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import * as $ from 'jquery';
  import 'datatables.net-responsive';
  import 'datatables.net-dt/css/jquery.dataTables.css';
  import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

  export default {
    data() {
      return {
        coins: [],
        globals: [],
        errors: [],
      };
    },

    // Fetches posts when the component is created.
    created() {
      function getCoins() {
        return axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=-1');
      }

      function getGlobals() {
        return axios.get('https://api.coinmarketcap.com/v1/global/');
      }

      axios.all([getCoins(), getGlobals()])
        .then(axios.spread((coins, globals) => {
          this.coins = coins.data;
          this.globals = globals.data;
          $(document).ready(() => {
            $('#marketCap').DataTable({
              responsive: true,
              lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10, 'All']],
            });
          });
        }))
        .catch((e) => {
          this.errors.push(e);
        });
    },
  };

</script>
<style>
  #container {
    max-width: 1200px;
    margin: 30px auto;
  }
  .textRight {
    text-align: right;
  }
  .textLeft {
    text-align: left;
  }
  #globals {
    padding-bottom: 3rem;
  }
  #globalsList li {
    list-style-type: none;
    float: left;
    margin-left: 10%;
  }
  .negative {
    color: red;
  }
  .positive {
    color: limegreen;
  }
  @media only screen and (max-width: 575px) {
    .hideMobile {
      display: none;
    }
  }
</style>
