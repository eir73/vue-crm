import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import localizeFilter from './filters/localize.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.use(titlePlugin)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyA8Omr_-Qr5LvCg6VPI2mw-7efN7Let3U8",
  authDomain: "vue-crm-eir.firebaseapp.com",
  databaseURL: "https://vue-crm-eir.firebaseio.com",
  projectId: "vue-crm-eir",
  storageBucket: "vue-crm-eir.appspot.com",
  messagingSenderId: "674848436003",
  appId: "1:674848436003:web:30c93c78a67369e4f36696",
  measurementId: "G-Y3YGTXGHP3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
