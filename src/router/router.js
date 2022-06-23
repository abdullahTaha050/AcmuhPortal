import Vue from "vue"
import VueRouter from "vue-router"
import Auth from "../components/Pages/Auth/Auth"
import Dashboard from "../views/Dashboard.vue"
import Notification from "../views/Notification.vue"
import Activity from "../views/Activity.vue"
import Dining from "../views/Dining.vue"
import ExamSystem from "../views/ExamSystem.vue"
import NotificationAdd from "../views/NotificationAdd.vue"
import NotificationUser from "../views/NotificationUser.vue"
import Settings from "../views/Settings.vue"
import ActivityAdd from "../views/ActivityAdd.vue"
import ActivityEdit from "../views/ActivityEdit.vue"
import ActivityUser from "../views/ActivityUser.vue"
import ActivityDetail from "../views/ActivityDetail.vue"
import StudentCommunities from "../views/StudentCommunities.vue"

import store from "../store/store"
import NotificationEdit from "../views/NotificationEdit";
import NotificationDetail from "../views/NotificationDetail";
import Help from "@/views/Help";


Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/", 
            component: Dashboard,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/notification", 
            component: Notification,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/notification/:id",
            component: NotificationEdit,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/activities/:id",
            component: ActivityEdit,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/notification/new/add",
            component: NotificationAdd,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/activity/new/add",
            component: ActivityAdd,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/activities")
                }
            }
        },
        {
            path: "/activities", 
            component: Activity,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/activity")
                }
            }
        },
        {
            path: "/user/notification",
            component: NotificationUser,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/user/activity",
            component: ActivityUser,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/user/notification/:id",
            component: NotificationDetail,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/user/activity/:id",
            component: ActivityDetail,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/dining", 
            component: Dining,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/exam-system", 
            component: ExamSystem,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/student-communities", 
            component: StudentCommunities,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/settings", 
            component: Settings,
            beforeEnter(to, from, next){
                // eslint-disable-next-line no-unused-vars
                let isAdmin = localStorage.getItem("isAdmin");
                if (store.getters.isAuthenticated && isAdmin === "1") {
                    next()
                } else {
                    next("/user/notification")
                }
            }
        },
        {
            path: "/help",
            component: Help,
            // eslint-disable-next-line no-unused-vars
            beforeEnter(to, from, next){
                if (store.getters.isAuthenticated) {
                    next()
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/auth", 
            component: Auth
        },
    ],
    mode: 'history'
});