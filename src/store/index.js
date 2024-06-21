import userModule from "./modules/userModule";
import Vuex from "vuex"


const store = new Vuex.Store({
    modules: {
      userModule,
    },
});

export default store;
  