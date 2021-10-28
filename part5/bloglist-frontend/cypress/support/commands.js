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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then((res) => {
    localStorage.setItem("blogUser", JSON.stringify(res.body));
  });
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("createBlog", function () {
  cy.contains("create new blog").click();
  cy.get("#title-field").type("tester blog :)");
  cy.get("#url-field").type("www.dontcomehere.net");
  cy.contains("save blog").click();
});

Cypress.Commands.add("createManyBlogs", function () {
  cy.contains("create new blog").click();
  cy.get("#title-field").type("tester blog :)");
  cy.get("#url-field").type("www.dontcomehere.net");
  cy.contains("save blog").click();

  cy.contains("create new blog").click();
  cy.get("#title-field").type("another blog :)");
  cy.get("#url-field").type("www.yup.net");
  cy.contains("save blog").click();

  cy.contains("create new blog").click();
  cy.get("#title-field").type("another one here :)");
  cy.get("#url-field").type("www.nope.net");
  cy.contains("save blog").click();

  cy.contains("create new blog").click();
  cy.get("#title-field").type("another blog here :-:");
  cy.get("#url-field").type("www.onemore.net");
  cy.contains("save blog").click();
});
