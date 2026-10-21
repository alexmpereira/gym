Você é um Engenheiro de Software Sênior e especialista em Arquitetura Frontend (React, Vite, Tailwind CSS e PWA).

<objetivo>
Criar um Documento de Análise Técnica (RFC - Request for Comments) para o desenvolvimento de um Web App estático "Mobile-First" de acompanhamento de treinos. O app será hospedado no GitHub Pages e servirá para listar as fichas de musculação de dois usuários distintos.
</objetivo>

<contexto_tecnico_e_limitacoes>
- Hospedagem: GitHub Pages (apenas arquivos estáticos).
- Stack Recomendada: ReactJS com Vite, estilização com Tailwind CSS (focado em uma UI/UX elegante, escura e minimalista para celular) e ícones/gifs otimizados.
- Persistência de Dados: Como não teremos backend, o estado dos botões de "Treino Concluído" e o "Contador de Séries/Treinos" devem ser persistidos no client-side (LocalStorage ou IndexedDB) com uso de React Hooks customizados.
- PWA: O app deve poder ser "instalado" na tela inicial do iOS/Android (manifest.json) para parecer um app nativo.
</contexto_tecnico_e_limitacoes>

<requisitos_do_produto>
1. Tela de Seleção de Usuário: Um seletor inicial para escolher entre "Perfil 1 (Foco: Hipertrofia)" e "Perfil 2 (Foco: Recomposição)".
2. Listagem de Fichas: Para o usuário selecionado, exibir os dias de treino (Dia A, Dia B, Dia C).
3. Detalhe do Treino: Uma interface limpa mostrando a lista de exercícios, séries, repetições e um botão expansível ou modal com o GIF do movimento.
4. Tracker (O Contador):
   - Um botão "Completar Treino" no final de cada ficha.
   - Um contador visual que mostre quantas vezes aquele treino específico já foi realizado no mês/histórico.
   - Estado persistido localmente no aparelho.
</requisitos_do_produto>

<estrutura_do_rfc>
Gere um arquivo técnico Markdown contendo as seguintes seções:
1. Visão Geral da Arquitetura: Desenho da solução estática para o GitHub Pages.
2. Estratégia de Persistência (Local State): Como modelar o JSON no LocalStorage para rastrear os treinos finalizados dos dois perfis sem perder dados ao recarregar a página.
3. Sugestão de Estrutura de Componentes (React): A árvore de componentes proposta.
4. Estratégia de Deploy: O fluxo básico para gerar o `build` no Vite e publicar na branch `gh-pages` usando GitHub Actions.
</estrutura_do_rfc>