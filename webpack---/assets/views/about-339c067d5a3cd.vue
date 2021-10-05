<template>
  <main id='About' v-if='kirby.page.template == "information"'>
    <!--<img class="layout" src="/assets/views/layouts/about.jpg">-->

    <section id='Intro'>
      <div v-for='block in kirby.page.content.features.features' :key='block.id'>
        <section class='folio' v-if='block.type == "folio"'>
          <!-- Left -->
          <figure v-if='block.content.lefttoggle != "true"'>
            <imageloader :srcset='block.content.leftsrcset' sizes='50vw' />
          </figure>
          <div class='page' v-if='block.content.lefttoggle == "true"'>
            <div class='body' v-html='md(block.content.lefttext)' />
            <footer>
              <section v-for='(footerblock, $index) in block.content.leftfooter' :key='$index'>
                <h6 v-html='footerblock.heading' />
                <div v-html='md(footerblock.text)' />
              </section>
            </footer>
          </div>
          <!-- Left -->
          <!-- Right -->
          <div class='page' v-if='block.content.righttoggle == "true"'>
            <div class='body' v-html='md(block.content.righttext)' />
            <footer>
              <section v-for='(footerblock, $index) in block.content.rightfooter' :key='$index'>
                <h6 v-html='footerblock.heading' />
                <div v-html='md(footerblock.text)' />
              </section>
            </footer>
          </div>
          <figure v-if='block.content.righttoggle != "true"'>
            <imageloader :srcset='block.content.rightsrcset' sizes='45vw' />
          </figure>
          <!-- Right -->
        </section>
      </div>
    </section>

    <scroller id='Services' :bound='true'>
      <dl class='service list'>
        <dt class='services title' v-html='"SERVICES"' />
        <dd :key='$index'
            v-for='(area, $index) in kirby.page.content.areas'>
          <figure @mouseover='activeService = $index'>
            <srcset
              :file='kirby.page.files[area.image[0].value]'
              sizes='5vw' />
          </figure>
          <h4 v-html='area.title.value' />
          <small v-html='area.description.value' />
        </dd>
      </dl>
      <figure class='service feature'>
        <transition-group name='basic' tag='div'>
          <div v-for='(service, $index) in kirby.page.content.areas' :key='$index' v-show='active($index)'>
            <srcset :file='kirby.page.files[service.image[0].value]' sizes='45vw' />
            <figcaption>
              <h6 v-html='service.title.value' /><small v-html='service.description.value' />
            </figcaption>
          </div>
        </transition-group>
      </figure>
    </scroller>

    <section id='Bio'>
      <article v-html='kirby.page.content.bio.value' />
    </section>

    <section id='References'>
      <dl :class='list.type'
          v-for='(list, $index) in kirby.page.content.references.references'
          :key='$index'>
        <dt v-html='list.content.title' @click='$event.target.classList.toggle("active")' />
        <dd v-for='(item, $itemindex) in list.content.list' :key='$itemindex'>
          <template v-if='list.type == "list"'>
            <h6 v-if='!item.link' v-html='item.title' />
            <a v-if='item.link' :href='item.link.value' :target='item.link.popup ? "_blank" : ""'>
              <h6 v-html='item.title' /><miniarrow />
            </a>
          </template>
          <template v-if='list.type == "milestones"'>
            <h6 v-html='item.title' />
            <small v-html='item.description' />
          </template>
        </dd>
      </dl>
    </section>

    <footerbar />
  </main>
</template>

<script>
import mixins from '.././mixins.js';

export default {
  mixins: [mixins], //kirby(), urltopath(), etc
  data: function() {
    return {
      activeService: 0,
    }
  },
  methods: {
    active: function(index) {
      if(index == this.activeService) return true;
      return false;
    }
  }
}
</script>

