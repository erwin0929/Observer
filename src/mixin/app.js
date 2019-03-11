import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('app')

export default {
  computed: {
    ...mapState({
      obj: state => state.obj
    })
  }
}