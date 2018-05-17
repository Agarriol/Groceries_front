describe('Register', () => {
  beforeEach(() => {
    cy.visit('/#/');
    cy.server();
  });

  describe('when save with correct data', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').type('Anauser1');
      cy.get('input[name="email"]').type('ana@auser1.com');
      cy.get('input[name="password"]').type('12345678');
      cy.get('input[name="passwordConfirm"]').type('12345678');
      cy.route({
        method: 'POST',
        url: '/registration',
        status: 201,
        response: 'fixture:user.json'
      });
      cy.get('input[name="save_button"]').click();
    });

    it('assert that data is loaded', () => {
      cy.get('p').should('contain', 'Se ha registrado correctamente.');
      // TODO, cy.get('router-link').should('to', 'Login');
    });
  });

  describe('when save with incorrect data', () => {
    describe('empty name', () => {
      beforeEach(() => {
        cy.get('input[name="email"]').type('ana@auser55.com');
        cy.get('input[name="password"]').type('12345678');
        cy.get('input[name="passwordConfirm"]').type('12345678');
        cy.route({
          method: 'POST',
          url: '/registration',
          status: 422,
          response: {"errors":{"name":["can't be blank"]}}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'name');
        cy.get('li').should('not.contain', 'email');
        cy.get('li').should('not.contain', 'password');
        cy.get('li').should('not.contain', 'password_confirmation');
      });
    });

    describe('empty password', () => {
      beforeEach(() => {
        cy.get('input[name="name"]').type('Anauser2');
        cy.get('input[name="email"]').type('ana@auser56.com');
        cy.get('input[name="passwordConfirm"]').type('12345678');
        cy.route({
          method: 'POST',
          url: '/registration',
          status: 422,
          response: {"errors":{"password":["can't be blank"],"password_confirmation":["doesn't match Password"]}}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('not.contain', 'name');
        cy.get('li').should('not.contain', 'email');
        cy.get('li').should('contain', 'password');
        cy.get('li').should('contain', 'password_confirmation');
      });
    });

    describe('invalid email and password', () => {
      beforeEach(() => {
        cy.get('input[name="name"]').type('Anauser');
        cy.get('input[name="email"]').type('ana');
        cy.get('input[name="password"]').type('12345678');
        cy.get('input[name="passwordConfirm"]').type('123456789');
        cy.route({
          method: 'POST',
          url: '/registration',
          status: 422,
          response: {"errors":{"email":["is not an email"],"password_confirmation":["doesn't match Password","doesn't match Password"]}}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('not.contain', 'name');
        cy.get('li').should('contain', 'email');
        cy.get('li').should('contain', 'password');
        cy.get('li').should('contain', 'password_confirmation');
      });
    });
  });
});
