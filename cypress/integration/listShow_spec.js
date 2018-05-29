describe('showList', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    cy.server();
    cy.load_list('GET', 'list2.json');
    cy.load_items('GET', 'items.json');

    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoX3Rva2VuIjoiVkxnRmROQUJwelNMWUxpd1g5a1h4REhFIiwidXNlciI6IkFuYXVzZXIxIiwidXNlckVtYWlsIjoiYW5hQGF1c2VyMS5iaXoiLCJ1c2VySWQiOjEsImV4cCI6MTUyNzE1MDk3MywiaXNzIjoiUmFpbHNKd3RBdXRoIn0.jqoFpg0fupY2Fxu9cOLHbgpPpvCOvFnJNjvZ_83luWI');
    cy.visit('/#/list/show/1');

    cy.wait(['@getUser']);
    cy.wait(['@getList']);
    cy.wait(['@getItems']);
  });

  describe('assert that data is loaded', () => {
    it('correct data', () => {
      cy.get('h2').eq(0).should('contain', 'Titulo lista ');
      cy.get('p').eq(1).should('contain', 'descripción lista');
      cy.get('th').eq(0).should('contain', 'Nombre');
      cy.get('th').eq(1).should('contain', 'Precio');
      cy.get('td').eq(0).should('contain', 'Tele');
      cy.get('td').eq(1).should('contain', '150');
      cy.get('td').eq(2).should('contain', 'gtx 1080');
      cy.get('td').eq(3).should('contain', '600');
    });
  });

  describe('add new item', () => {
    describe('with correct data', () => {
      beforeEach(() => {
        cy.get('input[name="newName"]').type('pantalon');
        cy.get('input[name="newPrice"]').type('20');

        cy.load_items('POST', 'item.json');
        cy.load_items('GET', 'items3.json');

        cy.get('input[name="save_button"]').click();
      });

      it('really add item', () => {
        cy.get('td').eq(8).should('contain', 'pantalon');
      });
    });
  });

  describe('edit data', () => {
    describe('user with permission', () => {
      beforeEach(() => {
        cy.get('td').eq(3).click();

        cy.get('input[name="editName"]').eq(0).type('pantalones');
        // cy.get('input[name="editPrice"]').type('20');

        cy.route({
          method: 'PUT',
          url: 'lists/1/items/*',
          response: 'fixture:item.json'
        }).as('getItems');
        cy.load_items('GET', 'items2.json');

        cy.get('input[name="edit_button"]').eq(0).click();
      });

      it('really add item', () => {
        cy.get('td').eq(2).should('contain', 'pantalones');
      });
    });
  });

  describe('check delete button', () => {
    beforeEach(() => {
      cy.route({
        method: 'DELETE',
        url: 'lists/1/items/*',
        status: 204,
        response: ''
      });
      cy.route({
        method: 'GET',
        url: 'lists/1/items*',
        response: 'fixture:items4.json'
      }).as('deleteItem');

      cy.get('tr').eq(2).children('td').eq(2)
        .click();
      cy.wait(['@deleteItem']);
    });

    it('check table', () => {
      cy.get('td').eq(2).should('contain', 'gtx 1080ti');
    });
  });
});
