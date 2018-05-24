export default {
  index(params) {
    return Vue.http.get('http://localhost:3000/lists', params).then(response => {
      return response.data;
    });
  },

  show(id, params) {
    return Vue.http.get(`http://localhost:3000/lists/${id}`, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  create(data, params) {
    return Vue.http.post('http://localhost:3000/lists', data, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  destroy(id, params) {
    return Vue.http.delete(`http://localhost:3000/lists/${id}`, params).catch(() => {
      // TODO, modificar el error
      return Promise.reject(Vue.i18n.t('general.error'));
    });
  }
};
