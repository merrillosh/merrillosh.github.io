<template>
  <div class='project'>
    <router-link :to='"../"+page.uri'>
      <figure>
        <img :srcset='page.strings.coversrcset' sizes='10vw'>
      </figure>
      <h4 v-html='page.strings.title' />
      <small v-html='page.strings.description' />
      <slot />
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['page']
}
</script>

<style>
  div.project * {

  }

  div.project {
    width: 17.5rem;
    padding: 0 2.125rem 5.5rem;
  }

  @media screen and (max-width: 700px) {
    div.project {
      width: 13.5rem;
      padding: 0 0.9rem 3rem;
    }
  }

  @media screen and (max-width: 700px) {
    div.project small {
      display: none;
    }
  }

  div.project a {
    width: 100%;
    display: block;
  }



  div.project figure {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 19.5rem;
    overflow: hidden;
    border: 0.02rem solid gray;
  }

  @media screen and (max-width: 700px) {
    div.project figure {
      height: 18rem;
    }
  }

  div.project img {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: cover;
  }

  div.project div.teaser {
    height: 100px;
    overflow: hidden;
  }

  div.project a {
    text-decoration: none;
    color: inherit;
  }

  div.project a img {
   -webkit-filter: grayscale(100%);
   -moz-filter: grayscale(100%);
   filter: grayscale(100%);
   transition: all 1s ease;
  }

  div.project a:hover img {
   -webkit-filter: grayscale(0%);
   -moz-filter: grayscale(0%);
   filter: grayscale(0%);
  }

  div.project h4 {
    padding-top: 2.125rem;
    line-height: 1.45em;
    text-decoration: none;
    color: inherit;
  }

  @media screen and (max-width: 700px) {
    div.project h4 {
      text-align: center;
    }
  }

  div.project small, div.project small * {
    text-decoration: none;
    line-height: 1.45em;
    color: #808285;
  }
</style>
