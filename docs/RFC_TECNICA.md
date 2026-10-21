# 📋 RFC 001: Arquitetura Técnica do Gym Tracker

## 1. Visão Geral da Arquitetura

O **Gym Tracker** é uma aplicação Web estática *Mobile-First* desenvolvida com **React 19**, **Vite 8**, **Tailwind CSS v4** e suporte completo a **PWA (Progressive Web App)**, projetada especificamente para hospedar no **GitHub Pages** sem necessidade de backend ou infraestrutura de banco de dados centralizado.

### Diagrama da Solução

```mermaid
graph TD
    Client["Navegador Mobile (iOS / Android / PWA)"] --> |Lê assets estáticos| GHPages["GitHub Pages CDN"]
    Client --> |Cache Offline / Stale-While-Revalidate| SW["Service Worker (sw.js)"]
    Client --> |Persistência Local (Perfis, Fichas, Séries, Histórico)| Storage["LocalStorage (Client-Side)"]
    Dev["Desenvolvedor"] --> |Push na branch main| Actions["GitHub Actions (.github/workflows/deploy.yml)"]
    Actions --> |Testes + Build Estático (dist/)| GHPages
```

---

## 2. Estratégia de Persistência (Local State)

A persistência opera inteiramente no cliente via chaves namespaceadas no `localStorage`, isolando o estado dos dois perfis:

### Chaves de Armazenamento

| Chave | Tipo | Descrição |
|---|---|---|
| `gym_active_profile` | `'perfil-1' \| 'perfil-2'` | Perfil atualmente selecionado na interface |
| `gym_workout_logs` | `WorkoutLog[]` | Histórico global de conclusões de treino |
| `gym_progress_perfil-1_dia-a` | `WorkoutProgress` | Séries marcadas e cargas anotadas na sessão ativa |
| `gym_progress_perfil-2_dia-a` | `WorkoutProgress` | Idem para o Perfil 2 |

### Modelagem do JSON no LocalStorage

```json
// gym_workout_logs
[
  {
    "id": "1730000000000-a8x9z",
    "profileId": "perfil-1",
    "workoutDayId": "dia-a",
    "completedAt": "2026-10-21T14:30:00.000Z"
  }
]

// gym_progress_perfil-1_dia-a
{
  "p1-a1": {
    "completedSets": [0, 1, 2, 3],
    "loadKg": 60
  },
  "p1-a2": {
    "completedSets": [0, 1]
  }
}
```

- **Resiliência:** Tratamento com `safeGetItem` e `safeSetItem` com fallback para evitar exceções em modo anônimo ou falhas de cota.
- **Isolamento:** Trocar de perfil restaura instantaneamente as séries em andamento e o histórico daquele usuário sem colisão de IDs.

---

## 3. Estrutura de Componentes (React)

```
src/
├── types/
│   └── workout.ts             # Interfaces tipadas (Profile, WorkoutDay, Exercise, WorkoutLog)
├── data/
│   ├── workouts.ts            # Fichas completas Aluno 1 e Aluna 2 (docs/treinos.md)
│   └── workouts.test.ts       # Testes de integridade dos dados
├── domain/
│   ├── workoutTracker.ts      # Regras de negócio puras (contadores mês/total, toggle de série)
│   └── workoutTracker.test.ts # Testes unitários com Vitest (TDD)
├── hooks/
│   ├── storageService.ts      # Camada de I/O de persistência LocalStorage
│   ├── useWorkoutStorage.test.ts # Testes de persistência
│   └── useWorkoutTracker.ts   # Custom hook unificado de estado e ações
├── components/
│   ├── Header.tsx             # Switcher de perfis (Hipertrofia vs Recomposição), histórico e equipamentos
│   ├── DaySelector.tsx        # Fichas (Dia A, Dia B, Dia C) com badges de frequência mensal
│   ├── ExerciseCard.tsx       # Exercício com bubbles de séries interativas, carga e observações
│   ├── RestTimer.tsx          # Cronômetro flutuante de descanso com vibração e presets
│   ├── DemoModal.tsx          # Modal com orientação técnica e busca direta de GIF/vídeo
│   ├── HistoryModal.tsx       # Lista de sessões finalizadas com opção de exclusão
│   ├── EquipmentModal.tsx     # Lista dos aparelhos identificados na academia
│   └── WorkoutSummaryModal.tsx # Celebração pós-treino com estatísticas atualizadas
├── App.tsx                    # Orquestrador da aplicação
└── main.tsx                   # Ponto de entrada e registro do Service Worker
```

---

## 4. Estratégia de Deploy no GitHub Pages

O deploy automatizado está configurado em `.github/workflows/deploy.yml`:

1. Disparo a cada `git push` na branch `main`.
2. Execução dos testes automatizados via `npm run test` (Vitest).
3. Compilação estática via `npm run build` (`tsc -b && vite build`) com `base: './'` configurado em `vite.config.ts`.
4. Upload do diretório `dist/` gerado via `actions/upload-pages-artifact@v3`.
5. Publicação no domínio do GitHub Pages (`https://<usuario>.github.io/<repo>/`) via `actions/deploy-pages@v4`.
