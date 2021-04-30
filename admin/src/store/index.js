import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { actions } from "./actions.js"
import { state, getters, mutations } from "./mutations.js"

import cate from "./modules/cate"
import specs from "./modules/specs"
import menu from "./modules/menu"
import banner from "./modules/banner"
import goods from "./modules/goods"
import speckill from "./modules/speckill"
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    //引入 注册
    modules: {
        menu,
        cate,
        specs,
        banner,
        goods,
        speckill
    }
})