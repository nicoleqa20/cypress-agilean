describe('Cadastro de Responsável', () => {

  beforeEach(() => {
    cy.login();
  });

  /**
   * CT05 - Cadastro de responsável
   * Verifica que é possível cadastrar um responsável com sucesso
   * CT06 - Telefone fora do formato
   * CT08 - Salvar sem preencher campos obrigatórios
   * Verifica que o formulário não salva sem campos obrigatórios
   * BUG: sistema aceita telefone sem validar o formato
   */
  it('deve cadastrar um responsável com sucesso', () => {
    const timestamp = Date.now();
    const responsavel = `Responsável ${timestamp}`;
    const email = `responsavel${timestamp}@teste.com`;

    cy.get('[data-cy="btn-cadastrar-atividade"]').click();
    cy.get('[data-cy="modal-atividade-btn-novo-responsavel"]').click();

    // CT08 - Tenta salvar sem preencher — modal deve permanecer aberto
    cy.get('[data-cy="modal-responsavel-btn-salvar"]').click();
    cy.get('[data-cy="modal-responsavel-nome"]').should('be.visible');

    // CT06 - Tenta salvar com telefone fora do formato
    cy.get('[data-cy="modal-responsavel-nome"]').type(responsavel);
    cy.get('[data-cy="modal-responsavel-email"]').type(email);
    cy.get('[data-cy="modal-responsavel-telefone"]').type('123');
    // Sistema permite salvar telefone com formato inválido
    cy.get('[data-cy="modal-responsavel-btn-salvar"]').click();

    cy.get('[data-cy="modal-atividade-responsavel"]').select(responsavel);
    cy.get('[data-cy="modal-atividade-status"]').select('Não Iniciada');
    cy.get('[data-cy="modal-atividade-prioridade"]').select('Alta');
    cy.get('[data-cy="modal-atividade-nome"]').type(`Teste automatizado ${timestamp}`);
    cy.get('[data-cy="modal-atividade-prazo"]').type('2026-12-31');
    cy.get('[data-cy="modal-atividade-btn-salvar"]').click();

    cy.contains(`Teste automatizado ${timestamp}`).should('be.visible');
  });

});