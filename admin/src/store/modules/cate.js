import { getcatelist } from "../../utils/ajax-all"

let state = {
    //初始化list
    list: []
}
let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr
    }
}
let getters = {
    //导出list
    list(state) {
        return state.list
    }
}
let actions = {
    //处理list逻辑
    getCateList(context) {
        getcatelist({ istree: true }).then(res => {
            if (res.data.code === 200) {
                context.commit('changeList', res.data.list)
            }
        })
    }
}
export default {
    state, mutations, actions, getters,
    //命名空间
    namespaced: true
}