<style>

  main#About {
    padding-top: 3.75rem;
  }

  @media screen and (min-width: 700px) {
    main#About {
      padding: 3.75rem 3.75rem 0;
    }
  }

  main#About section.folio {
    display: flex;
  }

  main#About section.folio figure {
    width: calc(100vw - 58rem);
    height: 68rem;
  }

  @media screen and (max-width: 700px) {
    main#About section.folio figure {
      display: none;
    }
  }

  main#About section.folio div.page {
    width: 50rem;
    padding: 3.5rem 6.5rem 4.5rem 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 700px) {
    main#About section.folio div.page {
      width: 100%;
      padding: 2rem 2rem;
      flex-direction: column-reverse;
    }

    main#About section.folio div.page footer {
      padding: 0 0 2rem;
    }
  }

  main#About section.folio div.page div.body {
    font-family: "Romie-Regular";
    font-size: 2.15rem;
    letter-spacing: -0.02em;
    line-height: 120%;
    font-weight: 100;
  }

  main#About section.folio div.page div.body strong {
    text-transform: uppercase;
    font-weight: inherit;
  }

  main#About section.folio div.page footer {
    width: 70%;
  }

  main#About section.folio figure {
    position: relative;
  }

  main#About section.folio figure img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }

  main#About section.folio div.page {

  }

  main#About section.folio footer a {
    color: inherit;
    display: inline-block;
    border-bottom: 1px solid var(--black);
  }

  section#Services {
    display: flex;
    position: relative;
  }

  section#Services dl {
    width: 36.66rem;
    margin: 0;
    padding: 0rem 2.66rem 9.5rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.9rem;
    line-height: 1.2em;
  }

  @media screen and (max-width: 700px) {
    section#Services dl {
      display: block;
      white-space: nowrap;
      padding: 0rem 0rem 0rem;
      margin-left: 2rem;
      width: 100%;
      overflow-y: scroll;
    }
  }

  section#Services  dt {
    padding: 6rem 2.66rem 4rem;
    text-align: center;
    width: 36.66rem;
    font-size:
  }

  @media screen and (max-width: 700px) {
    section#Services dt {
      display: none;
    }
  }

  section#Services dd {
    padding: 1.75rem 3rem 3.5rem;
    max-width: 15.45rem;
    display: block;
    margin: 0;
  }

  @media screen and (max-width: 700px) {
    section#Services dd {
      width: auto;
      vertical-align: top;
      display: inline-block;
      white-space: normal;
      max-width: 13rem;
      padding: 1.75rem 2rem 3.5rem 0;
    }
  }

  section#Services dd figure {
    overflow: hidden;
    width: 100%;
    height: 12rem;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0;
    border: 1px solid var(--black);
    vertical-align: bottom;
    overflow: hidden;
    position: relative;
  }

  @media screen and (max-width: 700px) {
    section#Services dd figure {
      height: 16rem;
    }
  }

  section#Services dd figure img {
    vertical-align: bottom;
    min-height: calc(100% + 4px);
    width: 100%;
    height: 12rem;
    object-fit: cover;
    position: absolute;
    bottom: -2px;
  }

  section#Services dd h4 {
    padding-top: 1.5rem;
    line-height: 1.45em;
    text-decoration: none;
    color: inherit;
  }

  section#Services dd small, dd small * {
    text-decoration: none;
    font-size: 0.8777rem;
    line-height: 1.45em;
    color: #808285;
  }

  section#Services figure.feature {
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
    position: relative;
  }

  section#Services figure.feature div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  section#Services.fixed figure.feature {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 3.75rem;
    left: calc(36.66rem + 3.75rem);
    width: calc(100vw - 36.66rem - 3.75rem - 3.75rem)
  }

  @media screen and (max-width: 700px) {
    section#Services figure.feature {
      display: none;
    }
  }

  section#Services.bottomAligned figure.feature {
    position: absolute;
    top: auto;
    bottom: 0;
    right: 0;
    width: calc(100vw - 36.66rem - 3.75rem - 3.75rem)
  }

  section#Services figure.feature img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  section#Services figure.feature figcaption {
    position: absolute;
    width: 30rem;
    bottom: 0;
    z-index: 99;
    padding: 0 3.75rem 3.75rem;
  }

  section#Services figure.feature figcaption * {
    font-size: inherit;
    color: white;
    display: inline;
  }

  section#Services figure.feature figcaption h6 {
    display: inline-block;
    text-transform: uppercase;
    padding-right: 1em;
  }

  section#Bio {
    display: flex;
    justify-content: flex-end;
  }

  section#Bio article {
    width: 55.725rem;
    padding: 9rem 6rem 9rem 0;
    columns: 2;
    column-gap: 3rem;
  }

  @media screen and (max-width: 700px) {
    section#Bio article {
      padding: 1rem 3rem 4rem 2rem;
      columns: 1;
    }
  }

  section#References {
    display: flex;
    justify-content: space-between;
    padding: 0rem 6rem 9rem 6rem;
  }

  @media screen and (max-width: 700px) {
    section#References {
      display: block;
      padding: 0rem 2rem 2rem 2rem;
    }
  }

  section#References dl {
    font-size: 0.6rem;
    font-size: 0.8777rem;
    line-height: 1.8em;
  }

  section#References dt {
    text-transform: uppercase;
    margin-bottom: 1.8em;
  }

  section#References dd {
    padding: 0;
    margin: 0;
  }

  @media screen and (max-width: 700px) {
    section#References dl {
      padding-bottom: 1rem;
      border-bottom: 1px solid black;
    }
  }

  section#References dl.milestones dd {
    margin-bottom: 1em;
  }

  @media screen and (max-width: 700px) {
    section#References dt {
      padding-top: 0.33rem;
      padding-bottom: 0;
      margin-bottom: 0;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 700px) {
    section#References dl dd {
      display: none;
    }

    section#References dl dt.active {
      margin-bottom: 2rem;
    }

    section#References dl dt.active ~ dd {
      display: block;
    }

    section#References dl dt.active ~ dd:last-child {
      margin-bottom: 1rem;
    }
  }

  section#References dd a {
    text-decoration: none;
  }

  section#References small {
    font-size: inherit;
  }

  section#References dd h6 {
    margin-right: 0.75em;
  }
</style>
