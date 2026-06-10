describe('Menu de Ações', () => {

  beforeEach(() => {
    cy.login();
  });

  /**
   * CT10 - Editar atividade
   */
  it('deve editar uma atividade com sucesso', () => {
    cy.get('[data-cy="atividade-0-btn-menu"]').click();
    cy.get('[data-cy="atividade-0-btn-editar"]').click();
    cy.get('[data-cy="modal-atividade-nome"]').clear().type('Atividade editada');
    cy.get('[data-cy="modal-atividade-prazo"]').type('2026-12-31');
    cy.get('[data-cy="modal-atividade-btn-salvar"]').click();
    cy.contains('Atividade editada').should('be.visible');
  });

  /**
   * CT11 - Duplicar atividade
   */
  it('deve duplicar uma atividade com sucesso', () => {
    cy.get('[data-cy="atividade-0-btn-menu"]').click();
    cy.get('[data-cy="atividade-0-btn-duplicar"]').click();
    cy.get('[data-cy="badge-status-não-iniciada"]').should('be.visible');
  });

  /**
   * CT12 - Excluir atividade
   */
  it('deve excluir uma atividade com sucesso', () => {
  // Conta quantas atividades existem antes
  cy.get('[data-cy^="atividade-"][data-cy$="-btn-menu"]').then((itens) => {
    const totalAntes = itens.length;

    cy.get('[data-cy="atividade-0-btn-menu"]').click();
    cy.get('[data-cy="atividade-0-btn-excluir"]').click();

    // Confirma que o total diminuiu em 1
    cy.get('[data-cy^="atividade-"][data-cy$="-btn-menu"]')
      .should('have.length', totalAntes - 1);
  });
})

});