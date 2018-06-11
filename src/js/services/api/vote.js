export default {
  create(queryParams, data, params) {
    return Vue.http.post(`lists/${queryParams.list_id}/items/${queryParams.item_id}/votes`, data, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  delete(queryParams, params) {
    return Vue.http.delete(`lists/${queryParams.list_id}/items/${queryParams.item_id}/votes/${queryParams.vote_id}`, params).catch(() => {
      return Promise.reject(response);
    });
  }
};
