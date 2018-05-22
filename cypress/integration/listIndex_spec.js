describe('List', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    cy.load_lists('GET', 'lists.json');
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI');
    cy.visit('/#/list');

    cy.wait(['@getUser']);
    cy.wait(['@getLists']);
  });

  describe('assert that data is loaded', () => {
    it('check table', () => {
      cy.get('th').eq(1).should('contain', 'Descripción');
      cy.get('td').eq(0).should('contain', 'Lista 1');
      cy.get('td').eq(2).children('input').should('have.attr', 'name', 'delete');
      cy.get('td').eq(5).should('contain', '');
    });
  });

  describe('check delete button', () => {
    beforeEach(() => {
      cy.route({
        method: 'DELETE',
        url: 'lists/*',
        response: 'fixture:lists2.json'
      });
      cy.route({
        method: 'GET',
        url: 'lists*',
        response: 'fixture:lists2.json'
      }).as('deleteList');
      cy.get('td').eq(2).children('input').click();
      cy.wait(['@deleteList']);
    });
    it('check table', () => {
      cy.get('td').eq(0).should('contain', 'Lista 2');
    });
  });
});
