export default {
  index(listId, params) {
    return Vue.http.get(
      `http://localhost:3000/lists/${listId}/items`,
      params
    ).then(response => {
      return response.data;
    });
  },

  create(listId, data, params) {
    return Vue.http.post(
      `http://localhost:3000/lists/${listId}/items`,
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
      `http://localhost:3000/lists/${listId}/items/${itemId}`,
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
      `http://localhost:3000/lists/${listId}/items/${itemId}`,
      params
    ).then(response => {
      return response.data;
    });
  },

};
