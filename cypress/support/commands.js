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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }
// Cypress.Commands.add('login', (email, password) => {
//     cy.get('[data-test=email]').type(email)
//     cy.get('[data-test=passwd]').type(password)
//     cy.get('.btn').click()
// })
Cypress.Commands.add('login', (email, pass) => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get('[data-test=email]').type(email)
    cy.get('[data-test=passwd]').type(pass)
    cy.get('.btn').click()
})
Cypress.Commands.add('getToken', (email, senha) => {
    cy.request({
            method: "Post",
            url: "/signin",
            body: { email, senha}
        }).its('body.token').should('not.be.empty').then(token => token)
})
Cypress.Commands.add('resetRest', (token) => {
    cy.request({
            method: "GET",
            url: "/reset",
            headers: {Authorization: `JWT ${token}`},
        }).its('status').should('be.equal', 200)
})
Cypress.Commands.add('resetSite', () => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/reset"]').click()
})
Cypress.Commands.add('createAccount', (name) => {
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()
    cy.get('[data-test=nome]').type(name)
    cy.wait(3000)
    cy.get('.btn').click()
})
Cypress.Commands.add('createTransaction', (conta, description, valor, inter) => {
    cy.get('[data-test=menu-movimentacao] > .fas').click()
    cy.get('[data-test=descricao]').type(description)
    cy.get('[data-test=valor]').focus()
    cy.get('[data-test=valor]').type(valor)
    cy.get('[data-test=envolvido]').focus()
    cy.get('[data-test=envolvido]').type(inter)
    cy.get('[data-test=conta]').focus()
    cy.get('[data-test=conta]').select(conta)
    cy.get('[data-test=status]').focus()
    cy.get('[data-test=status]').click()
    cy.get('.btn-primary').click()
})
