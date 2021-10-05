<template>
  <h4 v-scroll-to='{el: "#Content", offset: 0}' class='gray'>
    Back to top
  </h4>
</template>

<script>
export default {}
</script>

<style scoped>
  h4 {
    cursor: pointer;
  }

  h4:hover {
    opacity: 0.5;
  }
</style>
