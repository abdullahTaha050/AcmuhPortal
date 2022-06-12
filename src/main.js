import Vue from 'vue'
import App from './App.vue'
import { router } from "./router/router"
import store from "./store/store"
import 'bootstrap/dist/css/bootstrap.css' 
import * as axiosHelper from './helpers/AxiosHelper'
import Vuelidate from "vuelidate"
import Vue2Editor from "vue2-editor";
import '@fortawesome/fontawesome-free/js/all'
import Toast from "vue-toastification";
import VueCookies from 'vue-cookies'
import "vue-toastification/dist/index.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, BootstrapVueIcons , IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.use(Vue2Editor);
Vue.use(Toast);
Vue.use(Vuelidate);
Vue.use(axiosHelper);
Vue.use(VueCookies, { expire: '7d'});
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons );
Vue.use(IconsPlugin);

new Vue({
  render: h => h(App),
  router,
  axiosHelper,
  router,
  store,
}).$mount('#app')
