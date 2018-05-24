// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('load_user', (method, user) => {
  cy.server();
  cy.route({
    method,
    url: 'users/*',
    response: `fixture:${user}`
  }).as('getUser');
});

Cypress.Commands.add('load_lists', (method, list) => {
  cy.server();
  cy.route({
    method,
    url: 'lists*',
    response: `fixture:${list}`
  }).as('getLists');
});

Cypress.Commands.add('calls', (method, urlValue, responseValue) => {
  cy.server();
  cy.route({
    method,
    url: urlValue,
    response: responseValue
  });
});
