# KNOCKS — Game Design Briefing for Claude Code

> **Objetivo deste documento:** Servir como spec completa para construção via vibe coding com Claude Code. Cada seção deve ser lida como uma instrução direta de implementação.

---

## 1. Visão Geral do Produto

**Nome:** Knocks
**Tagline:** "90 players. 53 spots. Every cut hits different."
**Conceito:** Um jogo mobile de gestão de elenco da NFL inspirado na série Hard Knocks da HBO. O jogador assume o papel de General Manager de uma franquia fictícia de futebol americano e deve montar o roster de 53 jogadores a partir de um elenco de 90, tomando decisões de corte semanais baseadas em estatísticas, relatórios de coaches e narrativa gerada dinamicamente. Após o preseason, o jogo evolui para um modo Dynasty com temporadas completas simuladas.

**Plataforma:** Mobile-first web app (PWA)
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS
**Estado:** MVP — depois, se ganhar tração, migrar para nativo (React Native ou Swift)
**Monetização futura:** Freemium — franquias customizadas, modos narrativos premium, cosmetics

---

## 2. Filosofia Visual

### Princípio central: SEM rostos, SEM simulação visual de jogos

O jogo é **100% baseado em texto, estatísticas e decisões**. Não há sprites de jogadores, não há simulação visual de partidas, não há fotos de pessoas reais ou geradas.

### O que TEM visualmente:
- **Logo do time** do jogador (gerado a partir de templates/SVG com cores escolhidas)
- **Cores do time** aplicadas como tema em toda a UI (primary, secondary, accent)
- **Fotos de ambientação** (stock/free): campos de treino, vestiários, salas de reunião de coaches, estádios vazios, pranchetas táticas, corredores de facilities
- **Tipografia forte** — o texto É o jogo. Headlines dramáticas, formatação estilo jornal/ESPN
- **Cards de jogadores** com nome, posição, número, stats — sem foto, apenas as cores do time e a posição como identidade visual
- **UI estilo app esportivo** — inspiração: ESPN app, The Athletic, Sleeper Fantasy

### Paleta base (dark mode obrigatório como padrão):
- Background: `#0A0A0F` (quase preto)
- Surface: `#16161D`
- Text primary: `#F0F0F0`
- Text secondary: `#8A8A9A`
- Accent: dinâmico (cor primária do time do jogador)
- Danger/Cut: `#E53E3E`
- Success/Keep: `#38A169`

---

## 3. Fluxo do Jogo — Fase por Fase

### FASE 0: Onboarding (1 tela)
1. Tela de boas-vindas com logo KNOCKS
2. "Start Your Franchise" → ir para criação do time

### FASE 1: Criação da Franquia
O jogador define sua franquia fictícia:

**Campos obrigatórios:**
- **Nome da cidade** (texto livre, ex: "Portland", "Austin", "São Paulo")
- **Nome do time** (texto livre, ex: "Fireflies", "Wolves", "Knights")
- **Cor primária** (color picker ou paleta pré-definida com ~16 opções)
- **Cor secundária** (idem)

**Geração automática:**
- Um **logo simples** é gerado combinando um ícone (de uma biblioteca de ~20 ícones temáticos: águia, lobo, raio, escudo, espada, chama, etc.) com as cores escolhidas
- O logo aparece em SVG/CSS, não precisa ser uma imagem complexa
- Preview do visual do time: card de exemplo de jogador + banner com as cores

**Saída:** Objeto `Franchise` salvo no estado global

```typescript
interface Franchise {
  city: string;
  name: string;
  fullName: string; // "Portland Fireflies"
  primaryColor: string;
  secondaryColor: string;
  logoIcon: string; // id do ícone escolhido
}
```

### FASE 2: Geração do Roster Inicial (90 jogadores)

Ao criar a franquia, o sistema gera proceduralmente 90 jogadores fictícios.

**Regras de geração:**

Distribuição por posição (seguir roster real da NFL):
- QB: 4 | RB: 6 | WR: 10 | TE: 5 | OL: 15
- DL: 10 | LB: 10 | CB: 8 | S: 6 | K: 2 | P: 2
- Returners/Special Teams: 12 (multi-position)

