<template>
  <div :class='{ "hidden": (!visible && !toggle), "masthead" : true }'>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['toggle'],
  data () {
    return {
      visible: true,
      lastScrollPosition: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // In case of elastic scrollers
      if (currentScrollPosition < 100) {
        this.visible = true
        return
      }
      this.visible = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>

<style>

  div.masthead {
    /*padding: 2.25rem;*/
    padding: 1.33rem 3.75rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: all;
    background-color: white;
    height: 3.75rem;
    transform: translate3d(0, 0, 0);
    transition: 0.1s all ease-out;
  }

  @media screen and (max-width: 700px) {
    div.masthead {
      padding: 1.33rem 2rem;
    }
  }


  div.masthead.hidden {
    transform: translate3d(0, -100%, 0);
  }

  div.masthead a {
    display: block;
    height: 1.075rem;
    position: relative;
    text-decoration: none;
  }

  div.masthead a:not(.arrow) {
    margin: 0 4rem;
  }

  div.masthead a.arrow {
    position: absolute;
    display: inline-block;
    top: 1.25rem;
    z-index: 99;
    height: 1.5rem;
    width: 3rem;
  }

  div.masthead a.prev.arrow {
    left: 3rem;
  }

  div.masthead a.next.arrow {
    right: 3rem;
  }

  @media screen and (max-width: 700px) {

      div.masthead a.prev.arrow {
        left: 1.75rem;
      }

      div.masthead a.next.arrow {
        right: 1.75rem;
      }

  }
</style>
