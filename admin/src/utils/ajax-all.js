import Vue from "vue"
import axios from "axios"
import qs from "qs"
import { errorAlter } from "./alert"
import store from "../store"
import router from "../router"

// 开发环境使用
// let baseUrl = "/api"
// Vue.prototype.$pre = 'http://localhost:3000'

//生产环境使用  打包
let baseUrl = ''
Vue.prototype.$pre = ''



// ----------请求拦截----------

axios.interceptors.request.use(config => {
    if (config.url !== baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.userInfo.token
    }
    return config
})

// ----------响应拦截----------
axios.interceptors.response.use(res => {
    // 统一处理失败的弹框
    if (res.data.code != 200) {
        errorAlter(res.data.msg)
    }
    //设置掉线处理
    if (res.data.msg === '登录已过期或访问权限受限') {
        store.dispatch('changeUser', {})
        router.push('/login')
    }

    //统一处理list是null的情况
    if (!res.data.list) {
        res.data.list = []
    }

    console.log('本次请求地址是：' + res.config.url)
    return res
})


// post带有文件，参数转换
function postFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}
// menu----菜单管理------------------
// 菜单列表
export let getMenuList = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        params: {
            istree: true
        }
    })
}
//菜单添加
export let getMenuAdd = (user) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(user)
    })
}
// 菜单删除
export let removeMenu = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
// 菜单编辑获取一条数据
export let getMenuOne = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        params: { id: id }
    })
}
export let editMenu = (user) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// -------------角色管理 role-----------
// 获取角色列表
export let roleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    })
}
// 角色添加
export let roleAdd = (user) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(user)
    })
}
// 删除角色
export let roleRemove = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: { id: id }
    })
}
// 角色获取一条
export let roleInfo = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'GET',
        params: {
            id: id
        }
    })
}
// 角色修改
export let roleEdit = (obj) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: "post",
        data: qs.stringify(obj)
    })
}

// --------------管理员管理- manage----------------
// 添加管理员
export let menageAdd = (user) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(user)
    })
}
// 管理员列表
export let menageList = (obj) => {
    return axios({
        url: baseUrl + '/api/userlist',
        params: {
            size: obj.size,
            page: obj.page
        }
    })
}
// 管理员总数  用于计算分页
export let menageCount = () => {
    return axios({
        url: baseUrl + '/api/usercount',
    })
}
// 获取管理员详情（一条）
export let manageInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        params: { uid: uid }
    })
}
// 管理员修改
export let reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}
// 管理员删除
export let menageRemove = (id) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: {
            uid: id
        }
    })
}
// 管理员登陆
export let menageLogin = (user) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(user)
    })
}

// -------------商品分类 cate-------------
// 商品分类列表
export let getcatelist = (user) => {
    return axios({
        url: baseUrl + '/api/catelist',
        params: user
    })
}
// 商品分类添加
export let getcateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: 'post',
        data: postFormData(user)
    })
}
// 商品分类删除
export let removeCate = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: { id: id }
    })
}
// 商品分类获取（一条）
export let getCateInfo = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: { id: id }
    })
}
// 商品分类修改
export let editCate = (user) => {
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: postFormData(user)
    })
}
//---------商品规格-----specs-------------
// 商品规格列表(分页)
export let specsList = (ps) => {
    return axios({
        url: baseUrl + '/api/specslist',
        params: ps
    })
}
// 商品规格总数（用于计算分页）
export let specsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}
// 商品规格添加
export let specsAdd = (user) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(user)
    })
}
// 商品规格删除
export let specsDel = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: { id: id }
    })
}
// 商品规格获取详情（一条）
export let specsInfo = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        params: { id: id }
    })
}
// 商品规格修改
export let specsEdit = (user) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

//---------商品管理-----goods------------

// 商品添加
export let goodsAdd = (user) => {
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: postFormData(user)
    })
}
// 商品总数（用于计算分页）
export let goodsCount = () => {
    return axios({
        url: baseUrl + '/api/goodscount'
    })
}
// 商品列表（分页）
export let goodsList = (user) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        params: user
    })
}
// 商品获取（一条）
export let goodsInfo = (id) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        params: { id: id }
    })

}
// 商品修改
export let goodsEdit = (user) => {
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data: postFormData(user)
    })
}
// 商品删除
export let goodsDel = (id) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data: { id: id }
    })
}

//---------会员管理-----member------------
// 会员列表
export let memberList = () => {
    return axios({
        url: baseUrl + '/api/memberlist'
    })
}
// 会员获取（一条）
export let memberInfo = (uid) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        params: { uid: uid }
    })
}
// 会员修改
export let memberRedit = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

//---------轮播图管理banner---------------

// 轮播图添加
export let bannerAdd = (user) => {
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: postFormData(user)
    })
}
// 轮播图列表
export let bannerList = () => {
    return axios({
        url: baseUrl + '/api/bannerlist'
    })
}
// 轮播图删除
export let bannerDel = (id) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: { id: id }
    })
}
// 轮播图获取（一条）
export let bannerInfo = (id) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        params: { id: id }
    })
}
// 轮播图修改
export let bannerEdit = (user) => {
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: postFormData(user)
    })
}


//---------秒杀活动seckill-------------
// 秒杀列表
export let speckList = () => {
    return axios({
        url: baseUrl + '/api/secklist',
    })
}
// 秒杀添加
export let speckAdd = (user) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: qs.stringify(user)
    })
}
// 秒杀删除
export let speckDel = (id) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: { id: id }
    })
}
// 秒杀获取一条
export let speckInfo = (id) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        method: 'get',
        params: id
    })
}
// 秒杀修改
export let speckEdit = (user) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: qs.stringify(user)
    })
}


