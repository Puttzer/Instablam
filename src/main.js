import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false


// Camanstuff insert here!
Vue.prototype.online = window.navigator.onLine;
Vue.prototype.createObjectURL = window.URL.createObjectURL;
Vue.prototype.Caman = window.Caman;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

import { requestNotificationPermission} from '../src/js/notifications.js';
import push from '../src/js/push-notifications';


requestNotificationPermission();

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Registered service worker'))
      .catch((error) => console.log('Error register service worker ', error));
      push();
  }
}

registerServiceWorker();

