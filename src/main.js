import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import VueGlobalMessage from './components/index'
Vue.use(VueGlobalMessage, 
  {
    'zindex': 1000,
    'duration': 15000
  }
)

new Vue({
  render: h => h(App),
}).$mount('#app')
