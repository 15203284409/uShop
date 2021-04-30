import Vue from "vue"
let vv = new Vue()

// 成功的弹框
export let successAlert = (msg) => {
    vv.$message({
        message: msg,
        type: 'success'
    })
}

// 失败的弹框
export let errorAlter = msg => {
    vv.$message({
        message: msg,
        type: 'warning'
    })
}