**Cada jogador tem:**

```typescript
interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: Position;
  age: number; // 21-34
  experience: number; // 0 (rookie) a 14
  overall: number; // 40-99, hidden from player
  potential: number; // hidden, affects development
  salary: number; // cap hit em milhões
  origin: PlayerOrigin; // "draft_pick" | "free_agent" | "undrafted" | "trade"
  draftRound?: number; // 1-7 or null
  college: string;
  stats: PositionStats; // variam por posição
  traits: string[]; // ex: "team_leader", "injury_prone", "raw_talent", "veteran_presence", "locker_room_cancer"
  coachNotes: CoachNote[]; // comentários narrativos dos coaches
  status: "roster" | "cut" | "injured" | "practice_squad";
  weeklyPerformance: WeeklyPerformance[]; // atualizado a cada semana
}

interface CoachNote {
  week: number;
  coach: string; // "Head Coach", "OC", "DC", "Position Coach"
  sentiment: "positive" | "neutral" | "negative" | "conflicting";
  text: string; // narrativa gerada
}

interface WeeklyPerformance {
  week: number;
  grade: number; // 0-100
  highlights: string[]; // "2 TDs in scrimmage", "Missed 3 blocks"
  trend: "improving" | "steady" | "declining";
}
```

**Distribuição de talento (segue curva realista):**
- ~5 jogadores elite (overall 85-99) — seus "sure starters"
- ~15 jogadores bons (overall 75-84) — starters prováveis
- ~25 jogadores médios (overall 65-74) — disputas acirradas, decisões difíceis
- ~25 jogadores abaixo da média (overall 55-64) — long shots com potencial
- ~20 jogadores fracos (overall 40-54) — cortes óbvios, mas alguns com histórias cativantes

**Nomes:** Gerar com um pool de ~200 primeiros nomes e ~300 sobrenomes americanos variados (diversidade étnica realista). Evitar nomes de jogadores reais da NFL.

**Colleges:** Pool de ~50 universidades reais (Alabama, Ohio State, LSU, Michigan, etc.) + ~10 fictícias menores (para undrafted free agents com narrativas underdog).

### FASE 3: Preseason — O Coração do Jogo (4 semanas)

Cada semana do preseason segue este ciclo:

#### 3.1 Início da Semana: Relatório da Semana
- Tela com header estilo "WEEK 1 — TRAINING CAMP"
- Foto de ambientação (campo de treino)
- Resumo narrativo do que aconteceu nos treinos (2-3 parágrafos)
- Lista de destaques positivos e negativos
- Eventuais lesões

#### 3.2 Consulta ao Staff
- Seção com comentários dos coaches organizados por position group
- Cada coach dá opinião sobre 2-3 jogadores relevantes daquela semana
- Comentários variam em tom: entusiasmado, preocupado, neutro, conflitante
- **O coach pode estar errado** — um comentário positivo sobre um jogador ruim ou vice-versa cria tensão estratégica (baseado em trait "misleading_evaluation")

**Exemplos de comentários de coach:**
```
HC Mike Torres: "Keep an eye on Jenkins. He's been the first one in, 
last one out. That kind of effort earns a spot on my team."

DC Sarah Park: "I love Rodriguez's athleticism, but he's getting 
burned in coverage drills. If he doesn't clean it up by Week 3, 
we have a problem."

OC James Liu: "Honestly? Davis is a better pure passer than Mitchell 
right now. I know Mitchell was our second-round pick, but the tape 
doesn't lie."
```

#### 3.3 Jogo de Preseason (resultado simulado)
- Box score simplificado do jogo da semana
- Performance individual dos jogadores que entraram
- Grades atualizadas
- Narrativa de 2-3 parágrafos sobre o jogo

#### 3.4 Decisão de Cortes
Cada semana, o jogador deve cortar um número específico de jogadores:
- **Semana 1:** Cortar 10 (90 → 80)
- **Semana 2:** Cortar 10 (80 → 70)
- **Semana 3:** Cortar 10 (70 → 60)
- **Semana 4 (Cut Day Final):** Cortar 7 (60 → 53)

