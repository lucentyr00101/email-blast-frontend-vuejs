import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import Auth from '@/utils/auth'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
Vue.use(Vuetify)
Vue.use(Auth)

router.beforeEach(
  (to, from, next) => {
    //if user navigates to root path
    if(to.fullPath === '/'){
      //if user is not authenticated, redirect to login
      if(!Vue.auth.isAuthenticated()) {
        next({
          name: 'login'
        })
      } else {
        //if user is authenticated redirect to dashboard
        next({
          name: 'home'
        })
      }
    } else if(to.matched.some(component => component.meta.forVisitors)){

      if(Vue.auth.isAuthenticated()){
        next({
          name: 'home'
        })
      } else next()

    } else if(to.matched.some(component => component.meta.forAuth)) {
      
      if(!Vue.auth.isAuthenticated()){
        next({
          name: 'login'
        })
      } else next()

    } else next()

  }
)

axios.defaults.baseURL = 'http://golf.beecr8tive.net/email-blast-api/public/'

Vue.config.productionTip = false

window.Event = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
