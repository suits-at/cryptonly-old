<template>
  <md-toolbar
    class="md-transparent md-dense"
    md-elevation="3">
    <h3
      class="md-title"
      style="flex: 1">Loosers</h3>
    <md-tabs
      md-sync-route
      class="md-transparent"
      md-alignment="right">
      <md-tab
        id="tab-loosers-1h"
        md-label="1h"
        to="/loosers1h"/>
      <md-tab
        id="tab-loosers-24h"
        md-label="24h"
        to="/loosers24h"/>
      <md-tab
        id="tab-loosers-7d"
        md-label="7d"
        to="/loosers7d"/>
    </md-tabs>
  </md-toolbar>
</template>

<script>
export default {
  name: "LoosersToolbar"
};
</script>

<style scoped>
</style>
