<template>
  <video
    type='video/mp4'
    autoplay
    muted
    loop
    playsinline
    v-show='visible'
    :src='src'
    @canplay='loaded' />
</template>

<script>
export default {
  props: ['src'],
  data: function() {
    return {
      visible: false,
    }
  },
  methods: {
    loaded: function() {
      this.visible = true;
    }
  },
  beforeDestroy () {
    this.visible = false;
  },
}
</script>
