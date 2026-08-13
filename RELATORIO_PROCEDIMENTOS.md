# Relatório Detalhado de Procedimentos

## Dashboard ENEL – Cartilha do Comodatário: Análise de Normas de Segurança para Hortas sob Faixas de Torres de Transmissão

---

## 1. Objetivo

Este relatório documenta todos os procedimentos realizados para analisar o documento PDF da Cartilha do Comodatário, produzida pela ENEL Distribuição São Paulo, e construir um dashboard web interativo, público e de visual claro, clean e executivo, que responde às perguntas A e B formuladas pela pesquisadora.

O contexto do projeto de pesquisa é a implantação de hortas sob faixas de torres de transmissão de energia elétrica de alta voltagem, respeitando as normas de segurança contra choques elétricos e o espaço necessário para manutenção das torres e linhões.

---

## 2. Fonte de Dados

| Atributo | Valor |
|---|---|
| Arquivo | `ENEL_Cartilha_Uso_da_faixa_da_linha_de_transmissão.pdf` |
| Páginas | 9 |
| Produtora | ENEL Distribuição São Paulo |
| Tema | Direito e Deveres do Comodatário – uso de faixas de linha de transmissão para cultivo |
| Localização original | `/home/ubuntu/upload/ENEL_Cartilha_Uso_da_faixa_da_linha_de_transmissão.pdf` |

---

## 3. Procedimentos de Extração e Análise

### 3.1. Inspeção Visual do PDF

O documento foi inspecionado página por página utilizando visualização multimodal. Cada página foi analisada para identificar:

- Enunciados normativos (proibições, permissões e obrigações)
- Categorias temáticas (segurança elétrica, acesso, vegetação, etc.)
- Contexto institucional (fiscalização, contrato de comodato, processo de adesão)

As observações de cada página foram registradas em arquivo de notas intermediário (`enel_dashboard_notes.md`), preservando a informação antes de prosseguir com a extração textual.

### 3.2. Extração Textual

Foi executado o utilitário `pdftotext -layout` para extrair o texto completo do PDF, preservando a disposição visual em colunas. O texto extraído (`enel_full_text.txt`) totalizou 181 linhas e foi lido integralmente para validação cruzada com as observações visuais.

### 3.3. Validação Cruzada

Cada enunciado normativo identificado na inspeção visual foi confirmado contra o texto extraído. Não houve discrepâncias significativas. Apenas ajustes de pontuação e formatação foram necessários para padronização.

---

## 4. Estruturação dos Dados

### 4.1. Coluna Proibido (Etapa A)

Foram identificadas **18 ações proibidas** no documento. A ordenação foi feita pela frequência do termo normativo utilizado:

| Termo | Frequência no documento | Posição na lista |
|---|---|---|
| "proibido" | 10 ocorrências | 1º a 10º |
| "proibida" | 6 ocorrências | 11º a 16º |
| "permitido" (negado) | 1 ocorrência | 17º |
| Sem termo proibitivo direto | 0 | 18º |

As 18 ações proibidas foram classificadas em 5 categorias:

| Categoria | Quantidade |
|---|---|
| Segurança Elétrica | 9 |
| Acesso e Manutenção | 3 |
| Uso do Solo e Estruturas | 3 |
| Vegetação e Cultivo | 2 |
| Segurança e Meio Ambiente | 2 |

### 4.2. Coluna Permitido (Etapa A)

Foram identificadas **10 ações permitidas ou obrigatórias**. A ordenação foi feita pela frequência do termo:

| Termo | Frequência | Posição |
|---|---|---|
| "permitida" | 1 ocorrência | 1º |
| "deverá" / "deve" / "não poderá" / "não deverá" / outras obrigações | 0 (termos de obrigação) | 2º a 10º |

A única ação expressamente **permitida** no documento é a construção de abrigo padrão fora da faixa de segurança. As demais 9 entradas são **obrigações** do comodatário (deveres de manutenção, acesso, documentação, etc.), que foram incluídas na coluna "Permitido" conforme a estrutura de duas colunas solicitada.

### 4.3. Recomendações para Agricultores (Etapa B)

Foram geradas **12 recomendações** ordenadas por relevância para a segurança dos agricultores contra choques elétricos de alta tensão e para a preservação dos serviços de manutenção. A ordenação priorizou:

1. Risco direto de choque elétrico (contato ou arco elétrico)
2. Risco indireto (aproximação de objetos, irrigação ascendente)
3. Condições operacionais (manutenção, clima adverso)
4. Acesso e desobstrução da faixa
5. Vegetação e altura de cultivo
6. Uso do solo e estruturas
7. Governança e fiscalização

Cada recomendação inclui fundamentação extraída diretamente da cartilha, com citação do enunciado normativo correspondente.

### 4.4. Recomendações Estratégicas

Foram sintetizadas **5 recomendações estratégicas** para gestores e pesquisadores, com descrição e impacto esperado:

