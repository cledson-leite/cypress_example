/// <reference types="cypress"/>

describe('Functional tests', () => {
    let user;

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        user = {
            name: 'Cledson leite',
            email: 'csbetsonline@gmail.com',
            password: 'P455w0rd',
        }
    })

  it('Should register yourself', () => {
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('.jumbotron > :nth-child(1) > .form-control').type(user.name)
        cy.get('.input-group > .form-control').type(user.email)
        cy.get(':nth-child(3) > .form-control').type(user.password)
        cy.get('.btn').click()
        cy.get('.toast').should('exist').and('contain.text', 'sucesso' )
  })

  it('Should log in', () => {
        cy.get('[data-test=email]').type(user.email)
        cy.get('[data-test=passwd]').type(user.password)
        cy.get('.btn').click()
        cy.get('.toast')
            .should('exist').and('contain.text', 'Bem vindo' )
            .and('contain.text', user.name)
  })
});
