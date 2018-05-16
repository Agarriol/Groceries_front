export default {
  index(params) {
    return Vue.http.get('http://localhost:3000/users', params).then(response => {
      return response.data;
    });
  },

  show(id, params) {
    return Vue.http.get(`http://localhost:3000/users/${id}`, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  update(id, data, params) {
    const sendData = data; // instanceof FormData ? data : {data};

    return Vue.http.put(`http://localhost:3000/users/${id}`, sendData, params).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  registration(data) {
    const sendData = data; // instanceof FormData ? session : {data};

    return Vue.http.post('http://localhost:3000/registration', sendData).then(response => {

      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  session(data) {
    const sendData = data; // instanceof FormData ? session : {data};

    return Vue.http.post('http://localhost:3000/session', sendData).then(response => {
      return response.data;
    }, response => {
      return Promise.reject(response);
    });
  },

  deleteSession(data) {
    const sendData = data; // instanceof FormData ? data : {data};

    return Vue.http.delete('http://localhost:3000/session', sendData).then(response => {
      return response;
    }, response => {
      return Promise.reject(response);
    });
  }
};
