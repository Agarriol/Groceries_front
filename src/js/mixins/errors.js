Vue.mixin(Vue.extend({
  methods: {
    processErrors(response) {
      this.varErrorReset();

      const indexErrors = Object.keys(response.data);

      for (let i = 0; i < indexErrors.length; i++) {
        // TODO, añadir errror
        this.errors.push(`${indexErrors[i]}: ` + Vue.i18n.t('errors.'+ response.data[indexErrors[i]][0].error));

        Object.keys(this.errorsVar).forEach(key => {
          if (key === indexErrors[i]) {
            this.errorsVar[key] = true;
          }
        });
      }
    },
    varErrorReset() {
      this.errors = [];
      Object.keys(this.errorsVar).forEach(key => {
        this.errorsVar[key] = false;
      });
    }
  }
}));
