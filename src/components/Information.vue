<template>
  <div style="width: 900px;">
    <ag-grid-vue
      style="width: 100%; height: 350px;"
      class="ag-fresh"
      :grid-options="gridOptions"/>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import NameAndAgeRendererComponent from "./NameAndAgeRendererComponent";

export default {
  data() {
    return {
      gridOptions: null
    };
  },
  components: {
    "ag-grid-vue": AgGridVue
  },
  methods: {
    createRowData() {
      return [
        { name: "Bob", age: 10 },
        { name: "Harry", age: 3 },
        { name: "Sally", age: 20 },
        { name: "Mary", age: 5 },
        { name: "John", age: 15 },
        { name: "Bob", age: 10 },
        { name: "Harry", age: 3 },
        { name: "Sally", age: 20 },
        { name: "Mary", age: 5 },
        { name: "John", age: 15 },
        { name: "Jack", age: 25 },
        { name: "Sue", age: 43 },
        { name: "Sean", age: 44 },
        { name: "Niall", age: 2 },
        { name: "Alberto", age: 32 },
        { name: "Fred", age: 53 },
        { name: "Jenny", age: 34 },
        { name: "Larry", age: 13 }
      ];
    },
    createColumnDefs() {
      return [
        {
          headerName: "Name",
          field: "name",
          width: 450
        },
        {
          headerName: "Age",
          field: "age",
          width: 430
        }
      ];
    }
  },
  beforeMount() {
    this.gridOptions = {};
    this.gridOptions.rowData = this.createRowData();
    this.gridOptions.columnDefs = this.createColumnDefs();
    this.gridOptions.isFullWidthCell = rowNode =>
      rowNode.id === "0" || parseInt(rowNode.id, 10) % 2 === 0;
    this.gridOptions.fullWidthCellRendererFramework = NameAndAgeRendererComponent;
  }
};
</script>

<style>
</style>
