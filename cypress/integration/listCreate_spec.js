describe('createList', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI');
    cy.visit('/#/list/create');
    cy.wait(['@getUser']);
  });

  describe('Incorrect data', () => {
    describe('empty tile', () => {
      beforeEach(() => {
        cy.get('input[name="title"]').should('contain', '');
        cy.server();
        cy.route({
          method: 'POST',
          url: '/lists',
          status: 422,
          response: {"title":["can't be blank"]}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'title');
      });
    });


    describe('title too long', () => {
      beforeEach(() => {
        cy.get('input[name="title"]').type('title too long');
        cy.server();
        cy.route({
          method: 'POST',
          url: '/lists',
          status: 422,
          response: {"title":["is too long (maximum is 100 characters)"]}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'title');
      });
    });

    describe('description too long', () => {
      beforeEach(() => {
        cy.get('input[name="description"]').type('Description too long');
        cy.server();
        cy.route({
          method: 'POST',
          url: '/lists',
          status: 422,
          response: {"description":["is too long (maximum is 5000 characters)"]}
        });
        cy.get('input[name="save_button"]').click();
      });

      it('show correct errors', () => {
        cy.get('li').should('contain', 'description');
      });
    });
  });

  describe('Correct data', () => {
    describe('empty tile', () => {
      beforeEach(() => {
        cy.get('input[name="title"]').type('Good title');
        cy.get('input[name="description"]').type('Good description');
        cy.server();
        cy.route({
          method: 'POST',
          url: '/lists',
          status: 201,
          response: {"id": 1,"title": "Titulo lista ","description": "descripción lista","user_id": 1}
          // TODO, response: 'fixtures:list.json'
        });
        cy.get('input[name="save_button"]').click();
      });

      it('go to list page', () => {
        cy.url().should('include', '/list/show/');
      });
    });
  });
});
