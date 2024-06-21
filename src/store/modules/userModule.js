const userModule = {
    namespaced: true,
    state() {
        return {
            user: {}
        };  
    },
    getters:{
        getUser: (state) => state.user,
    },
    mutations:{
        setUser: (state, payload) => {
            state.user = payload;
        },
    },
    actions:{
        user({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(payload.endpoint)
                    .then(({ data }) => {
                        commit("setUser", data);
                        resolve(data)
                }).catch(err => {
                    reject(err)
                });
            })
        }
    }
}

export default userModule;