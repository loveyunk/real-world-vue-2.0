import request from '@/utils/request';

const event = {
  getEvents(perPage, page) {
    return request({
      method: 'get',
      url: '/events?_limit=' + perPage + '&_page=' + page
    });
  },
  getEvent(id) {
    return request({
      method: 'get',
      url: '/events/' + id
    });
  },
  postEvent(event) {
    return request({
      data: event,
      method: 'post',
      url: '/events'
    });
  }
};

export default event;
