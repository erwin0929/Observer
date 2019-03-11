import { createNamespacedHelpers } from 'vuex'
const { 
  mapState,
  mapGetters,
  mapActions
} = createNamespacedHelpers('test')

export default {
  methods: {
    ...mapActions([
      'updateUserInfo'
    ])
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    ...mapGetters([
      'completeUserInfo'
    ])
  }
}