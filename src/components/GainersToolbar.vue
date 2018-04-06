<template>
  <md-toolbar
    class="md-transparent md-dense"
    md-elevation="3">
    <h3
      class="md-title"
      style="flex: 1">Gainers</h3>
    <md-tabs
      md-sync-route
      class="md-transparent"
      md-alignment="right">
      <md-tab
        id="tab-gainers-1h"
        md-label="1h"
        to="/gainers1h"/>
      <md-tab
        id="tab-gainers-24h"
        md-label="24h"
        to="/gainers24h"/>
      <md-tab
        id="tab-gainers-7d"
        md-label="7d"
        to="/gainers7d"/>
    </md-tabs>
  </md-toolbar>
</template>

<script>
export default {
  name: "GainersToolbar"
};
</script>

<style scoped>
</style>
