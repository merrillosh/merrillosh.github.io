<template>
  <videoloader :src='src' />
</template>

<script>
export default {
  props: ['src']
}
</script>

<style scoped>
  video {
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    margin: -2px;
    object-fit: cover;
    vertical-align: bottom;
  }
</style>
