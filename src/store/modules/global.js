// 根状态
export default {
  state () {
    return {
      username: 'asidoajd',
      mobile: 13955659898,
      count: 0
    }
  },
  actions: {
    increment: {
      root: true,
      handler ({ state }) {
        state.count++
      }
    }
  }
}