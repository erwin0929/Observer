import Vue from 'vue'

// 但是目前指令还用的不熟练,得去看下demo学习一哈,这里先搁置一下
// 接下来要学习下 JSX渲染, 组件通信双向绑定.sync, vuex, 自定义指令

// 当滚动距离等于某个阈值时,固定导航
Vue.directive('fixNav', {
  inserted (el, binding) {
    // 获取屏幕滚动距离
    const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // 获取导航离顶部的距离
    const getNavTop = el.offsetTop
    // 2值进行比较
    const compare = () => {
      if (getScrollTop() > getNavTop) {
        binding.value.fixedNav()
      } else {
        binding.value.cancelFixed()
      }
    }
    el.__compare__ = compare
    window.addEventListener('scroll', compare)
  },
  // 解除绑定
  unbind (el) {
    window.removeEventListener('scroll', el.__compare__)
    delete el.__compare__
  }
})
