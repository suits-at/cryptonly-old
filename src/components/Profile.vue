<template>
  <div id="container">
    <div
      v-if="globals"
      class="md-layout"
      id="globals">
      <div class="md-layout-item"><strong>Total Market Cap:</strong> ${{ globals.total_market_cap_usd }}</div>
      <div class="md-layout-item"><strong>24h Volume:</strong>
        ${{ globals.total_24h_volume_usd }}</div>
      <div class="md-layout-item"><strong>BTC Dominance:</strong>
        {{ globals.bitcoin_percentage_of_market_cap }}%</div>
    </div>
    <v-client-table
      :columns="columns"
      :data="coins"
      :options="options">

      <!--<div-->
      <!--slot="child_row"-->
      <!--slot-scope="props">-->
      <!--This is a {{ props.row.name }} special-->
      <!--</div>-->
    </v-client-table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { ClientTable } from "vue-tables-2";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(ClientTable, {}, false, "bootstrap4");

export default {
  name: "GainersToolbar",
  data() {
    return {
      coins: [],
      globals: [],
      errors: [],
      columns: [
        "rank",
        "name",
        "symbol",
        "price_usd",
        "price_eur",
        "percent_change_1h",
        "percent_change_24h",
        "percent_change_7d",
        "market_cap_usd"
      ],
      options: {
        headings: {
          rank: "#",
          name: "Name",
          price_usd: "Price $",
          price_eur: "Price €",
          percent_change_1h: "1h",
          percent_change_24h: "24h",
          percent_change_7d: "7d",
          market_cap_usd: "Market Cap"
        },
        sortable: [
          "rank",
          "name",
          "symbol",
          "price_usd",
          "price_eur",
          "percent_change_1h",
          "percent_change_24h",
          "percent_change_7d",
          "market_cap_usd"
        ],
        filterable: [
          "rank",
          "name",
          "symbol",
          "price_usd",
          "price_eur",
          "percent_change_1h",
          "percent_change_24h",
          "percent_change_7d",
          "market_cap_usd"
        ],
        columnsDropdown: true
      }
    };
  },
  created() {
    function getCoins() {
      return axios.get(
        "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=50"
      );
    }

    function getGlobals() {
      return axios.get("https://api.coinmarketcap.com/v1/global/?convert=EUR");
    }

    axios
      .all([getCoins(), getGlobals()])
      .then(
        axios.spread((coins, globals) => {
          this.coins = coins.data;
          this.globals = globals.data;
          // add thousands seperator
          this.globals.total_market_cap_usd = globals.data.total_market_cap_usd.toLocaleString(
            "en-US"
          );
          this.globals.total_24h_volume_usd = globals.data.total_24h_volume_usd.toLocaleString(
            "en-US"
          );
        })
      )
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style>
/*.VuePagination {*/
/*text-align: center;*/
/*}*/

/*.vue-pagination-ad {*/
/*text-align: center;*/
/*}*/

/*.VueTables__child-row-toggler {*/
/*width: 16px;*/
/*height: 16px;*/
/*line-height: 16px;*/
/*display: block;*/
/*margin: auto;*/
/*text-align: center;*/
/*}*/

/*.VueTables__child-row-toggler--closed::before {*/
/*content: "+";*/
/*}*/

/*.VueTables__child-row-toggler--open::before {*/
/*content: "-";*/
/*}*/
.VueTables__search-field {
  display: flex;
}
.VueTables__limit-field {
  display: flex;
}

#container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 10px;
}

.textRight {
  text-align: right;
}

.textCenter {
  text-align: center;
}

.negative {
  color: red;
}

.positive {
  color: limegreen;
}
tr {
  text-align: center;
}

/*td:nth-child(2),*/
/*th:nth-child(2) {*/
/*text-align: left;*/
/*}*/

/*th:nth-child(1),*/
/*td:nth-child(1),*/
/*th:nth-child(3),*/
/*td:nth-child(3),*/
/*th:nth-child(6),*/
/*th:nth-child(7),*/
/*th:nth-child(8) {*/
/*text-align: center;*/
/*}*/

.table th,
.table td {
  padding: 0.15rem;
}
</style>
