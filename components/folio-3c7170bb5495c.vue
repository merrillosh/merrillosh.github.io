<template>
  <section class='folio'>
    <div :class='{"hide": !show, "show": show, "content": true}'>
      <!-- Left TEXT -->
      <div class='page' v-if='block.content.lefttoggle == "true"'>
        <article :class='{small : !block.content.leftfooter.length}' v-html='md(block.content.lefttext)' />
        <footer v-if='block.content.leftfooter.length'>
          <section v-for='(footerblock, $index) in block.content.leftfooter' :key='$index'>
            <h6 v-html='md(footerblock.heading)' />
            <div v-html='md(footerblock.text)' />
          </section>
        </footer>
      </div>
      <!-- Left IMAGE -->
      <figure v-if='block.content.lefttoggle != "true"'>
        <player
          v-if='block.content.lefttype == "video"'
          :src='kirby.page.files[block.content.leftimage[0]].src' />
        <imageloader
          v-if='block.content.leftsrcset'
          :srcset='block.content.leftsrcset'
          sizes='45vw' />
      </figure>
      <!-- Right TEXT -->
      <div class='page' v-if='block.content.righttoggle == "true"'>
        <article :class='{small : !block.content.rightfooter.length}' v-html='md(block.content.righttext)' />
        <footer v-if='block.content.rightfooter.length'>
          <section v-for='(footerblock, $index) in block.content.rightfooter' :key='$index'>
            <h6 v-html='md(footerblock.heading)' />
            <div v-html='md(footerblock.text)' />
          </section>
        </footer>
      </div>
      <!-- Right IMAGE -->
      <figure v-if='block.content.righttoggle != "true"'>
        <player
          v-if='block.content.righttype == "video"'
          :src='kirby.page.files[block.content.rightimage[0]].src' />
        <imageloader
          v-if='block.content.rightsrcset'
          :srcset='block.content.rightsrcset'
          sizes='45vw' />
      </figure>
    </div>
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

  section.folio div.content {
    display: flex;
    flex-direction: row;
    margin-bottom: 4rem;
  }

  section.folio div.content {
    transition: opacity 0.75s ease;
  }

  section.folio div.content.hide {
    opacity: 0;
  }

  section.folio div.content.show {
    opacity: 1;
  }

  @media screen and (max-width: 700px) {
    section.folio div.content {
      flex-direction: column;
      margin-bottom: 0rem;
    }
  }

  section.folio figure {
    display: block;
    width: 50%;
    height: 64vw;
    overflow: hidden;
  }

  @media screen and (max-width: 700px) {
    section.folio figure {
      width: 100%;
      height: auto;
    }
  }

  section.folio div.page {
    width: 50%;
    padding: 5.7rem 5.8rem;
    background-color: #f0f0ea;
    height: 64vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 700px) {
    section.folio div.page {
      padding: 3.75rem;
      height: auto;
      width: 100%;
    }
  }

  section.folio footer, section.folio article.small {
    margin-top: auto;
    font-size: 0.84rem;
    line-height: 140%;
  }

  section.folio footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  @media screen and (max-width: 700px) {
    section.folio footer {
      padding-top: 3.75rem;
    }
  }

  section.folio footer section {
    max-width: 24rem;
  }

  section.folio footer section:first-child {
    width: 10rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s cubic-bezier(1,0.14,0.67,0.71);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