1. Adotar cultivos de baixo perfil como padrão técnico
2. Implementar irrigação localizada e drenagem controlada
3. Estabelecer protocolo de evacuação para manutenção e emergências
4. Capacitar continuamente os comodatários em segurança elétrica
5. Integrar o projeto paisagístico ao plano de manutenção da Enel

---

## 5. Construção do Dashboard

### 5.1. Stack Tecnológica

| Componente | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Estilização | Tailwind CSS 4 |
| Componentes UI | shadcn/ui (Radix UI) |
| Gráficos | Recharts |
| Roteamento | Wouter |
| Fontes | Plus Jakarta Sans (display), Inter (body), JetBrains Mono (código) |
| Build | Vite 7 |

### 5.2. Design

O design seguiu a abordagem "Clean Executive Safety", com os seguintes princípios:

- **Paleta semântica**: vermelho (#DC2626) para proibido, verde (#16A34A) para permitido, âmbar (#D97706) para recomendações, azul (#2563EB) para institucional
- **Layout**: header fixo, hero com imagem de fundo, navegação por tabs (Visão Geral, Proibido vs Permitido, Recomendações, Estratégicas)
- **Tipografia**: Plus Jakarta Sans para títulos e números, Inter para texto corrido
- **Interações**: busca textual filtrando normas em tempo real, hover com elevação sutil, animações de entrada escalonadas

### 5.3. Visualizações Interativas

O dashboard inclui três gráficos interativos (Recharts):

1. **Distribuição por Categoria Normativa** – gráfico de barras horizontais comparando proibidas vs. permitidas por categoria
2. **Frequência de Termos Normativos** – gráfico de barras colorido por tipo (proibição, permissão, obrigação)
3. **Distribuição por Nível de Relevância** – gráfico de barras comparando proibidas vs. permitidas por nível (Crítica, Alta, Média, Baixa)

### 5.4. Funcionalidades

- **Busca em tempo real**: filtro textual aplicado às listas de Proibido e Permitido
- **Tabs navegáveis**: quatro seções independentes com conteúdo dedicado
- **Cards de KPI**: quatro indicadores principais com contagens e ícones
- **Cards de normas**: cada norma exibe texto, categoria, nível de relevância e página de origem
- **Cards de recomendações**: cada recomendação exibe prioridade numerada, descrição, fundamentação e categoria
- **Footer informativo**: três colunas com informações sobre o dashboard, fonte dos dados e metodologia

### 5.5. Assets Visuais

Foram gerados dois assets visuais personalizados:

- **Logo**: ícone de torre de transmissão estilizado em azul, para header e favicon
- **Imagem hero**: fotografia aérea de torres de transmissão com hortas ao fundo, com overlay escuro para legibilidade do texto

---

## 6. Validação

### 6.1. Verificação de Erros TypeScript

O projeto passou pela verificação de tipos do TypeScript (`tsc --noEmit`) sem erros após correções de:

- Tipo da propriedade `prioridade` (alterado de union literal para `number`)
- Tipo da propriedade `categoria` (adicionado `'Segurança e Meio Ambiente'` ao union)
- Remoção de import inexistente `HorizontalBarChart` do recharts
- Correção de sintaxe `useState` (ausência do sinal `=`)

### 6.2. Verificação Visual

O servidor de desenvolvimento foi reiniciado e um screenshot foi capturado e inspecionado, confirmando:

- Header com logo, título e badges de status renderizados corretamente
- Hero section com imagem de fundo, título, descrição e botões de CTA
- Tabs de navegação com 4 seções
- KPIs com 4 cards coloridos e valores corretos (18, 10, 12, 5)

---

## 7. Disponibilidade Pública

O dashboard foi construído como projeto web estático (web-static) no ecossistema Manus, que fornece hosting público automático. Após a criação de um checkpoint, o projeto pode ser publicado via o botão "Publish" na interface de gerenciamento, tornando-se acessível em um URL público.

---

## 8. Observações e Próximos Passos

- A **Etapa C** (figura do projeto paisagístico) será incorporada quando enviada pela pesquisadora, ocupando a maior parte do dashboard conforme solicitado.
- O dashboard está estruturado para accommodar a adição da figura paisagística como uma nova seção ou tab, sem necessidade de reestruturação.
- Os dados foram extraídos fielmente do documento oficial. Recomenda-se que a pesquisadora valide as interpretações de classificação (categoria e relevância) com sua equipe antes da publicação acadêmica.

---

## 9. Resumo dos Artefatos Produzidos

| Artefato | Descrição |
|---|---|
| `enel_dashboard_notes.md` | Notas de análise visual do PDF, página por página |
| `enel_full_text.txt` | Texto extraído do PDF via pdftotext |
| `client/src/data/enelData.ts` | Dados estruturados: normas, recomendações, visualizações |
| `client/src/pages/Home.tsx` | Componente principal do dashboard |
| `client/src/index.css` | Tema customizado com paleta semântica |
| `client/index.html` | HTML com fontes Google e metadados |
| `ideas.md` | Brainstorm de design |
| `RELATORIO_PROCEDIMENTOS.md` | Este relatório |
