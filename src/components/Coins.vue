<template>
  <div id="container">
    <div v-if="globals" id="globals">
      <p><strong>Total Market Cap:</strong> ${{globals.total_market_cap_usd}}</p>
      <p><strong>24h Volume:</strong> ${{globals.total_24h_volume_usd}}</p>
      <p><strong>BTC Dominance:</strong> {{globals.bitcoin_percentage_of_market_cap}}%</p>
    </div>
    <div v-if="coins && coins.length">
      <table id="marketCap" class="display" cellspacing="0" width="100%">
        <thead>
        <tr class="textRight">
          <th>#</th>
          <th class="textLeft">Name</th>
          <th class="textLeft">Symbol</th>
          <th>Price $</th>
          <th>Price €</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>Market Cap</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="coin of coins" class="textRight">
          <td>{{coin.rank}}</td>
          <td class="textLeft">{{coin.name}}</td>
          <td class="textLeft">{{coin.symbol}}</td>
          <td>{{coin.price_usd}}</td>
          <td>{{coin.price_eur}}</td>
          <td v-if="coin.percent_change_1h"><span v-bind:class="{ positive: coin.percent_change_1h > 0, negative: coin.percent_change_1h < 0}">{{coin.percent_change_1h}}%</span></td><td v-else>0%</td>
          <td v-if="coin.percent_change_24h"><span v-bind:class="{ positive: coin.percent_change_24h > 0, negative: coin.percent_change_24h < 0}">{{coin.percent_change_24h}}%</span></td><td v-else>0%</td>
          <td v-if="coin.percent_change_7d"><span v-bind:class="{ positive: coin.percent_change_7d > 0, negative: coin.percent_change_7d < 0}">{{coin.percent_change_7d}}%</span></td><td v-else>0%</td>
          <td v-if="coin.market_cap_usd">{{coin.market_cap_usd}}</td><td v-else>0</td>
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
        return axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=-1');
      }

      function getGlobals() {
        return axios.get('https://api.coinmarketcap.com/v1/global/?convert=EUR');
      }

      axios.all([getCoins(), getGlobals()])
        .then(axios.spread((coins, globals) => {
          this.coins = coins.data;
          this.globals = globals.data;
          // add thousands seperator
          this.globals.total_market_cap_usd = globals.data.total_market_cap_usd.toLocaleString('en-US');
          this.globals.total_24h_volume_usd = globals.data.total_24h_volume_usd.toLocaleString('en-US');
          $(document).ready(() => {
            $('#marketCap').DataTable({
              // save state in localStorage without time limit
              stateSave: true,
              stateDuration: 0,
              responsive: true,
              lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10, 'All']],
              columnDefs: [
                { responsivePriority: 1, targets: 0 },
                { responsivePriority: 2, targets: 2 },
                { responsivePriority: 3, targets: 3 },
                { responsivePriority: 3, targets: 6 },
              ],
              columns: [
                { data: coins.rank },
                { data: coins.name },
                { data: coins.symbol },
                { data: coins.price_usd,
                  type: 'num-fmt',
                  // format numbers to:
                  // save amount of decimals
                  // show thousand seperator
                  // add currency symbol
                  render(data) {
                    let res = data.split('.');
                    if (res[0]) {
                      if (res[0].length > 3) {
                        res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      }
                      res = res[0] + '.' + res[1];
                      return '$' + res;
                    }
                    if (data) {
                      return '$' + data;
                    }
                    return 'no data yet';
                  },
                },
                { data: coins.price_eur,
                  type: 'num-fmt',
                  // format numbers to:
                  // show same amount of decimals like usd
                  // show thousand seperator
                  // add currency symbol
                  render(data, type, row) {
                    const dollar = row[3].split('.');
                    if (dollar[1]) {
                      const commas = dollar[1].length;
                      let res = data.split('.');
                      res[1] = res[1].slice(0, commas);
                      if (res[0].length > 3) {
                        res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      }
                      res = res[0] + '.' + res[1];
                      return '€' + res;
                    }
                    if (data) {
                      return '€' + data;
                    }
                    return 'no data yet';
                  },
                },
                { data: coins.percent_change_1h, type: 'html-num-fmt' },
                { data: coins.percent_change_24h, type: 'html-num-fmt' },
                { data: coins.percent_change_7d, type: 'html-num-fmt' },
                { data: coins.market_cap_usd, render: $.fn.dataTable.render.number(',', '.', 0, '$') },
              ],
              createdRow(row, data) {
                $('td', row).eq(0).html('#' + data[0]);
              },
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
    margin: 0 auto;
    padding: 20px;
  }
  .textRight {
    text-align: right;
  }
  .textLeft {
    text-align: left;
  }
  .negative {
    color: red;
  }
  .positive {
    color: limegreen;
  }
  .dataTables_wrapper {
    padding-top: 1.2rem;
  }
  /* adjust market cap styling*/
  #globals{
    display: grid;
    grid-template-columns: repeat( 1, var(--width) );
  }
  @media screen and (min-width: 30em) and (max-width: 75em) {
    #globals {
      grid-template-columns: repeat( 3, 1fr );
    }
    #globals p:nth-child(2){
      text-align: center;
    }
    #globals p:nth-child(3){
      text-align: right;
    }
  }
  @media screen and (min-width: 75em) {
    :root {
      --width: calc( (1200px) / 3 );
    }
    #globals {
      grid-template-columns: repeat( 3, var(--width) );
    }
    #globals p:nth-child(2){
      text-align: center;
    }
    #globals p:nth-child(3){
      text-align: right;
    }
  }
</style>
