<template>
  <section v-if='kirby.page.template == "featured" && fresh'>
    <div @click='scrollDown()'>
      <figure v-for='(slide, index) in kirby.pages.home.content.carousel' :key='slide.id'>
        <transition name='slow'>
          <srcset v-show='timeToShow(index)'
                  :file='kirby.pages.home.files[slide.image[0].value]'
                  sizes='45vw' />
        </transition>
      </figure>
    </div>
    <monogram id='Monogram' :style='{ opacity: readyToGo }' />
  </section>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), md() etc
  props: ['fresh'],
  data: function() {
    return {
      left: 0,
      right: 1,
      timer: '',
      readyToGo: 1
    }
  },
  computed: {
    amount: function() {
      return this.kirby.page.content.carousel.length;
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll);
    this.timer = setInterval(() => this.click(), 1200);
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      this.readyToGo = parseInt((200-currentScrollPosition)) > 0 ? parseInt((200-currentScrollPosition)) / 200 : 0;
    },
    click: function() {
      if( this.left < this.right && (this.right + 1) < this.amount) {
        this.left = this.left + 2;
      } else if ( this.left > this.right && (this.right + 1) < this.amount ) {
        this.right = this.right + 2;
      } else if ( this.left != 0 && (this.left + 2) > (this.amount - 1) ) {
        this.left = 0
      } else {
        this.right = 1
      }
    },
    timeToShow: function(index) {
      return (this.left == index) || (this.right == index);
    },
    scrollDown: function(){
      this.$scrollTo('#Content', 500, {easing: 'ease', offset: 1});
      setTimeout(() => this.$emit('introOver'), 500);
    }
  },
  beforeDestroy: function(){
    clearInterval( this.timer )
  }
}
</script>

<style scoped>

  #Monogram {
    position: fixed;
    z-index: 999;
    fill: white;
    width: 40vw;
    transform: translateY(-7vw);
    top: 50vh;
    left: 0;
    right: 0;
    margin: auto;
    pointer-events: none;
  }

  @media screen and (max-width: 700px) {
    #Monogram {
      transform: translateY(-10vh);
      width: 70vw;
    }
  }

  section {
    position: relative;
    height: 87.5vh;
    background-color: black;
  }

  @media screen and (max-width: 700px) {
    section {
      height: 80vh;
    }
  }

  div {
    position: relative;
    height: 100%;
    cursor: pointer;
  }

  figure {
    position: absolute;
    width: 50.02vw;
    height: 100%;
  }

  figure:nth-child(odd) {
    right: 0;
  }

</style>
