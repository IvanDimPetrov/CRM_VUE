import userAuth from '../cruds/userAuth.js'

const state = {
    isGuest: true,
    isUser: false,
    authToken: "",
    user: {}
};

const getters = {
    isUser: (state) => { return state.isUser },
    isGuest: (state) => { return state.isGuest },
    user: (state) => { return state.user }
}

const actions = {
    async RegisterUser({commit}, data) {
        
        let response = await userAuth.registerUser(data);

        return response;
        
    },
    async LoginUser( { commit }, data) {

        let response = await userAuth.loginUser(data);

        sessionStorage.setItem('authToken', response.authtoken);
        sessionStorage.setItem('user', response.username);

        let dataToSet = {};

        dataToSet.isUser = true;
        dataToSet.isGuest = false;
        dataToSet.authToken = response.authtoken;
        
        dataToSet.user = {
            id: response._id,
            username: response.username,
            email: response.email,              
        };

        commit('setState', dataToSet);

        return response;

    },
    async LogoutUser( { commit }) {
        
        let response  = await userAuth.logoutUser();

        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");

        commit('setState', { isUser: false,
                             isGuest: true,
                             user: {}
                            });

        return response;
    },
    async LoginGuest ( {commit} ) {

        let guest = {
            username: "guest",
            password: "guest"
        }

        let response = await userAuth.loginUser(guest);
        
        sessionStorage.setItem('authToken', response.authtoken);
        sessionStorage.setItem('user', response.username);

        commit('setState', { 
                             isGuest: true,
                             authToken: response.authtoken,
                             user: {
                                        id: response._id,
                                        username: response.username,
                                        email: response.email
                                   } 
                            });

        return response;
    } 

}

const mutations = {
    setState: (state, data) => {  
        state = Object.assign(state, data)
    }
}

export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
}

