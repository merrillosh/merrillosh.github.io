<template>
  <section ref='scroller' :class='{ "scroller": true, "fixed": inView, "bottomAligned": bottomAligned }'>
    <slot />
  </section>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  props: ['bound'],
  data () {
    return {
      bottomAligned: false,
      inView: false,
      start: false,
      end: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll);
    this.start = this.$refs.scroller.offsetTop;
    this.end = this.start + this.$refs.scroller.offsetHeight - window.innerHeight;
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
    this.inView = false
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (
        !this.bound && this.start < currentScrollPosition ||
        this.bound && this.start < currentScrollPosition && currentScrollPosition < this.end
      ) {
        if(!this.inView) this.$emit('inView')
        this.inView = true
        this.bottomAligned = false
      } else if(currentScrollPosition > this.end && this.bound) {
        //console.info(this._uid, 'Scroller already passed.', );
        if(this.inView) this.$emit('bottomPartInView')
        this.inView = false;
        this.bottomAligned = true
      } else if(currentScrollPosition > 0) {
        //console.info(this._uid, 'Scroller not yet passed.', this.start, currentScrollPosition);
        if(this.inView) this.$emit('outOfView')
        this.inView = false
        this.bottomAligned = false
      }
    }
  },
  watch: {
    'kirby.page' () {
      //console.log(this._uid, this.$refs.scroller.offsetHeight);
      this.start = this.$refs.scroller.getBoundingClientRect().top;
      this.end = this.start + this.$refs.scroller.offsetHeight - window.innerHeight;
    },
  },
}
</script>
