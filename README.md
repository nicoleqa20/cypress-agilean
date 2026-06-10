# Cypress - Agilean QA Test

Suíte de testes automatizados para o Gerenciador de Atividades da Agilean, desenvolvida com Cypress como parte do teste técnico para a vaga de QA.

## Pré-requisitos

- Node.js instalado
- npm instalado

## Instalação

```bash
git clone <url-do-repositorio>
cd cypress-agilean
npm install
```

## Execução

### Interface visual (recomendado)
```bash
npx cypress open
```

### Terminal (headless)
```bash
npx cypress run
```

## Cenários automatizados

| Arquivo | CTs cobertos | Descrição |
|---|---|---|
| 01_cadastro_atividade.cy.js | CT01, CT02 | Cadastro de atividade com validação de campos obrigatórios |
| 02_cadastro_responsavel.cy.js | CT05, CT06, CT08 | Cadastro de responsável com validações |
| 03_menu_acoes.cy.js | CT10, CT11, CT12 | Editar, duplicar e excluir atividades |
| 04_status_tabela.cy.js | CT13 | Alteração de status pelo dropdown da tabela |
| 05_rejeicao_atividade.cy.js | CT14, CT15 | Rejeição de atividade pelo dropdown e pelo modal |
| 06_cards_cabecalho.cy.js | CT16, CT17 | Atualização dos cards do cabeçalho |
| 07_logout.cy.js | CT19 | Encerramento de sessão |

## Testes que evidenciam bugs

Os seguintes testes foram escritos para **falhar intencionalmente**, evidenciando bugs documentados no plano de testes manual:

- **CT13** — Defasagem na atualização de status pelo dropdown da tabela
- **CT14** — Status "Rejeitada" não atualiza ao confirmar pelo dropdown da tabela
- **CT17** — Card de resolvidas não atualiza imediatamente ao alterar status

## Decisões técnicas

- Seletores baseados em `data-cy` para maior estabilidade
- Dados dinâmicos com `Date.now()` para evitar conflitos entre execuções
- Comando customizado `cy.login()` e `cy.cadastrarAtividade()` para reuso
- Arquivos numerados para garantir ordem de execução
- Ferramenta de evidência: **Jam.dev** (gravação de tela + console + rede)