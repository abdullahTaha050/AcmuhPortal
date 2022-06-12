import {router} from "../../router/router"

const state = {
    token: "",
    loginFailedMessage:"",
    user: [],
    userClaims: [],
    isAdmin: false
}

const mutations = {
    setToken(state, token){
        state.token = token;
    },
    setIsAdmin(state, isAdmin){
        state.isAdmin = isAdmin;
    },
    clearIsAdmin(state){
        state.token = false;
    },
    clearToken(state){
        state.token = "";
    },
    setUser(state, user){
        state.user.push(user);
    },
    clearUser(state){
        state.user = [];
    },
    setUserClaims(state, claims){
        state.userClaims.push(claims);
    },
    clearUserClaims(state){
        state.userClaims = [];
    },
    setLoginFailedMessage(state, msg){
        state.loginFailedMessage = msg;
    },
    clearLoginFailedMessage(state){
        state.loginFailedMessage ="";
    }
}

const actions = {
    initAuth({commit, dispatch}, currentRoute){
        let token = localStorage.getItem("token");

        if (token) {
            let user = localStorage.getItem("user");
            let isAdmin = localStorage.getItem("isAdmin");
            let userClaims = this._vm.$cookies.get("userClaims");
            let expirationDate = localStorage.getItem("expirationDate");
            let time = new Date().getTime();
            let expTime = new Date().getTime() + +expirationDate;
            if (time > expTime) {
                console.log("token süresi dolmuş.");
                dispatch("logout");
            } else {
                commit("setToken", token);
                commit("setIsAdmin", isAdmin);
                commit("setUser", user);
                commit("setUserClaims", userClaims);
                let timerSecond = +expirationDate - time;
                dispatch("setTimeoutExpiresIn", timerSecond);
                router.push("/");
            }

            
        } else {
            router.push("/auth");
            return false;
        }
    },
    async login({commit, dispatch, state}, authData){
        let login = "auth/login";
        let register = "register";
        if (authData.isUser) {
            return await this._vm.$axios.post(this._vm.$apiUrl + login, 
                {username: authData.username, password: authData.password},
                {headers: {
                    "Content-Type": "application/json"
                }}
                )
            .catch(error => {
                console.log(error.response.data)
                commit("setLoginFailedMessage", error.response.data)
            })
            .then(response => {
                if (response.data.token) {
                    commit("setToken", response.data.token);
                    commit("setUser", response.data.user);
                    commit("setUserClaims", response.data.userClaims);
                    response.data.userClaims.map(function (value) {
                        if (value.name === "admin"){
                            commit("setIsAdmin", true);
                            localStorage.setItem("isAdmin", "1");
                        }
                    }, this)
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", response.data.user);
                    this._vm.$cookies.set("userClaims", {claims: response.data.userClaims});
                    localStorage.setItem("expirationDate", new Date().getTime() + 600000);
                    dispatch("setTimeoutExpiresIn", response.data.expiration);
                } else{
                    return false
                }
            })

        } else{
            return this._vm.$axios.post(this._vm.$apiUrl + register, {username: authData.username, password: authData.password})
            .then(response => {
                console.log(response);
            })
        }
    },
    setTimeoutExpiresIn({dispatch}, expiration){
        setTimeout(() => {
            dispatch("logout");
        }, expiration)
    },
    logout({commit, dispatch, state}){
        commit("clearToken");
        commit("clearUser");
        commit("clearUserClaims");
        commit("clearIsAdmin");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("user");
        localStorage.removeItem("expirationDate");
        router.replace("/auth")
    }
}

const getters = {
    isAuthenticated(state){
        return state.token !== "";
    },
    getIsAdmin(state){
        return state.isAdmin;
    },
    getUser(state){
        return state.user;
    },
    getUserClaims(state){
        return state.userClaims;
    },
    getToken(state){
        return state.token;
    },
    getLoginFailedMessage(state){
        return state.loginFailedMessage;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}