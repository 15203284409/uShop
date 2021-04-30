import { getMenuList } from "../../utils/ajax-all"

let state = {
    // 菜单列表数据
    list: [],
}

let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr
    }
}

let getters = {
    //导出
    list(state) {
        return state.list
    }
}

let actions = {
    //处理list逻辑
    // 获取菜单列表
    getMenuListAction(context) {
        getMenuList().then(res => {
            context.commit('changeList', res.data.list)
        })
    },
}

export default {
    state, mutations, getters, actions,
    //命名空间
    namespaced: true
}