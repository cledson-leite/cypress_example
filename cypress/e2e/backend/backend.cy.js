/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';


describe('Backend tests', () => {
  let token;
  const nome = faker.lorem.sentence(2)

    before(() => {
      cy.getToken('csbetsonline@gmail.com', 'P455w0rd')
        .then(resp => { token = resp})
    })
    beforeEach(() => {
      cy.resetRest(token)
    })

  it('Should create an account', () => {
    cy.request({
            url: "/contas",
            headers: {Authorization: `JWT ${token}`},
            method: 'Post',
            body: {nome}
          }).as('response')
    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', nome)
    })
  })

  it('Should update an account', () => {
    cy.request({
            url: "/contas",
            headers: {Authorization: `JWT ${token}`},
            method: 'Get',
            qs: {nome: 'Conta para alterar'}
          })
        .then(resp => {
            cy.request({
            url: `/contas/${resp.body[0].id}`,
            headers: {Authorization: `JWT ${token}`},
            method: 'PUT',
            body: {nome}
            }).as('response')
        })
    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(200)
      expect(res.body).to.have.property('nome', nome)
    })
  })

  it('Should create an repeated account', () => {
     cy.request({
            url: "/contas",
            headers: {Authorization: `JWT ${token}`},
            method: 'Post',
            body: {nome: "Conta mesmo nome"},
            failOnStatusCode: false
          }).as('response')
    cy.get('@response').then( res => {
      expect(res.status).to.be.equal(400)
      expect(res.body).to.have.property('error', "Já existe uma conta com esse nome!")
    })
  })

  it('Should create an transaction', () => {
    
  })

  it('Should check the balance', () => {
    
  })

  it('Should delete transaction', () => {
    
  })
});
