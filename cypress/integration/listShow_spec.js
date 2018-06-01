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
      cy.get('p').eq(0).should('contain', 'descripción lista');
      cy.get('th').eq(1).should('contain', 'Item');
      cy.get('th').eq(2).should('contain', 'Precio');
      cy.get('td').eq(1).should('contain', 'Tele');
      cy.get('td').eq(2).should('contain', '150');
      cy.get('td').eq(4).should('contain', 'gtx 1080');
      cy.get('td').eq(5).should('contain', '600');
    });
  });

  describe('add new item', () => {
    describe('with correct data', () => {
      beforeEach(() => {
        cy.get('input[name="newName"]').type('pantalon');
        cy.get('input[name="newPrice"]').type('20');

        cy.load_items('POST', 'item.json');
        // TODO, a veces devuelve items
        cy.load_items('GET', 'items3.json');

        cy.get('button[name="save_button"]').click();
      });

      it('really add item', () => {
        cy.get('tr').eq(4).children('td').eq(1)
          .should('contain', 'pantalon');
      });
    });
  });

  describe('edit data', () => {
    describe('user with permission', () => {
      beforeEach(() => {
        cy.get('tr').eq(2).children('td').eq(2)
          .click();

        cy.get('input[name="editName"]').eq(0).type('pantalones');
        // cy.get('input[name="editPrice"]').type('20');

        cy.route({
          method: 'PUT',
          url: 'lists/1/items/*',
          response: 'fixture:item.json'
        }).as('getItems');
        cy.load_items('GET', 'items2.json');

        cy.get('button[name="edit_button"]').eq(0).click();
      });

      it('really add item', () => {
        cy.get('tr').eq(2).children('td').eq(1)
          .should('contain', 'pantalones');
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

      cy.get('tr').eq(2).children('td').eq(3)
        .click();
      cy.wait(['@deleteItem']);
    });

    it('check table', () => {
      cy.get('tr').eq(2).children('td').eq(1)
        .should('contain', 'gtx 1080ti');
    });
  });

  describe('check votes', () => {
    describe('check correct icon', () => {
      it('empty star if user dont vote', () => {
        cy.get('tr').eq(2).children('td').eq(0)
          .children('img')
          .should('have.attr', 'src')
          .should('include', 'assets/4c1e1c1f9c65da32586325a5072cb501.png');
      });
      it('filled star if user vote', () => {
        cy.get('tr').eq(3).children('td').eq(0)
          .children('img')
          .should('have.attr', 'src')
          .should('include', 'assets/98b190b78518f0f397b1df8d360aae1a.png');
      });
    });

    describe('if filled star call delete vote', () => {
      beforeEach(() => {
        cy.route({
          method: 'DELETE',
          url: 'lists/1/items/28/votes/3',
          response: 'fixture:items.json'
        }).as('deleteItems');

        cy.get('tr').eq(2).children('td').eq(0)
          .click();
      });


      it('correct call', () => {
        cy.wait(['@deleteItems']);
      });
    });

    describe('if empty star call create vote', () => {
      beforeEach(() => {
        cy.route({
          method: 'POST',
          url: 'lists/1/items/29/votes',
          response: 'fixture:items.json'
        }).as('createItems');

        cy.get('tr').eq(3).children('td').eq(0)
          .click();
      });

      it('correct call', () => {
        cy.wait(['@createItems']);
      });
    });
  });
});