**Tela de cortes:**
- Lista de todos os jogadores atuais, filtráveis por posição
- Cada card mostra: Nome, Posição, Idade, Experiência, Stats principais, Trend (↑↓→), Último comentário do coach
- Botão "CUT" em vermelho com confirmação
- Contador: "X/10 cuts made"
- Ao completar todos os cortes: cena narrativa de "Cut Day" — jogadores sendo notificados (texto dramático estilo Hard Knocks)

**Mecânicas de tensão:**
- Alguns jogadores cortados reagem (texto narrativo): choro, raiva, aceitação, pedido de segunda chance
- Mídia reage: "Surprising move by [Team] to cut [Player]"
- Se cortar um jogador com trait "fan_favorite", recebe pressão de torcida (UI notification)
- Se manter um jogador caro com stats ruins, recebe pressão do owner sobre salary cap

#### 3.5 Waiver Wire (entre semanas)
- Após cada rodada de cortes, outros "times" também cortam jogadores
- 3-5 jogadores disponíveis aparecem no waiver wire
- Jogador pode clamar 1 por semana (substitui um cortado ou é adicionado antes do próximo corte)

### FASE 4: Roster Final — 53-Man Roster
- Tela de celebração/revelação do roster final
- Depth chart automático gerado por posição
- Grade geral do time (baseado na soma dos overalls)
- Análise narrativa: pontos fortes, pontos fracos, surpresas
- Comparação com "media expectations"

### FASE 5: Dynasty — A Temporada (post-MVP, mas estruturar dados para suportar)

> **Para o MVP:** Implementar até a Fase 4. A Fase 5 é o roadmap. Mas o modelo de dados DEVE ser projetado para suportá-la desde o início.

Após o 53, o jogo continua com:

**5.1 Temporada Regular (18 semanas simuladas)**
- Sem gameplay visual — apenas resultados simulados semana a semana
- Jogador gerencia: lesões, IR, prática squad, trades, waivers
- Recaps narrativos de cada jogo
- Standings atualizados

**5.2 Playoffs e Super Bowl**
- Se classificar: bracket de playoffs
- Narrativa mais intensa, stakes maiores
- Resultado final da temporada

**5.3 Offseason**
- Salary cap management
- Free agency
- NFL Draft (scouting + draft day)
- Novo preseason começa → loop de dynasty

---

## 4. Modelo de Dados e Estado

### Persistência
- **MVP:** `localStorage` + `JSON` (tudo client-side)
- **Futuro:** Supabase ou similar para sync entre devices e multiplayer

### Estado Global (usar Zustand ou Context API)

```typescript
interface GameState {
  franchise: Franchise;
  roster: Player[];
  cutPlayers: Player[];
  practiceSquad: Player[];
  waiverWire: Player[];
  currentWeek: number; // 0-4 (preseason), 5+ (regular season)
  phase: GamePhase; // "creation" | "preseason" | "roster_reveal" | "regular_season" | "playoffs" | "offseason"
  cutsRequired: number;
  cutsMade: number;
  weekEvents: WeekEvent[];
  coachStaff: Coach[];
  season: number; // 1, 2, 3... para dynasty
  salaryCap: number;
  record: { wins: number; losses: number; ties: number };
}

type GamePhase = "creation" | "preseason" | "roster_reveal" | "regular_season" | "playoffs" | "offseason";

interface Coach {
  name: string;
  role: "HC" | "OC" | "DC" | "ST" | "QB_Coach" | "RB_Coach" | "WR_Coach" | "OL_Coach" | "DL_Coach" | "LB_Coach" | "DB_Coach";
  personality: "hard_ass" | "players_coach" | "analytics_nerd" | "old_school" | "developer";
  reliability: number; // 0-100, how accurate their evaluations are
}
```

---

## 5. Geração Procedural e Algoritmos

### Geração de Nomes
Pool JSON com firstNames e lastNames. Combinar aleatoriamente. Garantir unicidade no roster.

### Geração de Stats
Baseado no `overall` do jogador + variação por posição:

```typescript
// Exemplo para QB
interface QBStats {
  armStrength: number;    // 40-99
  accuracy: number;       // 40-99
  decisionMaking: number; // 40-99
  mobility: number;       // 40-99
  poise: number;          // 40-99
}

// Stats derivam do overall com ±10 de variação por atributo
// Ex: QB com overall 78 terá stats entre 68-88 distribuídos
```

