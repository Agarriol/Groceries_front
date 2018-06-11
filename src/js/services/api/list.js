export default {
  index(params) {
    return Vue.http.get('lists', params).then(response => {
      return response.data;
    });
  },

  show(id, params) {
    return Vue.http.get(`lists/${id}`, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  create(data, params) {
    return Vue.http.post('lists', data, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  update(listId, data, params) {
    return Vue.http.put(`lists/${listId}`, data, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  destroy(id, params) {
    return Vue.http.delete(`lists/${id}`, params).catch(() => {
      return Promise.reject(response);
    });
  }
};
