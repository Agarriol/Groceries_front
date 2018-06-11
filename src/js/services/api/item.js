export default {
  index(listId, params) {
    return Vue.http.get(
      `lists/${listId}/items`,
      params
    ).then(response => {
      return response.data;
    });
  },

  create(listId, data, params) {
    return Vue.http.post(
      `lists/${listId}/items`,
      data,
      params
    ).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  update(listId, itemId, data, params) {
    return Vue.http.put(
      `lists/${listId}/items/${itemId}`,
      data,
      params
    ).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  destroy(listId, itemId, params) {
    return Vue.http.delete(
      `lists/${listId}/items/${itemId}`,
      params
    ).catch(() => {
      return Promise.reject(response);
    });
  }

};
