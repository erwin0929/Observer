import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 遍历modules目录下的所有js文件,导入至modules变量,最后注入到store中
// 避免新建一个vuex文件就导入一次
// 作为一个合格的程序猿,偷懒是必备技能 ^.^
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}

requireModule.keys().map(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  }
})

export default new Vuex.Store({
  modules
})
