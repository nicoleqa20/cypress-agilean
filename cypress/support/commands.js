Cypress.Commands.add('login', () => {
  cy.fixture('usuario').then((usuario) => {
    cy.visit('/');
    cy.get('[data-cy="input-email-login"]').type(usuario.email);
    cy.get('[data-cy="input-senha-login"]').type(usuario.senha);
    cy.get('[data-cy="btn-entrar"]').click();
  });
});

Cypress.Commands.add('cadastrarAtividade', () => {
  const timestamp = Date.now();
  const responsavel = `Responsável ${timestamp}`;
  const email = `responsavel${timestamp}@teste.com`;

  cy.get('[data-cy="btn-cadastrar-atividade"]').click();
  cy.get('[data-cy="modal-atividade-status"]').select('Não Iniciada');
  cy.get('[data-cy="modal-atividade-prioridade"]').select('Baixa');
  cy.get('[data-cy="modal-atividade-nome"]').type(`Teste automatizado ${timestamp}`);
  cy.get('[data-cy="modal-atividade-btn-novo-responsavel"]').click();
  cy.get('[data-cy="modal-responsavel-nome"]').type(responsavel);
  cy.get('[data-cy="modal-responsavel-email"]').type(email);
  cy.get('[data-cy="modal-responsavel-telefone"]').type('(11) 99999-9999');
  cy.get('[data-cy="modal-responsavel-btn-salvar"]').click();
  cy.get('[data-cy="modal-atividade-responsavel"]').select(responsavel);
  cy.get('[data-cy="modal-atividade-prazo"]').type('2026-12-31');
  cy.get('[data-cy="modal-atividade-btn-salvar"]').click();

  cy.wrap(`Teste automatizado ${timestamp}`).as('nomeAtividade');
});