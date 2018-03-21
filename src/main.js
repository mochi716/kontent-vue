import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Store from './components/Store.vue'
import CoffeeStore from './components/CoffeeStore.vue'
import BrewerStore from './components/BrewerStore.vue'
import Articles from './components/Articles.vue'
import About from './components/About.vue'
import Cafes from './components/Cafes.vue'
import Contacts from './components/Contacts.vue'
import Article from './components/Article.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueScrollTo from 'vue-scrollto'
import VueI18n from 'vue-i18n'
import * as en from './Localization/en-US.json'
import * as es from './Localization/es-ES.json'
import './index.css';

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAVOq4C-rf7JVeHt6ws9vsf-KHIRpueASg',
    }
})
Vue.use(VueI18n);
Vue.use(Router);

Vue.use(VueScrollTo, {
    duration: 1000,
    easing: "ease-in-out",
});



let router = new Router({
    routes: [
        {
            path: '/:lang',
            component: Home,
        },
        {
            path: '/:lang/store',
            component: Store,
            children: [
                {
                    path: "coffees",
                    component: CoffeeStore,
                },
                {
                    path: "brewers",
                    component: BrewerStore,
                },
                {
                    path: "",
                    component: CoffeeStore,
                }
            ]
        },
        {
            path: "/:lang/articles",
            component: Articles,
        },
        {
            path: "/:lang/articles/:articleName",
            component: Article,
        },
        {
            path: '/:lang/about',
            component: About,
        },{
            path: "/:lang/cafes",
            component: Cafes,
        },
        {
            path: "/:lang/contacts",
            component: Contacts,
        },

    ]
});

let i18n = new VueI18n({
    locale: 'en-US',
    messages: {
        'en-US': en,
        'es-ES': es,
    },
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
