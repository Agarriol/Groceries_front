import VueResource from 'vue-resource';
import router from 'js/router.js';

Vue.use(VueResource);


Vue.http.interceptors.push((request, next) => {
  if (Vue.store.state.users.userToken) {
    request.headers.set('Authorization', `Bearer ${Vue.store.state.users.userToken}`);
  }

  // La respuesta debería ser JSON, pero funciona igual sin esta linea
  request.body = JSON.stringify(request.body);

  return function name(response) {
    if (response.status === 404) {
      router.push({name: 'list'});
    }
  };
});
