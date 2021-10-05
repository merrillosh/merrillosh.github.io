<template>
  <div class='transition'>
    <v-lazy-image
      :sizes='sizes'
      :src='src'
      :srcset='srcset'
      @load='visible = true' />
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }

  .v-lazy-image {
    opacity: 0;
    transition: opacity 0.5s;
  }

  .v-lazy-image-loaded {
    opacity: 1;
  }
</style>

<script>
import mixins from '.././mixins.js';
import VLazyImage from 'v-lazy-image/v2/v-lazy-image.es.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  props: ['sizes', 'srcset'],
  components: {
    VLazyImage
  },
  computed: {
    src: function() {
      return this.srcset.split(', ')[0].split(' ')[0];
    }
  },
}
</script>
