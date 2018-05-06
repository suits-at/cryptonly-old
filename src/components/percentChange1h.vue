<template>
  <span :class="{ positive: data.percent_change_1h > 0, negative: data.percent_change_1h < 0}">{{ data.percent_change_1h }}%</span>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ["data", "index"]
};
</script>
