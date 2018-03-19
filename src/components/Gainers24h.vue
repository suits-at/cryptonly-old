<template>
  <div id="container">
    <md-toolbar class="md-transparent md-dense" md-elevation="3">
      <h3 class="md-title" style="flex: 1">50 biggest gainers</h3>
      <md-tabs md-sync-route class="md-transparent" md-alignment="right">
        <md-tab id="tab-gainers-1h" md-label="1h" to="/gainers1h"></md-tab>
        <md-tab id="tab-gainers-24h" md-label="24h" to="/gainers24h"></md-tab>
        <md-tab id="tab-gainers-7d" md-label="7d" to="/gainers7d"></md-tab>
      </md-tabs>
    </md-toolbar>
    <div>
      <table id="marketCap" class="display" cellspacing="0" width="100%">
        <thead>
        <tr class="textRight">
          <th>#</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price $</th>
          <th>Price €</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>Market Cap</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import * as $ from 'jquery';
  import 'datatables.net-dt/css/jquery.dataTables.css';
  import 'datatables.net-responsive';
  import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
  import 'datatables.net-fixedheader';
  import 'datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css';

  export default {
    mounted() {
      const table = $('#marketCap').DataTable({
        // load data from API via AJAX
        ajax: {
          url: 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=-1',
          dataSrc: '',
        },
        // improve startup performance
        deferRender: true,
        // save state in localStorage without time limit
        // stateSave: true,
        fixedHeader: true,
        // stateDuration: 0,
        responsive: true,
        // paging: false,
        order: [[ 6, 'desc' ]],
        lengthMenu: [50],
        bLengthChange: false,
        dom: 't',
        // define which columns are shown on small displays
        columnDefs: [
          {responsivePriority: 1, targets: 0},
          {responsivePriority: 2, targets: 2},
          {responsivePriority: 3, targets: 3},
          {responsivePriority: 3, targets: 6},
          // format dollar price to:
          // save amount of decimals
          // show thousand seperator
          // add currency symbol
          {
            targets: 3,
            createdCell(td, cellData) {
              if (cellData) {
                let res = cellData.split('.');
                if (res[0]) {
                  if (res[0].length > 3) {
                    res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }
                  res = res[0] + '.' + res[1];
                  return $(td).text('$' + res);
                }
                return $(td).text('$' + cellData);
              }
              return $(td).text('no data yet');
            },
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
                  const dollar = row.price_usd.split('.');
                  if (dollar[1]) {
                    const commas = dollar[1].length;
                    let res = cellData.split('.');
                    res[1] = res[1].slice(0, commas);
                    if (res[0].length > 3) {
                      res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                    res = res[0] + '.' + res[1];
                    return $(td).text(res + '€');
                  }
                }
                return $(td).text(cellData + '€');
              }
              return $(td).text('no data yet');
            },
          },
          // add trailing zero if missing
          // change color if positive or negative value
          // add '%' after value
          {
            targets: [5, 6, 7],
            render(data) {
              if (data) {
                // add trailing zero if missing
                let res = data.split('.');
                if (res[1]) {
                  if (res[1].length < 2) {
                    res[1] += '0';
                  }
                  res = res[0] + '.' + res[1];
                }
                // change color if positive or negative value
                // add '%' after value
                if (res < 0) {
                  return '<span class="negative">' + res + '%</span>';
                } else if (data > 0) {
                  return '<span class="positive">' + res + '%</span>';
                }
                return data + '%';
              }
              return '0%';
            },
          },
        ],
        columns: [
          {data: 'rank'},
          {data: 'name'},
          {data: 'symbol'},
          {data: 'price_usd', type: 'num-fmt'},
          {data: 'price_eur', type: 'num-fmt'},
          {data: 'percent_change_1h', type: 'html-num-fmt'},
          {data: 'percent_change_24h', type: 'html-num-fmt'},
          {data: 'percent_change_7d', type: 'html-num-fmt'},
          // format market cap
          {data: 'market_cap_usd', render: $.fn.dataTable.render.number(',', '.', 0, '$')},
        ],
      });
      // reload data every 60 seconds
      setInterval(() => {
        table.ajax.reload(null, false); // user paging is not reset on reload
      }, 60000);
    },
  };
</script>
<style>
  #container{
    max-width: 1200px;
  }
  tr {
    text-align: right;
  }

  td:nth-child(2), td:nth-child(3),
  th:nth-child(2), th:nth-child(3) {
    text-align: left;
  }

  td:nth-child(1), th:nth-child(1), th:nth-child(6), th:nth-child(7), th:nth-child(8) {
    text-align: center;
  }

  .dtr-details{
    text-align: left;
  }

  .dtr-title{
    text-align: left;
  }
  .dtr-data{
    text-align: right;
    padding-left: 20px;
    float: right;
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

  .dataTables_wrapper {
    padding-top: 1.2rem;
  }
</style>