### Simulação de Performance Semanal
Cada semana, cada jogador recebe um `weeklyGrade`:
```
weeklyGrade = overall + random(-15, +15) + trendModifier + traitModifier
```
- `trendModifier`: jogadores "improving" ganham +2/semana, "declining" perdem -2
- `traitModifier`: "clutch" = +5 em jogos, "practice_star" = +5 em treinos

### Geração de Coach Notes
Pool de templates por sentiment e posição:

```typescript
const coachNoteTemplates = {
  positive: [
    "{player} has been turning heads in practice. His {stat} is elite-level.",
    "I'm telling you, {player} is going to surprise people. The kid just gets it.",
    "Best camp I've seen from {player}. Night and day from last year.",
  ],
  negative: [
    "{player} is struggling with consistency. One great rep, then two bad ones.",
    "Love the kid's attitude, but {stat} isn't where it needs to be.",
    "We need to have a real conversation about {player}'s future here.",
  ],
  conflicting: [
    "Look, {player} has the talent. No question. But is he NFL-ready? I'm not sure yet.",
    "{player} tested off the charts. But the game tape tells a different story.",
  ]
};
```

### Simulação de Resultados de Jogos
Fórmula simplificada baseada no overall médio do time:
```
teamStrength = average(roster.map(p => p.overall))
opponentStrength = random(65, 85) // times fictícios
result = simulateGame(teamStrength, opponentStrength)
```

---

## 6. Estrutura de Páginas (Next.js App Router)

```
app/
├── page.tsx                    # Landing / Start screen
├── create/
│   └── page.tsx               # Criação da franquia
├── game/
│   ├── layout.tsx             # Game shell (header com logo do time, nav bottom)
│   ├── week/
│   │   └── [weekNumber]/
│   │       ├── page.tsx       # Hub da semana (overview)
│   │       ├── report/
│   │       │   └── page.tsx   # Relatório de treinos
│   │       ├── coaches/
│   │       │   └── page.tsx   # Staff comments
│   │       ├── game/
│   │       │   └── page.tsx   # Resultado do jogo preseason
│   │       └── cuts/
│   │           └── page.tsx   # Tela de cortes
│   ├── roster/
│   │   └── page.tsx           # Roster completo / depth chart
│   ├── player/
│   │   └── [playerId]/
│   │       └── page.tsx       # Perfil individual do jogador
│   ├── waivers/
│   │   └── page.tsx           # Waiver wire
│   └── reveal/
│       └── page.tsx           # 53-man roster reveal
├── components/
│   ├── PlayerCard.tsx         # Card de jogador (sem foto, cores do time)
│   ├── CoachQuote.tsx         # Bloco de citação de coach
│   ├── StatBar.tsx            # Barra visual de atributo
│   ├── CutButton.tsx          # Botão de corte com confirmação
│   ├── WeekHeader.tsx         # Header narrativo da semana
│   ├── BoxScore.tsx           # Box score do jogo
│   ├── TeamLogo.tsx           # Logo SVG dinâmico
│   ├── DepthChart.tsx         # Visualização do depth chart
│   ├── NarrativeBlock.tsx     # Bloco de texto narrativo estilo jornalístico
│   ├── TrendIndicator.tsx     # Seta de tendência (↑↓→)
│   ├── PositionFilter.tsx     # Filtro por posição
│   └── ConfirmModal.tsx       # Modal de confirmação de corte
├── lib/
│   ├── gameEngine.ts          # Lógica central: simulação, geração, cortes
│   ├── playerGenerator.ts     # Geração procedural de jogadores
│   ├── namePool.ts            # Banco de nomes
│   ├── coachGenerator.ts      # Geração de coaches e notas
│   ├── gameSimulator.ts       # Simulação de resultados
│   ├── narrativeEngine.ts     # Geração de textos narrativos
│   ├── types.ts               # Todas as interfaces TypeScript
│   └── store.ts               # Zustand store (estado global)
└── public/
    ├── images/
    │   ├── ambiance/          # Fotos de campos, vestiários, facilities
    │   └── icons/             # Ícones de logos (SVGs)
    └── fonts/                 # Fontes customizadas
```

