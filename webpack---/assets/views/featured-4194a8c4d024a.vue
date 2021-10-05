<template>
  <main id='Featured' v-if='kirby.page.template == "featured"'>
    <block v-for='(feature, index) in kirby.page.content.features.features'
           :key='feature.id'
           :index='index'
           v-slot='{show}'
           class='showcase'>
      <introduction :show='show'>
        <h1 v-html='pageFromURI(feature.content.project[0], kirby.pages).strings.introduction' />
        <div v-if='feature.content.project'>
          <h3 v-html='pageFromURI(feature.content.project[0], kirby.pages).strings.title' />
          <categories :categories='pageFromURI(feature.content.project[0], kirby.pages).strings.categories' />
          <button>
            <router-link :to='pageFromURI(feature.content.project[0], kirby.pages).uri'>
              View <arrow direction='right' />
            </router-link>
          </button>
        </div>
      </introduction>
      <transition name='slow'>
        <figure v-show='show'>
          <router-link :to='pageFromURI(feature.content.project[0], kirby.pages).uri'>
            <imageloader :srcset='feature.content.srcset' sizes='45vw' />
          </router-link>
        </figure>
      </transition>
    </block>
    <footerbar />
  </main>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
}
</script>

<!--<img class="layout" src="/assets/views/layouts/featured.jpg">-->


<style>

  @media screen and (min-width: 700px) {
    main#Featured {
      padding: 3.75rem 3.75rem 0;
    }
  }

  section.showcase {
    display: flex;
  }

  section.showcase:nth-child(odd) {
    flex-direction: row-reverse;
  }

  @media screen and (max-width: 700px) {
    section.showcase, section.showcase:nth-child(odd) {
      flex-direction: column-reverse;
    }
  }

  section.showcase figure {
    width: 55%;
    padding: 0;
    margin: 0;
    min-height: 33rem;
    max-height: 95vh;
    overflow: hidden;
  }

  @media screen and (max-width: 700px) {
    section.showcase figure {
      width: 100%;
      max-height: 75vh;
      min-height: 35vh;
    }
  }

  /*
  section.showcase h1 p::first-line {
    font-variant: small-caps;
    font-size: 1.45em;
    letter-spacing: 0.01em;
  }

  section.showcase h1 p::first-letter {
    font-size: 70%;
  }

  @media all and (min--moz-device-pixel-ratio:0) and (min-width: 10px){
    section.showcase h1 p::first-letter {
      font-size: 80%;
    }
  }*/

  @media screen and (max-width: 700px) {
    section.showcase h1 {
      font-size: 1.75rem;
    }
  }

  section.showcase figure img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }

  section.showcase figure a {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media screen and (max-width: 700px) {
    section.showcase figure a {
      height: 70vh;
    }
  }

  section.showcase svg.arrow {
    width: 1em;
    position: relative;
    vertical-align: text-bottom;
    margin-left: 0.7em;
    transition: 0.3s;
    left: 0;
  }

  section.showcase button:hover svg.arrow {
    left: 3%;
  }

</style>
