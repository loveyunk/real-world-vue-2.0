import Vue from 'vue';
import Router from 'vue-router';
import EventList from '@/views/EventList/index.vue';
import EventShow from '@/views/EventShow/index.vue';
import EventCreate from '@/views/EventCreate/index.vue';
import store from '@/store';
import NProgress from 'nprogress';
import NotFound from '@/views/NotFound/index.vue';
import NetworkIssue from '@/views/NetworkIssue/index.vue';
import Example from '@/views/Example/index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/example',
      component: Example
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(to, from, next) {
        store
          .dispatch('event/fetchEvent', to.params.id)
          .then(event => {
            to.params.event = event;
            next();
          })
          .catch(err => {
            if (err.response && err.response.status === 404) {
              next({ name: '404' });
            } else {
              next({ name: 'network-issue' });
            }
          });
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
