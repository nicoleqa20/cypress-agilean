const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://cadastro-atividades-qa-teste.vercel.app",
    watchForFileChanges: false,
  },
});