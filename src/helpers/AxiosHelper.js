import Vue from 'vue'
import axios from "axios"

  Vue.use({
    install()  {
     Vue.prototype.$axios = axios;
      // Vue.prototype.$apiUrl = "https://localhost:44346/api/"; //for dev
     Vue.prototype.$apiUrl = "http://161.35.120.71:5024/api/"; //for production
      // Vue.prototype.$apiFileUrl = "https://localhost:44346/"; //for development
     Vue.prototype.$apiFileUrl = "http://161.35.120.71:5024"; //for production
   }
 })