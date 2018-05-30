export default {
  index(queryParams, params) {
    return Vue.http.get(`http://localhost:3000/lists/${queryParams.listId}/items/${queryParams.itemId}/votes`, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  create(queryParams, data, params) {
    return Vue.http.post(`http://localhost:3000/lists/${queryParams.list_id}/items/${queryParams.item_id}/votes`, data, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  delete(queryParams, params) {
    return Vue.http.delete(`http://localhost:3000/lists/${queryParams.list_id}/items/${queryParams.item_id}/votes/${queryParams.vote_id}`, params).catch(() => {
      // TODO, modificar el error
      return Promise.reject(Vue.i18n.t('general.error'));
    });
  }
};
