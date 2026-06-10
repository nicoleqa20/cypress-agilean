describe('Cards do Cabeçalho', () => {

  beforeEach(() => {
    cy.login();
  });

  /**
   * CT16 - Cards do cabeçalho
   * Verifica que ao cadastrar uma atividade o card de cadastradas é atualizado.
   *
   * Observação:
   * O dashboard renderiza inicialmente os cards com valor 0 antes do
   * carregamento completo dos dados. Por isso, o teste aguarda a exibição
   * de um valor válido antes de capturar a quantidade inicial.
   */
  it('deve atualizar o card de cadastradas ao cadastrar uma atividade', () => {

    // Aguarda o carregamento do valor real do card
    cy.get('[data-cy="card-cadastradas"] .text-\\[28px\\]')
      .should(($el) => {
        expect(Number($el.text().trim())).to.be.greaterThan(0);
      })
      .invoke('text')
      .then((textoAntes) => {

        const totalAntes = Number(textoAntes.trim());

        cy.log(`VALOR INICIAL: ${totalAntes}`);

        // Cadastra uma nova atividade
        cy.cadastrarAtividade();

        // Aguarda a atualização do card
        cy.get('[data-cy="card-cadastradas"] .text-\\[28px\\]')
          .should(($el) => {
            const totalDepois = Number($el.text().trim());

            expect(totalDepois).to.eq(totalAntes + 1);
          });

      });

  });


  /**
   * CT17 - Cards do cabeçalho
   * BUG: card de resolvidas não atualiza imediatamente ao alterar status
   */
  it('deve atualizar o card de resolvidas ao alterar status', () => {
  // Garante que a primeira atividade está em Não Iniciada antes de testar
  cy.get('[data-cy="status-dropdown-0"]').select('Não Iniciada');

  cy.get('[data-cy="card-resolvidas"]').find('p').last().invoke('text').then((totalAntes) => {
    cy.get('[data-cy="status-dropdown-0"]').select('Resolvida');

    // Deve falhar — bug de defasagem, card não atualiza imediatamente
    cy.get('[data-cy="card-resolvidas"]').find('p').last()
      .should('have.text', String(Number(totalAntes) + 1));
  });
});

});