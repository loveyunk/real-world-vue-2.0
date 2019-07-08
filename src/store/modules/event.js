import http from '@/services';

const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3
};

const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};

const actions = {
  createEvent({ commit, dispatch }, event) {
    return http.event
      .postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        commit('SET_EVENT', event);
        const notification = {
          type: 'success',
          message: '活动创建成功'
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + err.message
        };
        dispatch('notification/add', notification, { root: true });
        throw err;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return http.event
      .getEvents(state.perPage, page)
      .then(res => {
        const data = res.data;
        commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']));
        if (data.status.code === http.ErrorCode.ERR_OK) {
          commit('SET_EVENTS', data && data.data);
        }
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + err.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, state }, id) {
    // 是否为当前event
    if (id === state.event.id) {
      return state.event;
    }

    // 是否在events中
    var event = getters.getEventById(id);

    if (event) {
      commit('SET_EVENT', event);
      return event;
    } else {
      // 最后才请求接口
      return http.event.getEvent(id).then(res => {
        const data = res.data;
        if (data.status.code === http.ErrorCode.ERR_OK) {
          commit('SET_EVENT', data && data.data);
          return data && data.data;
        }
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
