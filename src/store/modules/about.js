import service from '@/api'

const about = {
  state: {
    mobile: 13918294845
  },
  mutations: {
  },
  actions: {
    async getProductList (context, data) {
      return service({
        url: 'slide/getlist',
        data
      })
    }
  }
}

export default about
