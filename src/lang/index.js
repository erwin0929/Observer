import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhLocale from './zh'
import enLocale from './en'
import store from '@/store'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zhLocale
  },
  en: {
    ...enLocale
  }
}

const i18n = new VueI18n({
  locale: store.state.app.language,
  messages
})

export default i18n