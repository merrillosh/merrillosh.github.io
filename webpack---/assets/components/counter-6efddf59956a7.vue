<template>
  <span v-if='blocks.total'>
    {{ (blocks.focus + 1) }} / {{ (blocks.total) }}
  </span>
</template>

<script>
import mixins from './.././mixins.js';

export default {
  mixins: [mixins]
}
</script>

<style scoped>

</style>
