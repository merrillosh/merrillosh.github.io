<template>
  <section ref='block'>
    <slot :show='show' />
  </section>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  props: ['index'],
  data: function() {
    return {
      show: false,
    }
  },
  mixins: [mixins],
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.$store.commit('addBlock');
    if(this.index == 0 || this.index == 1) {
      this.show = true;
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
    this.$store.commit('removeAllBlocks');
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const elementStart = this.$refs.block.getBoundingClientRect().top + window.scrollY
      const elementEnd = elementStart + this.$refs.block.offsetHeight
      if (
        elementStart < currentScrollPosition &&
        currentScrollPosition < elementEnd &&
        this.index != this.blocks.focus
      ) {
        this.$store.commit('focusBlock', this.index);
      } else if (
        elementStart < currentScrollPosition + (window.innerHeight *0.75)
      ) {
        this.show = true;
      }
    }
  }
}
</script>
