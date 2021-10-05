<template>
  <section>
    <transition name='basic'>
      <router-view name='carousel' :fresh='fresh' />
    </transition>
    <!--<password>-->
    <section id='Content'>
      <keep-alive>
        <router-view name='navigation' :from='from' />
      </keep-alive>
      <slidetransitions>
        <keep-alive v-if='$route.meta.keepAlive'>
          <router-view name='main' :key='kirby.page.uid' />
        </keep-alive>
        <router-view name='main' v-else :key='kirby.page.uid' />
      </slidetransitions>
    </section>
    <!--</password>-->
  </section>
</template>

<style>

  section#Content {
    position: relative;
    min-height: 100vh;
    background-color: var(--gray);
  }

  @media screen and (max-width: 700px) {
    main#Content {
      padding: 3.75rem 0 0;
    }
  }

  main#Content > main {
    position: absolute;
    box-sizing: border-box;
    width: calc(100vw - 8rem);
    top: 3.5rem;
  }

</style>

<script>
import mixins from '.././mixins.js';
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  computed: {
    loggedin: function(){
      return false;
    }
  },
  data () {
    return {
      fresh: true,
      from: 'outside'
    }
  },
  watch: {
    'kirby.page': {
      immediate: true,
      handler: function() {
        document.title = this.kirby.page.content ? this.kirby.page.content.title.value : '';
      }
    },
    '$route': {
      immediate: true,
      handler: function(to, from) {
        this.fresh = (to.name=='Featured' && !from);
        this.from = from ? from.path : 'outside';
      }
    }
  },
}
</script>
