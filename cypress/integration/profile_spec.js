describe('Profile', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI');
    cy.visit('/#/profile');
    cy.server();
  });

  it('assert that data is loaded', () => {
    cy.get('input[name="name"]').should('have.value', 'Anauser1');
    cy.get('input[name="email"]').should('have.value', 'ana@auser1.biz');
  });

  describe('when save with correct data', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('pantalla');
      cy.route({
        method: 'PUT',
        url: '/users/*',
        status: 204,
        response: ''
      });
      cy.get('input[name="save_button"]').click();
    });

    it('assert that data is loaded', () => {
      cy.get('p').should('contain', 'Los cambios se han guardado correctamente');
    });
  });

  describe('when save with incorrect data', () => {
    describe('invalid current password', () => {
      beforeEach(() => {
        cy.get('input[name="passwordCurrent"]').clear();
        cy.get('input[name="passwordNew"]').type('ana@auser56.com');
        cy.get('input[name="passwordNewConfirm"]').type('12345678');
        cy.route({
          method: 'PUT',
          url: '/users/*',
          status: 422,
          response: {"current_password":[{"error": "blank"}]}
        });

        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('not.contain', 'email');
        cy.get('li').should('contain', 'current_password');
      });
    });

    describe('invalid confirm password', () => {
      beforeEach(() => {
        cy.get('input[name="passwordCurrent"]').type('12345678');
        cy.get('input[name="passwordNew"]').type('12345678');
        cy.get('input[name="passwordNewConfirm"]').type('123456789');
        cy.route({
          method: 'PUT',
          url: '/users/*',
          status: 422,
          response: {"password_confirmation":[{"error": "confirmation","attribute": "Password"},{"error": "confirmation","attribute": "Password"}]}
        });

        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('not.contain', 'email');
        cy.get('li').should('not.contain', 'current_password');
        cy.get('li').should('contain', 'password_confirmation');
      });
    });

    describe('invalid email', () => {
      beforeEach(() => {
        cy.get('input[name="email"]').clear();
        cy.get('input[name="email"]').type('ana');
        cy.get('input[name="passwordCurrent"]').type('12345678');
        cy.get('input[name="passwordNew"]').type('12345678');
        cy.get('input[name="passwordNewConfirm"]').type('123456789');
        cy.route({
          method: 'PUT',
          url: '/users/*',
          status: 422,
          response: {"email":[{"error": "invalid","value": "agarriol"}]}
        });

        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'email');
        cy.get('li').should('not.contain', 'current_password');
        cy.get('li').should('not.contain', 'password_confirmation');
      });
    });
  });
});
