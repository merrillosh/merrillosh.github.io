<template>
  <main id='Project' v-if='kirby.page.template == "default" || kirby.page.template == "work"'>
    <!--<img class="layout" src="/assets/views/layouts/project.jpg">-->


    <block v-for='(block, index) in kirby.page.content.features.features'
           :key='block.id'
           :index='index'
           v-slot='{show}'>
      <folio :block='block' v-if='block.type == "folio"' :show='show' />
      <landscape :block='block' v-if='block.type == "landscape"' :show='show' />
    </block>

    <related v-if='kirby.page.content.related' :pageuris='yaml(kirby.page.content.related.value)' />

    <footerbar />
  </main>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
}
</script>

<style scoped>

@media screen and (min-width: 700px) {
  main#Project {
    padding: 3.75rem 3.75rem 0;
  }
}

@media screen and (max-width: 700px) {
  main#Project {
    padding: 3.75rem 0rem 0;
  }
}

@media screen and (min-width: 900px) {
  main.project > section:last-of-type {
    margin-bottom: -4rem;
  }
}

</style>
