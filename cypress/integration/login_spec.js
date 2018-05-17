describe('Login', () => {
  beforeEach(() => {
    cy.visit('/#/login');
    cy.server();
  });

  describe('Incorrect data', () => {
    describe('empty password', () => {
      beforeEach(() => {
        cy.get('input[name="email"]').type('ana@auser1.biz');
        cy.route({
          method: 'POST',
          url: '/session',
          status: 422,
          response: {"errors":{"session":["invalid email / password"]}}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'Las credenciales están mal');
      });
    });


    describe('empty email', () => {
      beforeEach(() => {
        cy.get('input[name="password"]').type('12345678');
        cy.route({
          method: 'POST',
          url: '/session',
          status: 422,
          response: {"errors":{"session":["invalid email / password"]}}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'Las credenciales están mal');
      });
    });
  });

  describe('when save with correct data', () => {
    beforeEach(() => {
      cy.get('input[name="email"]').type('ana@auser1.biz');
      cy.get('input[name="password"]').type('12345678');
      cy.route({
        method: 'POST',
        url: '/session',
        status: 201,
        response:  {"session":{"jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI","email": "agarriol.92@gmail.com"}}
      });

      cy.get('input[name="save_button"]').click();
    });

    it('go to list page', () => {
      cy.url().should('include', '/list');
    });
  });
});
