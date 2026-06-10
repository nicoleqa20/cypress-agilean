describe('Logout', () => {

  /**
   * Antes de cada teste, realiza o login na aplicação
   * utilizando o comando customizado definido em commands.js
   */
  beforeEach(() => {
    cy.login();
  });

  /**
 * CT19 - Logout
 * Verifica que ao clicar em "Sair" a sessão é encerrada
 * e a tela de login é exibida novamente
 */
it('deve encerrar a sessão ao clicar em Sair', () => {
  cy.get('[data-cy="card-cadastradas"]').should('be.visible');
  cy.get('[data-cy="btn-logout"]').click();
  cy.get('[data-cy="modal-auth"]').should('be.visible');
});

});