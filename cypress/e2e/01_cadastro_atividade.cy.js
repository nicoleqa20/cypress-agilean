describe('Cadastro de Atividade', () => {

  beforeEach(() => {
    cy.login();
  });

  /**
   * CT01/CT02 - Cadastro de atividade
   * Verifica que o formulário não salva sem campos obrigatórios
   * e que após preencher corretamente a atividade é cadastrada
   *
   * Observação: ao cadastrar um novo responsável, o sistema deveria
   * selecioná-lo automaticamente no campo Responsável, conforme especificado,
   * mas esse comportamento não ocorre — é necessário selecionar manualmente
   */
  it('deve cadastrar uma atividade com sucesso', () => {
    const timestamp = Date.now();
    const responsavel = `Responsável ${timestamp}`;
    const email = `responsavel${timestamp}@teste.com`;

    cy.get('[data-cy="btn-cadastrar-atividade"]').click();

    // Tenta salvar sem preencher — modal deve permanecer aberto
    cy.get('[data-cy="modal-atividade-btn-salvar"]').click();
    cy.get('[data-cy="modal-atividade-nome"]').should('be.visible');

    // Preenche os campos
    cy.get('[data-cy="modal-atividade-status"]').select('Não Iniciada');
    cy.get('[data-cy="modal-atividade-prioridade"]').select('Alta');
    cy.get('[data-cy="modal-atividade-nome"]').type(`Teste automatizado ${timestamp}`);

    // Cadastra responsável dinâmico
    cy.get('[data-cy="modal-atividade-btn-novo-responsavel"]').click();
    cy.get('[data-cy="modal-responsavel-nome"]').type(responsavel);
    cy.get('[data-cy="modal-responsavel-email"]').type(email);
    cy.get('[data-cy="modal-responsavel-telefone"]').type('(11) 99999-9999');
    cy.get('[data-cy="modal-responsavel-btn-salvar"]').click();

    // Seleciona manualmente pois o sistema não preenche automaticamente
    cy.get('[data-cy="modal-atividade-responsavel"]').select(responsavel);
    cy.get('[data-cy="modal-atividade-prazo"]').type('2026-12-31');
    cy.get('[data-cy="modal-atividade-btn-salvar"]').click();

    cy.contains(`Teste automatizado ${timestamp}`).should('be.visible');
  });

});