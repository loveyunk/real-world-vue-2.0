<template>
  <div>
    <h1>{{ user.user.name }} 的活动</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev"
        >上一页</router-link
      >
      <template v-if="hasNextPage">
        |
      </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >下一页</router-link
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventCard from '@/components/EventCard/index.vue';
import store from '@/store';

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    });
}

export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user'])
  }
};
</script>
