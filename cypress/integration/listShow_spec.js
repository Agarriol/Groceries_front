describe('showList', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    cy.server();
    cy.route({
      method: 'GET',
      url: 'lists/*',
      response: 'fixture:list.json'
    }).as('getList');
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI');
    cy.visit('/#/list/show/1');

    cy.wait(['@getUser']);
    cy.wait(['@getList']);
  });

  describe('assert that data is loaded', () => {
    it('correct data', () => {
      cy.get('h2').eq(0).should('contain', 'Titulo lista ');
      cy.get('p').eq(1).should('contain', 'descripción lista');
    });
  });
});
