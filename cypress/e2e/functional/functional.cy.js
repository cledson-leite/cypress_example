/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';


describe('Functional tests', () => {
    //TODO criar comandos
    before(() => {
      cy.visit('https://barrigareact.wcaquino.me')
      cy.login('csbetsonline@gmail.com', 'P455w0rd')
    })
    beforeEach(() => {
      cy.resetSite()
    })

  it('Should create an account', () => {
    const conta = 'Nova conta'
    cy.createAccount(conta)    
    cy.get('.toast').should('exist').and('contain.text', 'sucesso' )
    cy.contains('Nova conta').should('exist')
  })

  it('Should update an account', () => {
    const conta = 'Conta alterada'
    cy.createAccount('Nova conta')
    cy.wait(1000)
    cy.xpath("//table//td[contains(., 'Nova conta')]//..//a[1]").click()
    cy.createAccount(conta)
    cy.contains(conta).should('exist')
  })

  it('Should create an repeated account', () => {
    const conta = 'Conta repetida'
    cy.createAccount(conta)    
    cy.wait(500)
    cy.createAccount(conta)
    cy.get('.toast-error').should('exist').and('contain.text', '400' )
  })

  it('Should create an transaction', () => {
    const conta = 'Nova conta'
    const desc = faker.lorem.sentence(5)
    const inter = faker.lorem.sentence(5)
    const valor = faker.number.int({min: 1, max: 1000})
    cy.createAccount(conta)    
    cy.wait(500)
    cy.createTransaction(conta, desc, valor, inter)
    cy.contains(desc).should('exist')
  })

  it('Should check the balance', () => {
    const conta = 'Nova conta'
    const desc = faker.lorem.sentence(5)
    const inter = faker.lorem.sentence(5)
    const valor = faker.number.int({min: 1, max: 1000})
    cy.createAccount(conta)    
    cy.wait(500)
    cy.createTransaction(conta, desc, valor, inter)
    cy.get('[data-test=menu-home] > .fas').click()
    cy.contains(valor).should('exist')
  })

  it('Should delete transaction', () => {
    const conta = 'Nova conta'
    const desc = faker.lorem.sentence(5)
    const inter = faker.lorem.sentence(5)
    const valor = faker.number.int({min: 1, max: 1000})
    cy.createAccount(conta)    
    cy.wait(500)
    cy.createTransaction(conta, desc, valor, inter)
    cy.contains(valor).should('exist')
    cy.xpath("//li//div[contains(., 'Nova conta')]//a[2]").click()
    cy.contains(valor).should('not.exist')
  })
});
