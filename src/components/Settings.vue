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
    <div v-if="coins && coins.length">
      <md-table
        md-sort="name"
        md-sort-order="asc"
        id="marketCap">
        <thead>
          <md-table-row class="textRight">
            <md-table-head>#</md-table-head>
            <md-table-head class="textLeft">Name</md-table-head>
            <md-table-head class="textLeft">Symbol</md-table-head>
            <md-table-head>Price $</md-table-head>
            <md-table-head>Price €</md-table-head>
            <md-table-head>1h</md-table-head>
            <md-table-head>24h</md-table-head>
            <md-table-head>7d</md-table-head>
            <md-table-head>Market Cap</md-table-head>
          </md-table-row>
        </thead>
        <tbody>
          <md-table-row
            v-for="coin of coins"
            :key="coin.id"
            class="textRight">
            <md-table-cell>{{ coin.rank }}</md-table-cell>
            <md-table-cell
              md-label="Name"
              md-sort-by="name"
              class="textLeft">{{ coin.name }}</md-table-cell>
            <md-table-cell class="textLeft">{{ coin.symbol }}</md-table-cell>
            <md-table-cell>{{ coin.price_usd }}</md-table-cell>
            <md-table-cell>{{ coin.price_eur }}</md-table-cell>
            <md-table-cell v-if="coin.percent_change_1h"><span :class="{ positive: coin.percent_change_1h > 0, negative: coin.percent_change_1h < 0}">{{ coin.percent_change_1h }}%</span></md-table-cell><md-table-cell v-else>0%</md-table-cell>
            <md-table-cell v-if="coin.percent_change_24h"><span :class="{ positive: coin.percent_change_24h > 0, negative: coin.percent_change_24h < 0}">{{ coin.percent_change_24h }}%</span></md-table-cell><md-table-cell v-else>0%</md-table-cell>
            <md-table-cell v-if="coin.percent_change_7d"><span :class="{ positive: coin.percent_change_7d > 0, negative: coin.percent_change_7d < 0}">{{ coin.percent_change_7d }}%</span></md-table-cell><md-table-cell v-else>0%</md-table-cell>
            <md-table-cell v-if="coin.market_cap_usd">{{ coin.market_cap_usd }}</md-table-cell><md-table-cell v-else>0</md-table-cell>
          </md-table-row>
        </tbody>
      </md-table>
    </div>
    <div v-if="errors && errors.length">
      <div
        v-for="error of errors"
        :key="error.id">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      coins: [],
      globals: [],
      errors: []
    };
  },

  // Fetches posts when the component is created.
  created() {
    function getCoins() {
      return axios.get(
        "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10"
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
  text-align: right;
}

td:nth-child(2),
td:nth-child(3),
th:nth-child(2),
th:nth-child(3) {
  text-align: left;
}

td:nth-child(1),
th:nth-child(1),
th:nth-child(6),
th:nth-child(7),
th:nth-child(8) {
  text-align: center;
}

.dtr-details {
  text-align: left;
}

.dtr-title {
  text-align: left;
}
.dtr-data {
  text-align: right;
  padding-left: 20px;
  float: right;
}

.dataTables_wrapper {
  padding-top: 1.2rem;
}

/* override table padding from datatables.css */
table.dataTable tbody th,
table.dataTable tbody td {
  padding: 8px 4px;
}
</style>