---

## 7. UX / UI Guidelines

### Mobile-first absoluto
- Viewport de referência: 390 x 844 (iPhone 14)
- Nenhuma feature pode depender de hover
- Touch targets mínimo 44x44px
- Scroll vertical é o padrão. Sem scroll horizontal
- Bottom navigation bar fixa com: Semana | Roster | Waivers | Staff

### Transições
- Swipe para navegar entre seções da semana
- Animação suave ao cortar jogador (card desliza para fora + vibração háptica se disponível)
- Fade in nos textos narrativos (sensação de "revelação")

### Tipografia
- Headlines: bold, condensed, uppercase (estilo ESPN/esportivo)
- Body: sans-serif legível, 16px base
- Coach quotes: itálico, com aspas, nome do coach em bold
- Stats: monospace ou tabular nums

### Feedback
- Cortar jogador: confirmação modal com nome e stats → animação de saída → notification "X was released"
- Manter jogador disputado: flash verde no card
- Pressão do owner: notification banner no topo (vermelho)
- Coach conflitante: ícone de warning no comentário

---

## 8. PWA Configuration

Configurar como Progressive Web App para funcionar como app mobile:

```json
// manifest.json
{
  "name": "Knocks",
  "short_name": "Knocks",
  "description": "NFL Roster Management Game",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0F",
  "theme_color": "#0A0A0F",
  "orientation": "portrait"
}
```

- Service worker para offline (o jogo é 100% client-side no MVP)
- Add to Home Screen prompt
- Splash screen com logo KNOCKS

---

## 9. Prioridade de Implementação (MVP)

### Sprint 1 — Fundação
1. Setup Next.js + Tailwind + TypeScript
2. Sistema de cores dinâmico (CSS variables baseadas na cor do time)
3. Tela de criação de franquia com preview
4. Player generator funcionando
5. Zustand store com persistência em localStorage

### Sprint 2 — Core Loop do Preseason
6. Tela de hub semanal
7. Relatório narrativo da semana (templates)
8. Coach notes por posição
9. Tela de cortes com filtros e confirmação
10. Transição entre semanas

### Sprint 3 — Profundidade
11. Simulação de jogo preseason + box score
12. Player profile individual
13. Waiver wire
14. Reações a cortes (narrativa)
15. Pressão de owner/mídia

### Sprint 4 — Conclusão
16. 53-man roster reveal
17. Depth chart final
18. Season grade + análise
19. PWA setup
20. Polimento visual + animações

### Backlog (pós-MVP)
- Modo Dynasty (temporada regular + playoffs + offseason + draft)
- Modo multiplayer (League Mode)
- Modo narrativo episódico ("Hard Knocks Mode")
- Customização premium de logos
- Integração com IA (Claude API) para narrativas dinâmicas
- Sound design (whistle, crowd ambiance, locker room)
- Achievements / Leaderboards
- i18n (Português BR como segunda língua prioritária)

---

## 10. Análise Competitiva (fonte: gmgames.org — catálogo definitivo do gênero)

