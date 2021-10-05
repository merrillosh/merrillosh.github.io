<template>
  <scroller id='MenuScroller'
            :bound='false'
            @inView='inView()'
            @outOfView='outOfView()'>
    <nav id='Navigation'
         ref='topofthenavbar'
         class='main'
         v-if='kirby.page.template'>
      <div class='masthead'>
        <!-- Full logo type except at work -->
        <router-link to='/' v-if='!isDetailPage'>
          <logo>(Studio) Lotta Nieminen</logo>
        </router-link>
      </div>

      <nav id='Left'>
        <!-- Bottom -->
        <h4 class='gray'>
          <a class='mailto' href='mailto:studio@lottanieminen.com' target='_blank'>Get in touch</a>
        </h4>
        <!-- Top-->
        <div class='prev page link'>
          <transition name='basic'>
            <div v-show='siblingnavigation'>
              <transition :name='transitionName'>
                <router-link
                  :key='kirby.page.uid'
                  :to='urltopath(pageFromURI(kirby.page.prev, kirby.pages).url)'
                  v-html='pageFromURI(kirby.page.prev, kirby.pages).strings.title' />
              </transition>
            </div>
          </transition>
        </div>
      </nav>

      <nav id='Right'>
        <!-- Next page -->
        <div class='next page link'>
          <transition name='basic'>
            <div v-show='siblingnavigation'>
              <transition :name='transitionName'>
                <router-link
                  :key='kirby.page.uid'
                  :to='urltopath(pageFromURI(kirby.page.next, kirby.pages).url)'
                  v-html='pageFromURI(kirby.page.next, kirby.pages).strings.title' />
              </transition>
            </div>
          </transition>
        </div>
        <!-- Counter -->
        <h4><counter /></h4>
        <!-- Back to top -->
        <backtotop />
      </nav>

      <nav id='Mobile'>
        <menubutton id='Menu-Button' :toggle='toggle' @toggle='toggleMobileNavigation' />
        <transition name='basic'>
          <div class='links' v-show='toggle'>
            <router-link v-for='page in visible'
                         :to='urltopath(page.url)'
                         :key='page.uid'
                         v-html='page.strings.title' />
          </div>
        </transition>
      </nav>
    </nav>
  </scroller>
</template>

<script>
import mixins from './.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  data: function() {
    return {
      toggle: false,
      transitionName: 'fade',
      siblingnavigation: true
    }
  },
  beforeRouteLeave (to, from, next) {
    this.toggle = false;
    next()
  },
  mounted() {
    setTimeout(()=>{this.hideSiblingMenu()},500)
  },
  methods: {
    toggleMobileNavigation: function() {
      this.toggle = !this.toggle;
    },
    inView: function() {
      console.log('in view');
      this.siblingnavigation = true;
    },
    outOfView: function() {
      this.siblingnavigation = false;
    },
    hideSiblingMenu: function() {
      if(this.$refs.topofthenavbar.getBoundingClientRect().top > 1) {
        console.log('hide sibling menu', this.$refs.topofthenavbar.getBoundingClientRect().top);
        this.siblingnavigation = false;
      }
    }
  },

  computed: {
    isDetailPage: function() {
      return (this.kirby.page.template == 'work') || (this.kirby.page.template == 'default');
    },
    visible: function() {
      let visibleIDs = Object.keys(this.kirby.pages);
      let visible = {};
      visibleIDs.map((id) => {
        if(this.kirby.pages[id].visible) visible[id] = this.kirby.pages[id];
      });
      //console.log(visible);
      return visible;
    }
  },
  watch: {
    '$route' (to, from) {
      //Start with siblingnavigation
      this.siblingnavigation == true;
      //Determine transition style
      if(this.pageFromURI(to.path, this.kirby.pages).uri) {
        let toPage = this.pageFromURI(to.path, this.kirby.pages) || {uri : ''}
        let fromPage = this.pageFromURI(from.path, this.kirby.pages) || {uri : '', next : 'not working', prev : 'not working'}
        /*console.log(from.path, fromPage)*/
        let toURI = toPage.uri
        let nextURI = fromPage.next
        let prevURI = fromPage.prev
        if (toURI == nextURI) {
          this.transitionName = 'slide-right'
        } else if(toURI == prevURI) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'fade'
        }
        //setTimeout(() => window.scrollTo(0, 0), 750);
        /*console.log(this.transitionName,('FROM:' + from.path), ('TO:' + to.path), ('TO:' + toURI), ('NEXT:' + nextURI), ('PREV:' + prevURI));*/
      }
    }
  }
}
</script>

