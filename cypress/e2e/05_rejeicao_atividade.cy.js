describe('Rejeição de Atividade', () => {

  beforeEach(() => {
  cy.login();
  // Aguarda a tabela carregar antes de cada teste
  cy.get('[data-cy="card-cadastradas"]').should('be.visible');
});

/**
 * CT14 - Rejeitar atividade pelo dropdown da tabela
 * BUG: status não atualiza após confirmar o motivo
 * Este teste deve FALHAR — evidencia o bug documentado
 */
it('deve rejeitar uma atividade pelo dropdown da tabela', () => {
  // Conta quantos badges rejeitada existem antes
  cy.get('[data-cy="badge-status-rejeitada"]').then(($badges) => {
    const totalAntes = $badges.length;

    cy.get('[data-cy^="status-dropdown-"]').eq(1).select('Rejeitada');
    cy.get('[data-cy="modal-rejeicao"]').should('be.visible');
    cy.get('[data-cy="modal-rejeicao-motivo"]').type('Motivo de rejeição teste');
    cy.get('[data-cy="modal-rejeicao-btn-confirmar"]').click();

    // Deve falhar — badge não aumenta por causa do bug
    cy.get('[data-cy="badge-status-rejeitada"]')
      .should('have.length', totalAntes + 1);
  });
});

/**
 * CT15 - Rejeitar atividade pelo modal de edição
 * Verifica que ao selecionar Rejeitada no modal de edição
 * o status é atualizado corretamente após confirmar o motivo
 */
it('deve rejeitar uma atividade pelo modal de edição', () => {
  // Aguarda a tabela ter pelo menos uma atividade
  cy.get('[data-cy^="atividade-"][data-cy$="-btn-menu"]').first().should('be.visible');
  cy.get('[data-cy^="atividade-"][data-cy$="-btn-menu"]').first().click();
  cy.get('[data-cy^="atividade-"][data-cy$="-btn-editar"]').first().should('be.visible').click();
  cy.get('[data-cy="modal-atividade-status"]')
  .select('Rejeitada')
  .trigger('change');
  cy.get('[data-cy="modal-rejeicao"]').should('be.visible');
  cy.get('[data-cy="modal-rejeicao-motivo"]').type('Motivo de rejeição teste');
  cy.get('[data-cy="modal-rejeicao-btn-confirmar"]').click();
  cy.get('[data-cy="modal-atividade-prazo"]').type('2026-12-31');
  cy.get('[data-cy="modal-atividade-btn-salvar"]').click();
  cy.get('[data-cy="badge-status-rejeitada"]').should('be.visible');
});

});

