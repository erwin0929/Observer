// 关于我们
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  methods: {
    ...mapActions('about', [
      // 获取产品列表
      'getProductList'
    ])
  },
  computed: {
    ...mapState({
      // 手机号
      mobile: state => state.about.mobile
    })
  }
}