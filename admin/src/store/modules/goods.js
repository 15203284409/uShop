import { goodsList, goodsCount } from "../../utils/ajax-all"

let state = {
    //初始化list
    list: [],
    page: 1,
    size: 2,
    total: 0
}

let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}

let getters = {
    //导出list
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

let actions = {
    //处理list逻辑
    getGoodsList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        goodsList(params).then(res => {
            if (res.data.code === 200) {
                if (res.data.list.length === 0 && context.sate.page > 1) {
                    context.commit('changePage', context.state.page - 1)
                    context.dispatch('getGoodsList')
                    return
                }
                context.commit('changeList', res.data.list)
            }

        })
    },
    // 获取总数
    getTotal(context) {
        goodsCount().then(res => {
            if (res.data.code === 200) {
                context.commit('changeTotal', res.data.list[0].total)
            }
        })
    },
    // 修改page
    changePage(context, num) {
        context.commit('changePage', num)
        context.dispatch('getGoodsList')
    }

}
export default {
    state, mutations, getters, actions,
    //命名空间
    namespaced: true
}