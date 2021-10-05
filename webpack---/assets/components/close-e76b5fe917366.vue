<template>
  <div class='monogram'>
    <router-link :to='parentOrPrevious'>
      <monogram />
      <h4>Close</h4>
    </router-link>
  </div>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), md() etc
  props: ['from'], //kirby(), urltopath(), md() etc
  data: function(){
    return {
      previous: false,
    };
  },
  computed: {
    parentOrPrevious: function() {
      return (this.from == '/') ? '/' : '/index';
    }
  }
}
</script>


<style scoped>
  svg {
    width: 7.7rem;
    fill: black;
    stroke: none;
    height: 1.075rem;
  }

  div.monogram {
    display: block;
    position: relative;
  }

  div.monogram h4 {
    display: none;
    line-height: 1.1em;
    position: relative;
  }

  div.monogram:not(:hover) h4 {
    display: inline-block;
    position: absolute;
    top: 0.125em;
    margin: auto;
    width: 8rem;
    left: 0;
    right: 0;
  }

  div.monogram:not(:hover) svg {
    display: none;
  }
</style>
