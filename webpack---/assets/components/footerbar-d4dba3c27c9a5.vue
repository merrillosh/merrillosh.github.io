<template>
  <footer id='MainFooter'>
    <div v-html='kirby.site.footer' />
    <div v-html='kirby.site.description' />
  </footer>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), md() etc
}
</script>


<style>

  footer#MainFooter{
    padding: 8em 0 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
  }

  @media screen and (max-width: 700px) {
    footer#MainFooter {
      flex-direction: column;
      padding: 3.75rem;
    }
  }

  footer#MainFooter div:first-child p {
    max-width: 20em;
    margin: 0 0 1em;
  }

  @media screen and (max-width: 700px) {
    footer#MainFooter div {
      margin-bottom: 4rem;
    }
  }

  footer#MainFooter div:first-child {

  }

  footer#MainFooter div:last-child {
    max-width: 30em;
  }
</style>
