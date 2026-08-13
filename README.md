# Dashboard ENEL — Hortas sob Torres de Energia

> **Projeto:** Manus\_Dashboard\_Hortas\_Torres\_Energia  
> **Origem:** Tarefa "Dashboard ENEL - Cartilha do Comodatário versão com árvores" (Manus AI)  
> **Instituição:** NEA-UFABC — Núcleo de Estudos em Agroecologia e Produção Orgânica da Universidade Federal do ABC  
> **Parceria:** ENEL Brasil

---

## Descrição

Dashboard interativo desenvolvido em React para análise das normas de segurança da **Cartilha do Comodatário da ENEL Brasil**, com foco na implantação de **hortas urbanas sob faixas de torres de transmissão de alta tensão** na região da Mata Atlântica.

O projeto inclui visualizações do projeto paisagístico com canteiros, árvores frutíferas tropicais, meliponário, composteira e estruturas de apoio, respeitando as distâncias de segurança exigidas pela ENEL. Link para visualizar o projeto: https://enelcartilha-3mt4vqny.manus.space

---

## Funcionalidades

- **Etapa A — Análise Regulatória:** Dashboard interativo com 18 ações proibidas e 10 ações permitidas da Cartilha do Comodatário, ranqueadas por frequência de termos.
- **Etapa B — Recomendações:** 12 recomendações de segurança para agricultores e 5 recomendações estratégicas para gestores de projeto.
- **Etapa C — Projeto Paisagístico:** Visualização 2D top-down de um terreno de 4.000 m² (100m × 40m) com:
  - Torres de transmissão com distâncias de segurança demarcadas
  - Caminhos de acesso para manutenção
  - Canteiros posicionados com segurança
  - **Árvores tropicais** (até 2m de altura) que atraem fauna silvestre (aves e morcegos da Mata Atlântica)
  - Meliponário (abelhas sem ferrão nativas)
  - Composteira
  - Banheiro químico e construção de alvenaria
- **Galeria de Plantas:** Catálogo de espécies recomendadas com critérios de seleção (ciclo, altura, rentabilidade, segurança).
- **Calculadora de Viabilidade:** Estimativa de ROI para o projeto.

---

## Stack Tecnológica

| Tecnologia | Função |
| :--- | :--- |
| React 19 | Framework principal |
| Tailwind CSS 4 | Estilização |
| Shadcn/UI | Componentes de interface |
| Framer Motion | Animações |
| Recharts | Visualização de dados |
| Lucide-React | Ícones |
| Wouter | Roteamento client-side |
| TypeScript | Tipagem estática |

---

## Estrutura de Arquivos

```
├── README.md
├── relatorio_procedimentos.md          # Relatório completo de procedimentos
├── Relatorio_Procedimentos_Dashboard_ENEL.docx  # Relatório em formato Word
├── Home.tsx                            # Página principal do dashboard
├── ProjetoPaisagistico.tsx             # Visualização SVG do projeto paisagístico
├── GaleriaPlantas.tsx                  # Galeria interativa de espécies vegetais
├── enelData.ts                         # Dados regulatórios da Cartilha ENEL
├── plantasData.ts                      # Banco de dados de espécies de plantas
├── pasted_content.txt                  # Conteúdo base da Cartilha do Comodatário
├── todo.md                             # Registro de tarefas do projeto
└── assets/
    ├── enel-logo.webp                  # Logo ENEL Brasil
    ├── nea-ufabc-logo.webp             # Logo NEA-UFABC
    ├── enel-landscape-project-v3.jpg   # Versão 3 do projeto paisagístico
    ├── enel-landscape-project-v4.jpg   # Versão 4 do projeto paisagístico
    ├── enel-landscape-project-v5.jpg   # Versão 5 do projeto paisagístico
    ├── enel-landscape-project-v6.jpg   # Versão 6 do projeto paisagístico
    └── enel-landscape-project-v7.jpg   # Versão 7 do projeto paisagístico (final)
```

---

## Contexto do Projeto

Este dashboard foi desenvolvido no âmbito de uma parceria entre o **NEA-UFABC** e a **ENEL Brasil** para viabilizar o uso produtivo de faixas de servidão de torres de transmissão de alta tensão. O projeto paisagístico incorpora espécies da Mata Atlântica que atraem fauna silvestre, como aves frugívoras e morcegos polinizadores, promovendo a **biodiversidade** e a **segurança alimentar** simultaneamente.

### Espécies de Árvores Tropicais Incluídas (até 2m)

As espécies selecionadas produzem frutos que atraem fauna silvestre da Mata Atlântica, especialmente aves e morcegos, contribuindo para a restauração ecológica da área sob as torres.

---

## Licença

Este projeto foi desenvolvido com fins acadêmicos e de pesquisa aplicada pela UFABC em parceria com a ENEL Brasil.

---

*Gerado pelo agente Manus AI — cópia do projeto original para versionamento e colaboração.*
