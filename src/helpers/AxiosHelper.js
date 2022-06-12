import Vue from 'vue'
import axios from "axios"

  Vue.use({
    install()  {
     Vue.prototype.$axios = axios;
      Vue.prototype.$apiUrl = "https://localhost:44346/api/";
     //Vue.prototype.$apiUrl = "https://acmuhportal.tech:5001/api/"; //for production
      Vue.prototype.$apiFileUrl = "https://localhost:44346/"; //for development
     //Vue.prototype.$apiFileUrl = "https://acmuhportal.tech:5001/"; //for production
   }
 })