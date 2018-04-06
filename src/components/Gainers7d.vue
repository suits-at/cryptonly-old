<template>
  <div id="container">
    <gainers-toolbar/>
    <data-table/>
  </div>
</template>

<script>
import * as $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-fixedheader";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import GainersToolbar from "./GainersToolbar";
import DataTable from "./DataTable";

export default {
  components: { DataTable, GainersToolbar },
  mounted() {
    const table = $("#marketCap").DataTable({
      // load data from API via AJAX
      ajax: {
        url: "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=-1",
        dataSrc: ""
      },
      // improve startup performance
      deferRender: true,
      // save state in localStorage without time limit
      // stateSave: true,
      fixedHeader: true,
      // stateDuration: 0,
      responsive: true,
      // paging: false,
      order: [[7, "desc"]],
      lengthMenu: [50],
      bLengthChange: false,
      dom: "t",
      // define which columns are shown on small displays
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 2 },
        { responsivePriority: 3, targets: 3 },
        { responsivePriority: 3, targets: 7 },
        // format dollar price to:
        // save amount of decimals
        // show thousand seperator
        // add currency symbol
        {
          targets: 3,
          createdCell(td, cellData) {
            if (cellData) {
              let res = cellData.split(".");
              if (res[0]) {
                if (res[0].length > 3) {
                  res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                res = res[0] + "." + res[1];
                return $(td).text("$" + res);
              }
              return $(td).text("$" + cellData);
            }
            return $(td).text("no data yet");
          }
        },
        // format euro price to:
        // show same amount of decimals like usd
        // show thousand seperator
        // add currency symbol
        {
          targets: 4,
          createdCell(td, cellData, row) {
            if (cellData) {
              // if there is a valid dollar price
              if (row.price_usd) {
                const dollar = row.price_usd.split(".");
                if (dollar[1]) {
                  const commas = dollar[1].length;
                  let res = cellData.split(".");
                  res[1] = res[1].slice(0, commas);
                  if (res[0].length > 3) {
                    res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                  res = res[0] + "." + res[1];
                  return $(td).text(res + "€");
                }
              }
              return $(td).text(cellData + "€");
            }
            return $(td).text("no data yet");
          }
        },
        // add trailing zero if missing
        // change color if positive or negative value
        // add '%' after value
        {
          targets: [5, 6, 7],
          render(data) {
            if (data) {
              // add trailing zero if missing
              let res = data.split(".");
              if (res[1]) {
                if (res[1].length < 2) {
                  res[1] += "0";
                }
                res = res[0] + "." + res[1];
              }
              // change color if positive or negative value
              // add '%' after value
              if (res < 0) {
                return '<span class="negative">' + res + "%</span>";
              } else if (data > 0) {
                return '<span class="positive">' + res + "%</span>";
              }
              return data + "%";
            }
            return "0%";
          }
        }
      ],
      columns: [
        { data: "rank" },
        { data: "name" },
        { data: "symbol" },
        { data: "price_usd", type: "num-fmt" },
        { data: "price_eur", type: "num-fmt" },
        { data: "percent_change_1h", type: "html-num-fmt" },
        { data: "percent_change_24h", type: "html-num-fmt" },
        { data: "percent_change_7d", type: "html-num-fmt" },
        // format market cap
        {
          data: "market_cap_usd",
          render: $.fn.dataTable.render.number(",", ".", 0, "$")
        }
      ]
    });
    // reload data every 60 seconds
    setInterval(() => {
      table.ajax.reload(null, false); // user paging is not reset on reload
    }, 60000);
  }
};
</script>
