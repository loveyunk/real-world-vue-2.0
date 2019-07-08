<template>
  <div>
    <div class="event-header">
      <span class="eyebrew">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>组织者：{{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>类别: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>位置</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>详情</h2>
    <p>{{ event.description }}</p>

    <h2>
      参与者
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>

    <ul class="list-group">
      <li v-for="(attendess, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendess.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon/index.vue';

export default {
  name: 'EventShow',
  components: {
    BaseIcon
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
