<template>
  <table
    id="marketCap"
    class="display"
    cellspacing="0"
    width="100%">
    <thead>
      <tr class="textRight">
        <th>#</th>
        <th>Name</th>
        <th>Sym</th>
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
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
    </tbody>
  </table>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-fixedheader";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";

export default {
  name: "DataTable"
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
