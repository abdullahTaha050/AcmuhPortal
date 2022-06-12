const state = {
    collapsed: true,
    sidebarWidth: 220
}

const mutations = {
    setCollapsed(state, collapsed){
        state.collapsed = collapsed;
    }
}

const actions = {
    initAuth({commit, dispatch}){
        
    },
    
}

const getters = {
    getCollapsed(state){
        return state.collapsed;
    },
    getToggleSidebar(state){
        return state.collapsed = !state.collapsed;
    },
    getSidebarWidth(state){
        return state.sidebarWidth;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}