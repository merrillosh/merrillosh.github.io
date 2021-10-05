import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        media: {
            next: 0,
            index: 0,
        },
        blocks: {
            focus: 0,
            total: 0
        },
        submissionID: '',
        kirby: {
            site: [],
            pages: [],
            page: []
        },
        loading: false,
        loaded: false
    },
    actions: {
        loadData({
            commit
        }, path) {
            console.info('Loading ' + path + ' from the API');
            const http = axios.create({
                method: 'GET',
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    Accept: '*/*',
                }
            });
            http.get('json?path=' + path.substr(path.indexOf('/') + 1) + '&structure=1').then(response => {
                commit('setupKirby', response.data, path);
                commit('updateKirby', path);
            });
        }
    },
    mutations: {
        addToIndex(state) {
            state.media.index = state.media.index + 1;
        },
        focusBlock(state, blockID) {
            state.blocks.focus = blockID;
            console.log();
        },
        addBlock(state) {
            state.blocks.total = state.blocks.total + 1;
        },
        removeAllBlocks(state) {
            state.blocks.focus = 0;
            state.blocks.total = 0;
        },
        startSubmission(state, submissionID) {
            state.submissionID = submissionID;
        },
        setupKirby(state, data) {
            state.kirby.site = data.site;
            state.kirby.pages = data.pages;
            state.loaded = true;
        },
        updateKirby(state, path) {
            //console.info(path+' requested.');
            var pages = Object.keys(state.kirby.pages).length ? state.kirby.pages : false;
            if (pages) {
                var paths = path.substr(path.indexOf('/') + 1).split('/');
                var page = false;
                var children = pages;
                while (paths.length) {
                    var id = paths.shift();
                    page = (typeof children[id] === 'object') ? children[id] : false;
                    //console.log(paths, page.uri, page.children, page);
                    if (page) children = (typeof page.children === 'object') ? page.children : false;
                }
                //console.log(path, page, id, children, pages);
                if (page) {
                    if (page.extended === true) {
                        state.kirby.page = page;
                    } else {
                        //console.info('Loading ' + page.uri + ' from the API');
                        axios.get('json?path=' + page.uri + '&structure=0').then(response => {
                            state.kirby.page = response.data.page;
                            state.kirby.page.children = page.children;
                        });
                    }
                } else {
                    //console.log('No page!', path, state);
                }
            } else {
                //console.error('No pages!', path, state);
            }
        }
    }
});