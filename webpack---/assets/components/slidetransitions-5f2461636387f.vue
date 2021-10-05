<template>
  <transition :name='transitionName'>
    <slot />
  </transition>
</template>

<script>
import mixins from '.././mixins.js';
export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  data () {
    return {
      transitionName: 'fade',
    }
  },
  watch: {
    '$route' (to, from) {
      if(this.pageFromURI(to.path, this.kirby.pages).uri) {
        let toPage = this.pageFromURI(to.path, this.kirby.pages) || {uri : ''}
        let fromPage = this.pageFromURI(from.path, this.kirby.pages) || {uri : '', next : 'not working', prev : 'not working'}
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
        setTimeout(() => {this.$scrollTo('#Content', 400, {easing: 'ease', offset: 1});}, 400);
        /*console.log(this.transitionName,('FROM:' + from.path), ('TO:' + to.path), ('TO:' + toURI), ('NEXT:' + nextURI), ('PREV:' + prevURI));*/
      }
    }
  }
}
</script>

<style scoped>

  /* Left Entering Element */
  main.slide-right-leave-active {
    transition: var(--tick) 0s cubic-bezier(0.5,0.0,0.60,1);
  }
  main.slide-right-enter-active {
    transition: var(--tick) var(--tock) cubic-bezier(0.35,0,0.6,1);
  }
  main.slide-right-enter {
    transform: translate(var(--forwards), 0);
    opacity: 0;
  }
  main.slide-right-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  main.slide-right-leave-to {
    opacity: 0;
    transform: translate(var(--backwards), 0);
  }

  /* Left Entering Element */
  main.slide-left-leave-active {
    transition: var(--tick) 0s cubic-bezier(0.5,0.0,0.60,1);
  }
  main.slide-left-enter-active {
    transition: var(--tick) var(--tock) cubic-bezier(0.35,0,0.6,1);
  }
  main.slide-left-enter {
    transform: translate(var(--backwards), 0);
    opacity: 0;
  }
  main.slide-left-enter-to {
    opacity: 1;
    transform: translate(0%, 0);
  }
  main.slide-left-leave-to {
    opacity: 0;
    transform: translate(var(--forwards), 0);
  }

  /* Fade */
  .fade-leave-active {
    transition: var(--tick) 0s cubic-bezier(0.5,0.0,0.60,1);
  }
  .fade-enter-active {
    transition: var(--tick) var(--tock) cubic-bezier(0.35,0,0.6,1);
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>
