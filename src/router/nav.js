import Layout from '@views/layout/Layout'
import Home from '@views/home/Home'
import About from '@views/about/About'
import Product from '@views/product/Index'
import Test from '@views/test/Test'
import Test2 from '@views/test/Test2'

// 导航路由
const Nav = [
  {
    path: '',
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: {
          title: '关于页'
        }
      },
      {
        path: 'product',
        name: 'product',
        component: Product,
        meta: {
          title: '产品'
        }
      }
    ]
  }
]

// 测试路由
const TestRoute = [
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      title: '开发人员测试用'
    }
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
    meta: {
      title: '开发人员测试用'
    }
  }
]

export default [...Nav, ...TestRoute]