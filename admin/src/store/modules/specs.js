import { specsList, specsCount } from "../../utils/ajax-all"
let state = {
    //初始化list
    list: [],
    //一页的数量
    size: 2,
    // 当前的页码
    page: 1,
    //总数
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

    //获取specs列表数据
    getSpecsList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        specsList(params).then(res => {
            if (res.data.code === 200) {

                if (res.data.list.lenght === 0 && context.state.page > 1) {
                    context.state.page - 1;
                    context.dispatch('getSpecsList')
                    return
                }

                //接受list数据后 把attrs循环改变为json对象
                let list = res.data.list
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })

                //修改list数据
                context.commit('changeList', list)
            }

        })
    },
    // 获取总数
    getSpecsTotal(context) {
        specsCount().then(res => {
            if (res.data.code === 200) {
                context.commit('changeTotal', res.data.list[0].total)
            }
        })
    },
    // 修改change
    changePage(context, num) {
        context.commit('changePage', num)
        context.dispatch('getSpecsList')
    }
}
export default {
    state, mutations, getters, actions,
    //命名空间
    namespaced: true
}