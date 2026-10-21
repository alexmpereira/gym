# 🏋️ Gym Tracker · Fichas de Treino & Séries

Web App estático *Mobile-First* e PWA para acompanhamento de treinos de musculação, tracker de séries, cronômetro de descanso e contadores de frequência para dois perfis de treino personalizados (Hipertrofia e Recomposição/Definição).

Desenvolvido para hospedar no **GitHub Pages** sem dependência de backend.

---

## 📱 Funcionalidades

- **Dois Perfis Independentes**:
  - **Aluno 1 (Hipertrofia - 3x/semana - ABC)**: Peito/Ombro/Tríceps, Costas/Bíceps/Abdômen, Pernas Completas. Descanso: 90s a 120s.
  - **Aluna 2 (Recomposição & Definição - 3x/semana - FullBody Misto)**: Inferiores com bi-sets, Superior/Core/HIIT, Cadeia Posterior/Glúteos. Descanso: 60s a 90s.
- **Tracker de Séries Interativo**: Botões numerados por série que marcam a conclusão e calculam o percentual do treino em tempo real.
- **Registro de Cargas (kg)**: Campo rápido para anotar o peso utilizado em cada exercício.
- **Demonstrações de Exercícios**: Modal com orientações de postura e link direto para ver o GIF ou vídeo da execução correta no YouTube.
- **Cronômetro de Descanso Integrado**: Timer flutuante com progresso visual, botões de +30s e vibração ao término.
- **Contadores de Frequência**: Visualização de quantas vezes a ficha foi concluída no mês corrente e no histórico total.
- **Histórico & Desfazer**: Registro de data/hora de cada conclusão com possibilidade de exclusão.
- **PWA Instalável**: Suporte a tela inicial no iOS/Android, tema escuro nativo e cache offline via Service Worker.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v20+ ou v22+)
- npm

### Instalação
```bash
npm install
```

### Ambiente de Desenvolvimento
```bash
npm run dev
```
Abra o navegador em `http://localhost:5173`.

### Executar Testes
```bash
npm run test
```

### Gerar Build de Produção
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `dist/`.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Ícones modernos)
- **Canvas Confetti** (Feedback visual)
- **Vitest** (Testes unitários)
- **GitHub Actions** (Deploy contínuo no GitHub Pages)

---

## 📄 Documentação

- [docs/rfc.md](file:///Users/alexmorgado/Documents/Server/gym/docs/rfc.md): Prompt original de requisitos
- [docs/RFC_TECNICA.md](file:///Users/alexmorgado/Documents/Server/gym/docs/RFC_TECNICA.md): RFC de arquitetura técnica e persistência
- [docs/treinos.md](file:///Users/alexmorgado/Documents/Server/gym/docs/treinos.md): Fichas e exercícios detalhados
