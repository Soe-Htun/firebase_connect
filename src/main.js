import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import firebase from 'firebase';
import Vuex from 'vuex'
Vue.config.productionTip = false

import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueGoodTablePlugin);



//connect firebase
var firebaseConfig = {
  apiKey: "AIzaSyCbHgBmoFrO5PrEYr3pA6EHOxyfVFt_y4w",
  authDomain: "fir-connect-2d1f5.firebaseapp.com",
  databaseURL: "https://fir-connect-2d1f5.firebaseio.com",
  projectId: "fir-connect-2d1f5",
  storageBucket: "fir-connect-2d1f5.appspot.com",
  messagingSenderId: "26032200785",
  appId: "1:26032200785:web:f245d08d416e03c1406c70",
  measurementId: "G-ZBC5M3JJSV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.firebase=firebase;

//vuex Nav guards to restrict routes
const store = new Vuex.Store(
  {
    state:{
      authenticated : false
    },
    mutations : {
      setAuthentication(state, status){
        state.authenticated = status;
      }
    }
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
