import { createStore } from 'vuex'

const store = createStore({
    state: {
        log: false,
        favourites: [],
        google: false,
        name: null,
        added: false,
        removed: false,
        isUp: false,
        loading: false
    },
    mutations: {
        setUser(state, { favourites, google, name }) {
            state.log = true
            state.favourites = favourites
            state.google = google
            state.name = name
        },
        removeUser(state){
            state.log = false
            state.favourites = []
            state.google = false
            state.name = null
        },
        loader(state){
            state.loading = !state.loading
        },
        Add(state){
            state.added = !state.added
        },
        Remove(state){
            state.removed = !state.removed
        },
        isup(state){
            state.isUp = !state.isUp
        }
    },
    actions: {
        addAllData({commit}, payload) {
            commit('setUser', payload)
        },
        removeAllData({commit}){
            commit('removeUser')
        },
        loading({commit}){
            commit('loader')
        },
        Added({commit}){
            commit('Add')
            setTimeout(() => { commit('isup') }, 1400)
            setTimeout(() => {
            commit('Add')
            commit('isup')
             }, 2000)
        },
        Removed({commit}){
            commit('Remove')
            setTimeout(() => { commit('isup') }, 1400)
            setTimeout(() => {
            commit('Remove')
            commit('isup')
             }, 2000)
        }
    },
    getters: {
        getUserData(state) {
            return {
                log: state.log, 
                favourites: state.favourites,
                google: state.google,
                name: state.name,
                added: state.added,
                removed: state.removed,
                isUp: state.isUp,
                loading: state.loading
             }
        }
    }
})

export default store