O [gmgames.org](https://gmgames.org/) é o maior catálogo de jogos de GM esportivo do mundo, com 15 anos de cobertura. A seção de Football (NFL + College) lista **30 jogos ativos**. A análise completa confirma 4 gaps estratégicos que o Knocks ocupa:

### Gap 1: ZERO jogos focam no preseason ou roster cuts
Dos 30 jogos listados, **nenhum** trata o preseason como mecânica central. Todos simulam o preseason como etapa automática ou fase rápida no caminho para o campeonato. O conceito de cortes semanais com tensão narrativa não existe em nenhum jogo do catálogo.

### Gap 2: Mobile-first é raro — especialmente pra NFL pro-level
A esmagadora maioria dos jogos é Windows PC. Os poucos mobile são predominantemente college football. No cruzamento **mobile + pro football (NFL-style) + pure GM sim**, apenas o Pocket GM 3 (iOS, ~$3, solo dev) existe como concorrente direto — e não tem preseason narrativo.

### Gap 3: Nenhum jogo usa narrativa como core mechanic
Todo jogo listado é spreadsheet-first: números, tabelas, depth charts. Nenhum usa storytelling, coach quotes, reações emocionais de jogadores ou pressão de mídia como mecânicas de gameplay. O Knocks seria o único jogo narrativo do gênero.

### Gap 4: Web app PWA moderno não existe nesse espaço
Os jogos online (Football GM, RedZoneAction, SimSN, Deep Route) são browser games clássicos ou multiplayer assíncronos. Nenhum é uma PWA mobile-first moderna. A abordagem Next.js é inédita no gênero.

### Competidores diretos a monitorar

| Jogo | Plataforma | Rating | Ameaça ao Knocks | Por que não é concorrente direto |
|------|-----------|--------|-------------------|--------------------------------|
| **Pocket GM 3** | iOS | 8.8 | Alta (mais similar) | Sem preseason, sem narrativa, iOS only |
| **Front Office Football 9** | PC | 8.8 | Média (público hardcore) | Dense PC sim, não mobile, preseason é automático |
| **Football GM** | Browser/Android | 8.7 | Média (free, acessível) | Sem preseason, sem narrativa, UI datada |
| **Draft Day Sports: Pro Football 2026** | PC | 8.3 | Baixa | PC only, foco em play calling + coaching roles |
| **Ultimate Football GM** | iOS/Android | 8.0 | Média | Mobile mas sem profundidade narrativa |
| **Football Mogul 26** | PC | 8.5 | Baixa | Foco financeiro/owner, PC only |
| **Winning Tradition: Football** | iOS/Android | 8.5 | Média-alta (novo, mobile) | College + coaching focus, não GM/preseason |

### Padrão observado nos melhores jogos
Os títulos mais bem avaliados do catálogo (8.5+) compartilham: dynasty/multi-season depth, comunidade ativa, dev solo ou pequeno time, updates frequentes. A palavra "Dynasty" aparece em múltiplos nomes de jogos top — validação direta de que o path dynasty é essencial.

### Estratégia de lançamento via gmgames.org
Submeter o Knocks ao catálogo do gmgames.org ao lançar o MVP. A comunidade (Discord, Reddit r/gmgames) é exatamente o público hardcore que pode dar tração orgânica inicial. Contato: https://gmgames.org/contact-us/

---

## 11. Referências de Inspiração

**Jogos:**
- Retro Bowl (simplicidade, gestão leve, retro charm)
- Football Manager (profundidade de gestão, "one more season" loop)
- Pocket GM 3 (mobile-first GM sim — concorrente mais direto)
- Reigns (decisões binárias com consequências)
- Football GM (acessibilidade, browser-based, open source)
- Winning Tradition: Football (mobile recente, staff management)

**Séries/Mídia:**
- HBO Hard Knocks (tom narrativo, tensão de cortes, coaches)
- Ballers (drama de bastidores NFL)
- Draft Day (filme — tensão de decisões de GM)

**Apps/UI:**
- ESPN App (layout esportivo mobile)
- The Athletic (tipografia editorial)
- Sleeper Fantasy (UI moderna de fantasy football)

**Comunidades-alvo para lançamento:**
- gmgames.org (catálogo + review)
- r/gmgames (Reddit)
- Discord GM Games (link: https://discord.gg/qrx2r85)
- r/RetroGoalGeneral, r/pocketGM (comunidades de jogos similares)

---

## 12. Observações Finais para Claude Code

1. **Comece pelo game engine (lib/), não pela UI.** O jogo precisa funcionar em dados antes de ter tela.
2. **Teste a geração de jogadores isoladamente** — ela é a fundação de tudo.
3. **O texto É o produto.** Invista tempo nos templates narrativos. Um comentário genérico de coach mata a imersão.
4. **Mobile-first não é opcional.** Toda decisão de layout deve partir de 390px de largura.
5. **Não otimize prematuramente.** localStorage é suficiente pro MVP. Não monte infra de backend agora.
6. **As cores do time devem permear TUDO.** Botões, headers, borders, gradients — o jogador precisa sentir que aquele é o time DELE.
7. **Cada corte deve doer.** Se o jogador não hesita antes de apertar "CUT", o jogo falhou.
