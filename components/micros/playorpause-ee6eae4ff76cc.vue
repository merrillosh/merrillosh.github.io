<template>
  <figure>
    <svg class='play'
         v-show='paused'
         x='0px'
         y='0px'
         viewBox='0 0 18 21'>
      <polygon points='18,10.5 0,21 0,0 	' />
    </svg>
    <svg class='pause'
         v-show='!paused'
         x='0px'
         y='0px'
         viewBox='0 0 12 21'>
      <rect class='st0' width='2.2' height='21' />
      <rect x='9.8' width='2.2' height='21' />
    </svg>
  </figure>
</template>

<style scoped>

  figure {
    text-align: center;
    height: 1.15em;
    width: 1.15em;
    padding: 0;
    margin: 0;
    position: absolute;
    margin: auto;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  svg {
    position: relative;
    height: 1.15em;
    fill: white;
  }

  svg.play {
    left: 0.1em;
  }

</style>


<script>
export default {
  props: ['paused']
}
</script>
