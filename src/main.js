import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import firebase from 'firebase'
Vue.config.productionTip = false
Vue.use(ElementUI);
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
firebase.analytics();
window.firebase=firebase;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
