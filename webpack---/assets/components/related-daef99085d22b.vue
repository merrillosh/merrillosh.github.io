<template>
  <section class='related' v-if='pageuris'>
    <h2 class='title' v-html='"Related projects"' />
    <div class='projects'>
      <projectcard
        v-for='page in pagesFromUris(pageuris)'
        :key='page.uid'
        :page='page' />
    </div>
  </section>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  props: ['pageuris'],
  data: function() {
    return {
      pages: {},
    }
  },
  methods: {
    pagesFromUris(pageuris) {
      let pages = {};
      let self = this;
      if (pageuris) pageuris.map(function(uri, index) {
        let page = self.pageFromURI(uri, self.kirby.pages)
        pages[page.uid] = page;
      })
      return pages;
    }
  }
}
</script>

<style scoped>

  section.related {
    padding-bottom: 6rem;
  }

  @media screen and (max-width: 700px) {
    section.related {
      padding-bottom: 3rem;
    }
  }

  h2.title {
    text-align: center;
    display: block;
    padding:3.5em 6rem 7.5rem;
  }

  @media screen and (max-width: 700px) {
      h2.title {
        padding:4em 6rem 3.5rem;
      }
  }

  div.projects {
    display: flex;
    flex-wrap: wrap;
    max-width: 72rem;
    margin: auto;
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    div.projects div.project {
      display: none;
    }
  }

  div.projects div.project:first-child, div.projects div.project:first-child+div.project {
    display: block;
  }

</style>
