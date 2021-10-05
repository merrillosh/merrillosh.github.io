<template>
  <section :class='{"hide": !show, "show": show}'>
    <slot />
  </section>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), md() etc
  props: ['block', 'show'],
}
</script>

<style scoped>

  section {
    width: 45%;
    background-color: #f1f0eb;
    padding: 9rem 4.75rem 4.75rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 700px) {
    section {
      padding: 3.25rem 3em;
      width: 100%;
    }
  }

  div {
    display: block;
    text-align: left;
    position: relative;
  }

  h1 {
    padding-bottom: 3.75rem;
    letter-spacing: -0.01em;
    max-width: 14em;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 700px) {
    h1 {
      padding-bottom: 2.75rem;
    }
  }

  h4.categories {
    padding-right: 11.5em;
  }

  @media screen and (max-width: 700px) {
    h4.categories {
      display: none;
    }
  }

  button {
    width:  5.5em;
    position: absolute;
    right: 0;
    bottom: 0;
    text-transform: uppercase;
  }

  button a {
    text-decoration: none;
    color: inherit;
  }

  @media screen and (max-width: 700px) {
    button {
      width: 5em;
    }
  }

  section {
    transition: all 0.75s ease;
  }

  section.hide {
    opacity: 0;
    transform: translateY(1rem);
  }

  section.show {
    opacity: 1;
    transform: translateY(0rem);
  }

</style>
