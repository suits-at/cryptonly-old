<template>
  <div id="app">
    <h3>Vue Tables 2 Demo - Server Component</h3>
    <div id="people">
      <v-server-table
        url="https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100"
        :columns="columns"
        :options="options"/>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
// eslint-disable-next-line
// import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import { ServerTable } from "vue-tables-2";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(ServerTable, {}, false, "bootstrap4");
window.axios = require("axios");

export default {
  name: "Profile",
  data() {
    return {
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
      tableData: [],
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
        columnsDropdown: true,
        requestAdapter(data) {
          return {
            sort: data.orderBy ? data.orderBy : "rank",
            direction: data.ascending ? "asc" : "desc"
          };
        },
        responseAdapter({ data }) {
          return {
            data,
            count: data.length
          };
        }
      }
    };
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
