import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth"
import sidebar from "./modules/sidebar"
import 'regenerator-runtime/runtime'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
       
    },
    mutations:{
        
    },
    actions:{
        
    },
    getters:{
        
    },
    modules: {
        auth,
        sidebar
    }
    
});

export default store;