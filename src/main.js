import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import DateFilter from './filters/date';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
