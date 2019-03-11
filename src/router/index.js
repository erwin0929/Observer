import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/router/nav'

Vue.use(Router)

// 错误处理路由
const Error = [
  {
    path: '*',
    redirect: 'home'
  }
]

export default new Router({
  routes: [
    ...Nav,
    ...Error
  ]
})
