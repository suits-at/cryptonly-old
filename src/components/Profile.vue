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
      :options="options" />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { ClientTable } from "vue-tables-2";
import "bootstrap/dist/css/bootstrap.css";
import percentChange1h from "./percentChange1h";
import percentChange24h from "./percentChange24h";
import percentChange7d from "./percentChange7d";

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
        "percentChange1h",
        "percentChange24h",
        "percentChange7d",
        "market_cap_usd"
      ],
      options: {
        templates: {
          percentChange1h,
          percentChange24h,
          percentChange7d
        },
        headings: {
          rank: "#",
          name: "Name",
          price_usd: "Price $",
          price_eur: "Price €",
          percentChange1h: "1h",
          percentChange24h: "24h",
          percentChange7d: "7d",
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
        "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100"
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
  },
  methods: {}
};
</script>

<style>
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

.negative {
  color: red;
}

.positive {
  color: limegreen;
}
tr {
  text-align: center;
}

.table th,
.table td {
  padding: 0.15rem;
}
</style>
