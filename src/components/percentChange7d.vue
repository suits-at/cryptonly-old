<template>
  <span :class="{ positive: data.percent_change_7d > 0, negative: data.percent_change_7d < 0}">{{ data.percent_change_7d }}%</span>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ["data", "index"]
};
</script>
