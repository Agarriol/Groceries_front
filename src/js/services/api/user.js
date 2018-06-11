export default {
  index(params) {
    return Vue.http.get('users', params).then(response => {
      return response.data;
    });
  },

  show(id, params) {
    return Vue.http.get(`users/${id}`, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  update(id, data, params) {
    const sendData = data; // instanceof FormData ? data : {data};

    return Vue.http.put(`users/${id}`, sendData, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  registration(data) {
    const sendData = data; // instanceof FormData ? session : {data};

    return Vue.http.post('registration', sendData).then(response => {

      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  session(data) {
    const sendData = data; // instanceof FormData ? session : {data};

    return Vue.http.post('session', sendData).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  deleteSession(data) {
    const sendData = data; // instanceof FormData ? data : {data};

    return Vue.http.delete('session', sendData).then(response => {
      return response;
    }, response => {
      return Promise.reject(response);
    });
  }
};
