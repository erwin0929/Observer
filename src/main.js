/*
 * @Author: Erwin 
 * @Date: 2018-12-30 12:34:57 
 * @Last Modified by: Erwin
 * @Last Modified time: 2019-01-03 20:39:59
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import i18n from './lang'
import './directive'
// import 'lib-flexible/flexible'
import VueScroller from 'vue-scroller'
import VueLazyload from 'vue-lazyload'
import {
  LoadingBar,
  Notice,
  Button,
  FormItem,
  Message,
  Input,
  Menu,
  Form,
  MenuItem,
  Submenu,
  MenuGroup,
  Radio,
  RadioGroup
} from 'iview'
import 'iview/dist/styles/iview.css'

Vue.component('Button', Button)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('MenuItem', MenuItem)
Vue.component('Menu', Menu)
Vue.component('Input', Input)
Vue.component('MenuGroup', MenuGroup)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Submenu', Submenu)
Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message

Vue
  .use(VueScroller)
  .use(VueLazyload, {
    preLoad: 1.3
    // error: 'dist/error.png',
    // loading: 'dist/loading.gif',
  })
Vue.config.productionTip = false


// 使用webpack附带的require来调用所有Common目录下的vue文件,实现中心化管理,免去引入和注册的步骤
const requireComponent = require.context(
  '@components/base',
  false,
  /\.vue$/
)

requireComponent.keys().map(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, '').replace(/\.vue/, '')

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

const req = require.context('@/assets/icon-svg/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


// 前置守卫
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

// 后置守卫,修改标题
router.afterEach(({ meta }) => {
  document.title = `${process.env.VUE_APP_TITLE} | ${meta.title}`
  setTimeout(() => LoadingBar.finish(), 600)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
