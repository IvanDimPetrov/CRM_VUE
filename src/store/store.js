import Vue from 'vue'
import Vuex from 'vuex'
import appStore from './appStore.js'
import companyStore from './companyStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appStore,
        companyStore
    }
})
