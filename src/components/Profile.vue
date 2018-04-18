<template>
  <div id="app">
    <h3 class="vue-title">Vue Tables 2 Demo - Client Component</h3>
    <v-client-table
      :columns="columns"
      :data="coins"
      :options="options">

      <div
        slot="child_row"
        slot-scope="props">
        This is a {{ props.row.name }} special
      </div>
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
        "id",
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
        sortable: ["rank", "name", "symbol"],
        filterable: ["rank", "name", "symbol"],
        columnsDropdown: true
      }
    };
  },
  created() {
    function getCoins() {
      return axios.get(
        "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=30"
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
.VuePagination {
  text-align: center;
}

.vue-pagination-ad {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
.VueTables__search-field {
  display: flex;
}
.VueTables__limit-field {
  display: flex;
}
</style>
