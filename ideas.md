# Brainstorm – Dashboard ENEL Cartilha do Comodatário

## Abordagem escolhida: "Clean Executive Safety"

### Design Movement
Minimalismo executivo com influência de dashboards de compliance regulatório (estilo ANEEL/OSHA), priorizando legibilidade e hierarquia visual clara.

### Core Principles
1. **Clareza acima de tudo**: informação normativa deve ser instantaneamente compreensível
2. **Contraste semântico**: vermelho = proibido, verde = permitido, âmbar = recomendações
3. **Densidade controlada**: cards bem espaçados, sem ruído visual
4. **Interatividade funcional**: filtros, busca e ordenação que agregam valor real

### Color Philosophy
- Fundo: branco/off-white (#FAFAFA) com cards em branco puro
- Texto principal: slate-800 (#1E293B)
- Proibido: vermelho 600 (#DC2626) com fundo vermelho 50
- Permitido: verde 600 (#16A34A) com fundo verde 50
- Recomendações: âmbar 600 (#D97706) com fundo âmbar 50
- Accent: azul 700 (#1D4ED8) para elementos institucionais/ENEL
- Bordas: slate 200 (#E2E8F0)

### Layout Paradigm
Dashboard com header fixo, seções empilhadas verticalmente com navegação por tabs:
1. Visão Geral (KPIs + gráficos)
2. Proibido vs Permitido (tabela dupla coluna)
3. Recomendações para Agricultores
4. Recomendações Estratégicas

### Signature Elements
- Cards com sombra suave e borda lateral colorida (4px) indicando categoria
- Badges circulares com contagem de normas
- Gráfico de barras horizontais comparando categorias de normas
- Ícones lucide para cada tipo de norma

### Interaction Philosophy
Filtros por categoria, busca textual na lista de normas, tabs para navegação entre seções, hover states com elevação sutil.

### Animation
Entrada escalonada de cards (stagger 50ms), transições de tab suaves (200ms ease-out), hover com translateY(-2px) + shadow increase.

### Typography System
- Display: "Plus Jakarta Sans" (700/800) para títulos e números
- Body: "Inter" (400/500/600) para texto corrido
- Monospace: "JetBrains Mono" para códigos/referências

### Brand Essence
Dashboard de compliance para pesquisa acadêmica sobre uso seguro de faixas de transmissão para hortas urbanas.

### Signature Brand Color
Azul 700 (#1D4ED8) – confiança institucional e técnica.

### Wordmark & Logo
Símbolo de torre de transmissão estilizado em azul, sem texto.
