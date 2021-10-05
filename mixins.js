import Vue from 'vue';
import marked from 'marked';
import axios from 'axios';
import yaml from 'js-yaml';
import VueScrollTo from 'vue-scrollto';
import Intersect from 'vue-intersect'

Vue.use(VueScrollTo);
import GlobalEvents from 'vue-global-events';
Vue.component('GlobalEvents', GlobalEvents);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !Page titles*/
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

export default {
    computed: {
        kirby() {
            return this.$store.state.kirby
        },
        blocks() {
            return this.$store.state.blocks
        }
    },
    methods: {
        urltopath(url) {
            let output = new URL(url);
            return output.pathname;
        },
        yaml(input) {
            if (input) return yaml.load(input);
        },
        md(input) {
            if (input) return marked(input);
        },
        pageFromURI(uri, pages) {
            if (pages && uri) {
                uri = (uri == '/') ? 'home' : uri;
                var paths = uri.split('/');
                var page = false;
                var children = pages;
                while (paths.length) {
                    var id = paths.shift();
                    page = children[id];
                    if (page) children = typeof page.children === 'object' ? page.children : [];
                }
                if (page) {
                    return page;
                } else {
                    console.error('No page!', uri, pages);
                }
            } else {
                console.error('No pages!', uri, pages);
            }
        }
    }
}