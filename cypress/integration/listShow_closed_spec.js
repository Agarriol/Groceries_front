describe('showListClosed', () => {
  beforeEach(() => {
    cy.load_user('GET', 'user.json');
    cy.server();
    cy.load_list('GET', 'list2_closed.json');
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

  describe('not add item', () => {
    describe('with correct data', () => {

      it('really add item', () => {
        cy.get('input[name="newName"]').should('not.exist');
        cy.get('input[name="newPrice"]').should('not.exist');
        cy.get('button[name="save_button"]').should('not.exist');
      });
    });
  });

  describe('not edit data', () => {
    beforeEach(() => {
      cy.get('tr').eq(2).children('td').eq(2)
        .click();
    });

    it('really add item', () => {
      cy.get('input[name="editName"]').should('not.exist');
      cy.get('input[name="editPrice"]').should('not.exist');
      cy.get('button[name="edit_button"]').should('not.exist');
    });
  });

  describe('dont exist delete button', () => {
    it('check table', () => {
      cy.get('button[name="delete_button"]').should('not.exist');
    });
  });

  describe('cant vote', () => {
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

    describe('not change icon', () => {
      beforeEach(() => {
        cy.get('tr').eq(2).children('td').eq(0)
          .click();
      });

      it('correct call', () => {
        cy.get('tr').eq(2).children('td').eq(0)
          .children('img')
          .should('have.attr', 'src')
          .should('include', 'assets/4c1e1c1f9c65da32586325a5072cb501.png');
      });
    });
  });
});
