<template>
  <scroller id='MenuScroller' :bound='false'>
    <nav id='Navigation' :class='{ illustration: true, detail: isDetailPage}' v-if='kirby.page.template'>
      <masthead>
        <!-- Back to Illustration -->
        <router-link v-if='!isDetailPage' class='even notcentered' to='/'>
          Back <span class='to'>to</span> <span class='gray'>Studio Lotta Nieminen</span>
        </router-link>

        <!-- Monogram for work -->
        <router-link class='title even' to='/illustration'>
          Illustration Portfolio of Lotta Nieminen
        </router-link>

        <span v-if='!isDetailPage' class='even'>&emsp;</span>

        <router-link class='prev arrow' v-if='isDetailPage' :to='urltopath(pageFromURI(kirby.page.prev, kirby.pages).url)'>
          <arrow direction='left' :bar='true' />
        </router-link>

        <router-link class='next arrow' v-if='isDetailPage' :to='urltopath(pageFromURI(kirby.page.next, kirby.pages).url)'>
          <arrow direction='right' :bar='true' />
        </router-link>
      </masthead>

      <nav id='Left' class='detail'>
        <backtotop v-if='isDetailPage'>
          Back to top
        </backtotop>
      </nav>

      <nav id='Right' class='detail'>
        <counter />
      </nav>
    </nav>
  </scroller>
</template>

<style scoped>

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

  #Navigation.illustration  div.masthead {
    display: flex;
    justify-content: space-between;
  }

  #Navigation.illustration  div.masthead *.even {
    font-size: 0.866rem;
    width: 25%;
    text-align: center;
  }

  @media screen and (max-width: 700px) {
    #Navigation.illustration  div.masthead *.even {
      width: auto;
    }
  }

  @media screen and (max-width: 700px) {
    #Navigation.illustration  div.masthead .title {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 60%;
    }
  }

  #Navigation.illustration.detail div.masthead {
    justify-content: center;
  }


  #Navigation.illustration  div.masthead *.notcentered {
    margin-left: 0;
    text-align: left;
  }

  #Navigation.illustration .gray {
    color: var(--graphite);
  }

  @media screen and (max-width: 700px) {
    #Navigation.illustration .to {
      display: none;
    }
  }

  @media screen and (max-width: 700px) {
    #Navigation.illustration .gray {
      display: none;
    }
  }

</style>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  computed: {
    isDetailPage: function() {
      return (this.kirby.page.template == 'work') || (this.kirby.page.template == 'default');
    }
  }
}
</script>