<style>

  #MenuScroller {
    position: absolute;
    height: 100vh;
    top: -1px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
  }

  #MenuScroller.scroller.fixed {
    position: fixed;
  }

  #Navigation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    pointer-events: none;
    z-index: 99;
  }

  #Navigation nav {
    pointer-events: all;
    position: absolute;
    width: 100vh;
    padding: 1.125rem 4rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    height: 3.75rem;
    min-width: 33rem;
    user-select: none;
  }

  #Navigation nav#Mobile {
    position: absolute;
    left: 0;
    right: 0;
    top: 3rem;
    display: block;
    text-align: center;
    width: 100%;
    height: auto;
    padding: 0;
    background-color: transparent;
    min-width: 0;
  }

  #Navigation nav#Mobile a {
    position: relative;
    display: inline-block;
    width: auto;
    padding: 7rem 1.5rem;
  }

  #Navigation nav#Mobile .links {
    position: relative;
    top: 0;
    background-color: white;
    width: 100%;
  }

  #Navigation nav#Mobile #Menu-Button {
    position: absolute;
    top: -1.75rem;
    left: 2rem;
    z-index: 999;
    width: 1.25rem;
    height: 1.25rem;
    display: block;
    background-color: transparent;
  }

  @media screen and (min-width: 700px) {
    #Navigation nav#Mobile #Menu-Button {
      display: none;
    }
  }

  @media screen and (max-width: 700px) {
    #Navigation nav {
      display: none;
    }
  }

  #Navigation nav.detail {
    justify-content: center;
  }

  #Left {
    transform: rotate(-90deg);
    bottom: 0;
    left: 3.75rem;
    transform-origin: bottom left;
  }

  #Right {
    transform: rotate(90deg);
    top: 0;
    left: 100vw;
    transform-origin: top left;
  }

  #Right > * {
    /*margin-left: auto;*/
  }

  #Navigation nav .page.link, #Navigation nav a, #Navigation nav button {
    font-size: 1.05rem;
    width: 10em;
    display: block;
    text-decoration: inherit;
    color: inherit;
    border: none;
    outline: none;
    opacity: 1;
    transition: var(--tick);
  }

  @media screen and (max-width: 700px) {
    #Navigation nav#Mobile a.router-link-exact-active {
      opacity: 0.5;
    }
  }

  #Navigation nav .page.link {
    position: relative;
  }

  #Left  .page.link  {
    text-align: right;
  }

  #Navigation nav .page.link a {
    left: 0;
    position: absolute;
  }

  #Navigation nav button {
    text-align: right;
  }

  #Navigation nav a.mailto {
    font-size: 0.8777rem;
  }

  #Navigation.main div.masthead {
    text-align: center;
  }

  /* Left Entering Element */
  #Left a.slide-right-leave-active {
    transition:  var(--tick) 0s cubic-bezier(0.73,0.17,0.94,0.57);
  }
  #Left a.slide-right-enter-active {
    transition:  var(--tick) var(--tick);
  }
  #Left a.slide-right-enter {
    transform: translate(0, 1.00rem);
    opacity: 0;
  }
  #Left a.slide-right-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  #Left a.slide-right-leave-to {
    opacity: 0;
    transform: translate(0, -1.0rem);
  }

  /* Left Entering Element */
  #Left a.slide-left-leave-active {
    transition:  var(--tick) 0s cubic-bezier(0.73,0.17,0.94,0.57);
  }
  #Left a.slide-left-enter-active {
    transition:  var(--tick) var(--tick);
  }
  #Left a.slide-left-enter {
    transform: translate(0, -1.0rem);
    opacity: 0;
  }
  #Left a.slide-left-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  #Left a.slide-left-leave-to {
    opacity: 0;
    transform: translate(0, 1.00rem);
  }

  /* Left Entering Element */
  #Right a.slide-right-leave-active {
    transition:  var(--tick) 0s;
  }
  #Right a.slide-right-enter-active {
    transition:  var(--tick) var(--tick);
  }
  #Right a.slide-right-enter {
    transform: translate(0, -1.0rem);
    opacity: 0;
  }
  #Right a.slide-right-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  #Right a.slide-right-leave-to {
    opacity: 0;
    transform: translate(0, 1.00rem);
  }

  /* Left Entering Element */
  #Right a.slide-left-leave-active {
    transition: var(--tick) 0s;
  }
  #Right a.slide-left-enter-active {
    transition: var(--tick) var(--tick);
  }
  #Right a.slide-left-enter {
    transform: translate(0, 1.00rem);
    opacity: 0;
  }
  #Right a.slide-left-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  #Right a.slide-left-leave-to {
    opacity: 0;
    transform: translate(0, -1.0rem);
  }

  /* Fade */
  #Navigation nav a.fade-leave-active {
    /*transition: var(--tock) 0s;*/
  }
  #Navigation nav a.fade-enter-active {
    transition: var(--tock) 0s;
  }
  #Navigation nav a.fade-enter {
    opacity: 0;
  }
  #Navigation nav a.fade-enter-to {
    opacity: 1;
  }
  #Navigation nav a.fade-leave-active {
    display: none;
  }

</style>
