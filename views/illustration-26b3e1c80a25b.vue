<template>
  <main id='Illustration' v-if='kirby.page.template == "index"'>
    <!-- illustrations -->
    <router-link :to='page.uri'
                 v-show='page.visible'
                 v-for='page in kirby.page.children'
                 :key='page.uid'>
      <figure>
        <img :srcset='page.strings.coversrcset' sizes='90vw'>
      </figure>
      <dl>
        <dt>
          <h3 v-html='page.strings.title' />
          <h4 v-html='page.strings.year' />
        </dt>
        <dd>
          <small v-html='page.strings.credits' />
        </dd>
      </dl>
      <article v-html='page.strings.description' />
    </router-link>
    <!-- illustrations -->
    <footerbar />
  </main>
</template>

<style scoped>
  a {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8777rem;
    line-height: 1.4em;
    text-decoration: none;
  }

  @media screen and (min-width: 700px) {
    main#Illustration {
      padding: 3.75rem 3.75rem 0;
    }
  }

  figure {
    width: 100%;
  }

  figure img {
    width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }

  dl {
    margin: 0;
    padding: 3.5rem 3.75rem;
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 700px) {
    dl {
      padding: 3.5rem 1.75rem;
      width: 30%;
    }
  }

  article {
    padding: 3.5rem 3.75rem 3.5rem 2.75rem;
    width: 50%;
  }

  @media screen and (max-width: 700px) {
    article {
      padding: 3.5rem 1.75rem;
      width: 70%;
    }
  }

  figure {
    margin: 0;
    padding: 0;
  }
</style>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
}
</script>
