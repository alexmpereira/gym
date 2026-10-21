# Diário de Aprendizado do Projeto

## 2026-10-21 · Rolldown e Oxlint exigem pacote de binding explícito no macOS arm64

- **Gatilho:** ambiente / ferramenta
- **O que aconteceu:** `npm run test` e `npm run lint` falham com `Cannot find native binding` devido a bug de dependências opcionais do npm.
- **Causa:** No macOS Apple Silicon (arm64), o npm 10.7 omite o download automático dos binários de rolldown e oxlint.
- **Regra prática:** Instalar explicitamente `@rolldown/binding-darwin-arm64` e `@oxlint/binding-darwin-arm64` nas `devDependencies`.
- **Evidência:** [package.json](file:///Users/alexmorgado/Documents/Server/gym/package.json#L28-L29)
- **Vence quando:** O npm resolver o issue #4828 ou o ambiente migrar para Node 22+.
