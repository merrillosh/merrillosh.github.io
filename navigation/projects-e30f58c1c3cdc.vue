<template>
  <scroller id='MenuScroller' :bound='false'>
    <nav id='Navigation' class='projects' v-if='kirby.page.template'>
      <masthead>
        <!-- Monogram for work -->
        <close :from='from' />

        <router-link class='prev arrow' v-if='isDetailPage' :to='urltopath(pageFromURI(kirby.page.prev, kirby.pages).url)'>
          <arrow direction='left' :bar='true' />
        </router-link>

        <router-link class='next arrow' v-if='isDetailPage' :to='urltopath(pageFromURI(kirby.page.next, kirby.pages).url)'>
          <arrow direction='right' :bar='true' />
        </router-link>
      </masthead>

      <nav id='Left' class='detail'>
        <backtotop />
      </nav>

      <nav id='Right' class='detail'>
        <h4><counter /></h4>
      </nav>
    </nav>
  </scroller>
</template>

<style scoped>

  #Navigation.projects {
    text-align: center;
  }

  #MenuScroller {
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
  }

  nav {
    user-select: none;
  }


</style>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  props: ['from'],
  computed: {
    isDetailPage: function() {
      return (this.kirby.page.template == 'work') || (this.kirby.page.template == 'default');
    }
  }
}
</script>
