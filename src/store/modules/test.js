const test = {
  state: {
    userInfo: {
      uid: 8034,
      username: '神啊',
      mobile: '13917656565',
      age: 34,
      gender: 'male'
    }
  },
  getters: {
    completeUserInfo (state) {
      let newUserInfo = { ...state.userInfo }
      let { gender } = newUserInfo
      return Object.assign(newUserInfo, { gender: gender === 'male' ? '男' : '女' })
    }
  },
  mutations: {
    updateUserInfo (state, payload) {
      Object.assign(state.userInfo, payload)
    }
  },
  actions: {
    async updateUserInfo({ commit }, payload) {
      commit('updateUserInfo', payload)
      return true
    }
  }
}

export default test
