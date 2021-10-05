Vue.config.devtools = true;

//Vue Setup
import Vue from 'vue';

//Custom Store for Kirby
import store from './store.js';

//Routes on a separate file so this file needs less changes
import routes from './routes.js';

//Mixins
import mixins from './mixins.js'

//Components
import components from './components';

//We need the base view for h()
import App from './app.vue';

/* Router*/
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    /*scrollBehavior(to) {
      if (to.hash) {
        return { selector: to.hash }; // offset: { x: 0, y: 10 }
      }
    }*/
});

/* GoogleAnalytics */
import VueGtag from 'vue-gtag';
Vue.use(VueGtag, {
    config: {
        id: 'UA-33077929-1'
    }
}, router);


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* !App*/
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
new Vue({
    store,
    router,
    mixins,
    watch: {
        $route: {
            immediate: true,
            handler: function() {
                this.setupOrUpdateKirby();
            }
        }
    },
    methods: {
        setupOrUpdateKirby: function() {
            var path = this.$route.path == '/' ? 'home' : this.$route.path;
            if (!this.$store.state.loaded) {
                this.$store.dispatch('loadData', path);
            } else {
                this.$store.commit('updateKirby', path);
            }
        }
    },
    render: h => h(App)
}).$mount('#app');