<template>
  <main id='Index' v-if='kirby.page.template == "index"'>
    <!--<img class="layout" src="/assets/views/layouts/index.jpg">-->

    <section class='navigation'>
      <big>
        <h1 class='title'
            v-html='kirby.page.strings.title' />
        <button
          v-for='(category, $index) in categories'
          :key='$index'
          :data-count='category.count'
          :class='{selected : (selectedCategory == category.name)}'
          @click='click(category.name)'
          v-html='category.name' />
      </big>
    </section>

    <section class='mobile navigation'>
      <big>
        <dl>
          <dt @click='active = !active'>
            <h1 class='title' v-html='kirby.page.strings.title' />&nbsp;<h1 v-html='selectedCategory' />
          </dt>
          <dd v-for='(category, $index) in categories'
              :key='$index'>
            <button
              v-show='active'
              :data-count='category.count'
              :class='{selected : (selectedCategory == category.name)}'
              @click='click(category.name)'
              v-html='category.name' />
          </dd>
        </dl>
      </big>
    </section>

    <transition-group tag='section' class='projects' name='basic'>
      <projectcard
        v-show='categoryIsSelected(page.strings.categories) && page.visible && !projectsFaded'
        v-for='page in kirby.page.children'
        :key='page.uid'
        :page='page' />
    </transition-group>

    <footerbar />
  </main>
</template>

<style scoped>

  main#Index {
    padding: 3.75rem 0 0;
  }

  section.navigation {
    padding: 10.5rem 4rem;
  }

  section.mobile.navigation {
    display: none;
  }

  @media screen and (max-width: 700px) {
    section.navigation {
      display: none;
    }

    section.mobile.navigation {
      display: block;
    }
  }

  section.navigation h1 {
    display: inline-block;
    margin-right: 0.1em;
  }

  section.navigation big {
    font-family: "Romie-Regular";
    font-size: 2.33rem;
    line-height: 110%;
    font-weight: 100;
    margin: inherit;
    display: block;
    max-width: 22.5em;
    word-spacing: -0.01em;
    text-align: center;
    margin: auto;
  }

  section.navigation button.selected {
    color: #808285;
  }

  section.navigation big button {
    display: inline-block;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-transform: uppercase;
    padding: inherit;
    background-color: inherit;
    line-height: inherit;
    vertical-align: baseline;
    margin-left: 0.3em;
  }

  section.navigation big button::after  {
    content: attr(data-count);
    font-family: "Unica77LLSub-RegularSubset";
    font-size: 0.9rem;
    padding-right: 0.7em;
    position: relative;
    padding-left: 0.5em;
    bottom: 0.5em;
  }

  section.navigation h1.title::after {
    content: ':';
  }

  section.projects {
    display: flex;
    flex-wrap: wrap;
    max-width: 70.5rem;
    min-height: 50vh;
    margin: auto;
  }

  @media screen and (max-width: 700px) {
    section.projects {
      padding: 0 1.5rem 3rem;
      justify-content: center;
    }
  }

  section.mobile.navigation {
    padding: 4rem 1.5rem;
  }

  section.mobile.navigation dt {
    margin: 0 0 1.5rem;
    cursor: pointer;
  }

  section.mobile.navigation dd {
    margin: 0;
    padding: 0;
  }

  section.mobile.navigation dd button {
    padding: 0;
    line-height: 0.8em;
  }

</style>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  data: function() {
    return {
      selectedCategory: 'All',
      projectsFaded: false,
      active: false
    }
  },
  computed: {
    categories: function() {
      let categories = {};
      let children = this.kirby.page.children;
      let projectcount = 0;
      categories['all'] = {};
      categories['all']['name'] = 'All';
      Object.keys(children).map(function(key, index) {
        let project = children[key];
        let projectcategories = project.strings.categories.split(', ');
        projectcount ++;
        projectcategories.forEach(projectcategory => {
          if(projectcategory) {
            let categorykey = projectcategory.replace(/\s+/g, '').toLowerCase();
            categories[categorykey] = categories[categorykey] || {};
            categories[categorykey]['name'] = projectcategory;
            categories[categorykey]['count'] = (categories[categorykey]['count'] || 0) + 1;
          }
        });
      });
      categories['all']['count'] = projectcount;
      return categories;
    }
  },
  methods: {
    doubledigit: function(input) {
      return ('0'+input).slice(-2);
    },
    categoryIsSelected: function(categoriesstring) {
      let categories = categoriesstring.split(', ');
      categories.push('All')
      return categories.includes(this.selectedCategory);
    },
    click: function(category) {
      this.projectsFaded = true;
      this.active = false;
      this.selectedCategory = category;
      setTimeout(() => this.projectsFaded = false, 500);
    }
  }
}
</script>
