describe('Status via Tabela', () => {

  beforeEach(() => {
    cy.login();
  });

  /**
   * CT13 - Status via tabela
   * Verifica se o badge atualiza ao trocar o status pelo dropdown da tabela
   * BUG: deve falhar por bug de defasagem
   */
  it('deve atualizar o badge ao trocar o status na tabela', () => {
    // Confirma badge inicial
    cy.get('[data-cy="badge-status-não-iniciada"]').first().should('be.visible');

    // Altera status pelo dropdown da tabela
    cy.get('[data-cy="status-dropdown-0"]').select('Em Andamento');

    // Deve falhar — bug de defasagem
    cy.get('[data-cy="badge-status-em-andamento"]').should('be.visible');
  });

});
