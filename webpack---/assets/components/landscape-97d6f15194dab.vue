<template>
  <section class='landscape'>
    <figure :class='{"hide": !show, "show": show, "content": true}'>
      <player
        v-if='block.content.type == "video"'
        :src='kirby.page.files[block.content.image].src' />
      <imageloader
        v-if='block.content.srcset'
        :srcset='block.content.srcset'
        sizes='100vw' />
    </figure>
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

  figure {
    margin: 0;
    padding: 0;
  }

  section {
    display: flex;
    flex-direction: row;
    margin-bottom: 4rem;
  }

  section figure {
    transition: opacity 0.75s ease;
  }

  section figure.hide {
    opacity: 0;
  }

  section figure.show {
    opacity: 1;
  }

  @media screen and (max-width: 700px) {
    section {
      margin-bottom: 0;
    }
  }

  section figure {
    display: block;
    width: 100%;
    height: 64vw;
    overflow: hidden;
  }

  @media screen and (max-width: 700px) {
    section figure {
      height: auto;
    }
  }

  section figure img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }



</style>
