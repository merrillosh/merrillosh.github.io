<template>
  <button @click='toggleTheToggle'>
    <svg v-if='!toggle' viewBox='0 0 15 10'>
      <line y1='0.25' x2='15' y2='0.25' />
      <line y1='4.69' x2='15' y2='4.69' />
      <line y1='9.14' x2='15' y2='9.14' />
    </svg>
    <svg v-if='toggle' viewBox='0 0 10.96 10.96'>
      <line x1='0.18'
            y1='0.18'
            x2='10.78'
            y2='10.78' />
      <line x1='10.78'
            y1='0.18'
            x2='0.18'
            y2='10.78' />
    </svg>
  </button>
</template>

<style scoped>
  button {
    margin: 0;
    padding: 0;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>

<script>

export default {
  props: ['toggle'],
  methods: {
    toggleTheToggle: function() {
      this.$emit('toggle')
    }
  }
}

</script>
