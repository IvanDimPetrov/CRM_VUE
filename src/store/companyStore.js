import cruds from '../cruds/companiesCruds.js'
import EventBus from '../eventBus.js'

const state = {
    companies: [],
}

const getters = {
    getCompanies: (state) => {
        return state.companies;
    }
}

const actions = {
    async SaveCompany({ commit }, data) {
        
        let company = await cruds.saveCompany(data);

        commit('pushCompany', company);

        return company;
    },
    async GetAllCompanies({ commit }, data) {
        try {
            let companies = await cruds.getAllCompanies();

            commit('setCompanies', companies);
           
            return companies;
        }
        catch {          
            EventBus.$emit("show-message", "Something wrong is happening!!!");;
        }
        
    }
}

const mutations = {
    setCompanies: (state, data) => {
        state.companies = data;
    },
    pushCompany: (state, data) => {
        state.companies.push(data);
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
}