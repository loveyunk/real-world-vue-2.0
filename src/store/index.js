import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import event from './modules/event';
import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  devtools: true,
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: ['教育', '技术', '食物', '自然', '社区', '动物', '其它']
  }
});
