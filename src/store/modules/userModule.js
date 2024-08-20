import axios from '../../services/axios'

const userModule = {
    namespaced: true,
    state() {
        return {
            user: {},
            permissions: [] 
        };  
    },
    getters:{
        getUser: (state) => state.user,
    },
    mutations:{
        setUser: (state, payload) => {
            state.user = payload;
        },
        clearUser(state) {
            state.user = null;
        }
    },
    actions:{
        user({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(payload.endpoint)
                    .then(({ data }) => {
                        commit("setUser", data.user);
                        resolve(data)
                }).catch(err => {
                    reject(err)
                });
            })
        }
    }
}

export default userModule;