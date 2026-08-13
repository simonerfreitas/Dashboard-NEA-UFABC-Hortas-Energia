// Dados estruturados extraídos da Cartilha do Comodatário – ENEL Distribuição São Paulo
// Fonte: ENEL_Cartilha_Uso_da_faixa_da_linha_de_transmissão.pdf (9 páginas)
// Análise realizada por extração textual (pdftotext) e inspeção visual do PDF.

export interface NormaItem {
  id: number;
  texto: string;
  categoria: string;
  termoUsado: string; // "proibido", "proibida", "permitido", "permitida", "deverá", "deve", etc.
  frequenciaTermo: number; // frequência do termo específico em toda a coluna
  pagina: number;
  relevanciaSeguranca: 'critica' | 'alta' | 'media' | 'baixa';
}

// ============================================================================
// COLUNA PROIBIDO – Ações proibidas extraídas do documento
// Ordenação: por frequência do termo "proibido" (10 ocorrências) > "proibida" (6) > "permitido" negado (1) > sem termo (0)
// ============================================================================

export const acoesProibidas: NormaItem[] = [
  // Termo "proibido" – 10 ocorrências totais no documento
  { id: 3, texto: "É proibido o fechamento de portões já existentes da Enel sem autorização da Enel.", categoria: "Acesso e Manutenção", termoUsado: "proibido", frequenciaTermo: 10, pagina: 3, relevanciaSeguranca: "alta" },
  { id: 6, texto: "É proibido o plantio de árvores de médio e grande porte no interior da faixa de segurança (ex.: coqueiro, pinheiro, bananeira, mamão etc.).", categoria: "Vegetação e Cultivo", termoUsado: "proibido", frequenciaTermo: 10, pagina: 5, relevanciaSeguranca: "critica" },
  { id: 7, texto: "É proibido a permanência constante e aglomeração de terceiros no interior da faixa de segurança sob os cabos condutores, bem como atividades que coloquem em risco pessoas e a operação da linha de transmissão aérea.", categoria: "Segurança Elétrica", termoUsado: "proibido", frequenciaTermo: 10, pagina: 4, relevanciaSeguranca: "critica" },
  { id: 10, texto: "É proibido trabalho no interior da faixa de segurança em condições climáticas adversas (chuva, descarga atmosférica e trabalho noturno).", categoria: "Segurança Elétrica", termoUsado: "proibido", frequenciaTermo: 10, pagina: 6, relevanciaSeguranca: "critica" },
  { id: 11, texto: "É proibido o manuseio de mastros, hastes, postes, bambu e troncos de madeira no interior da faixa de segurança (sob projeção dos cabos condutores).", categoria: "Segurança Elétrica", termoUsado: "proibido", frequenciaTermo: 10, pagina: 6, relevanciaSeguranca: "critica" },
  { id: 13, texto: "É proibido escalar as torres no interior da faixa de segurança.", categoria: "Segurança Elétrica", termoUsado: "proibido", frequenciaTermo: 10, pagina: 7, relevanciaSeguranca: "critica" },
  { id: 14, texto: "Proibido utilizar as torres como suporte e apoio para qualquer finalidade.", categoria: "Segurança Elétrica", termoUsado: "proibido", frequenciaTermo: 10, pagina: 7, relevanciaSeguranca: "critica" },
  { id: 15, texto: "É proibido realizar queimadas de vegetação, madeiras, papel, papelão e qualquer outro tipo de material no interior da faixa de segurança.", categoria: "Segurança e Meio Ambiente", termoUsado: "proibido", frequenciaTermo: 10, pagina: 7, relevanciaSeguranca: "alta" },
  { id: 17, texto: "É proibido o corte ou poda de árvores já existentes no interior da faixa de segurança sem avaliação de riscos e autorização da Enel.", categoria: "Vegetação e Cultivo", termoUsado: "proibido", frequenciaTermo: 10, pagina: 7, relevanciaSeguranca: "alta" },
  { id: 18, texto: "Fica proibido em toda área delimitada do comodato o uso de contêiner e guindastes.", categoria: "Uso do Solo e Estruturas", termoUsado: "proibido", frequenciaTermo: 10, pagina: 7, relevanciaSeguranca: "alta" },
  // Termo "proibida" – 6 ocorrências totais no documento
  { id: 1, texto: "Fica proibida qualquer atividade que possa ocasionar risco de choque elétrico.", categoria: "Segurança Elétrica", termoUsado: "proibida", frequenciaTermo: 6, pagina: 3, relevanciaSeguranca: "critica" },
  { id: 2, texto: "É proibida a abertura de portões ou acessos de qualquer espécie nos muros e cercas sem a autorização da Enel.", categoria: "Acesso e Manutenção", termoUsado: "proibida", frequenciaTermo: 6, pagina: 3, relevanciaSeguranca: "alta" },
  { id: 4, texto: "É proibida a presença de animais de qualquer espécie no local (cavalo, cachorro, galinhas, patos, porcos etc.).", categoria: "Uso do Solo e Estruturas", termoUsado: "proibida", frequenciaTermo: 6, pagina: 4, relevanciaSeguranca: "media" },
  { id: 8, texto: "Fica proibida a execução de qualquer atividade pelo comodatário quando estiverem sendo executadas pela Enel atividades no Sistema Elétrico de Potência, respeitando as delimitações estabelecidas pela Enel, não podendo o comodatário invadir a área de trabalho da Enel.", categoria: "Acesso e Manutenção", termoUsado: "proibida", frequenciaTermo: 6, pagina: 5, relevanciaSeguranca: "critica" },
  { id: 12, texto: "É proibida a irrigação artificial por aspersão ou com jato de água dirigido para cima.", categoria: "Segurança Elétrica", termoUsado: "proibida", frequenciaTermo: 6, pagina: 6, relevanciaSeguranca: "critica" },
  { id: 16, texto: "É proibida qualquer atividade não citada neste documento e que provoque a redução da distância entre os cabos condutores e o solo, gerando, por exemplo, erosão e deslizamentos.", categoria: "Segurança Elétrica", termoUsado: "proibida", frequenciaTermo: 6, pagina: 7, relevanciaSeguranca: "critica" },
  // Termo "permitido" negado – 1 ocorrência
  { id: 5, texto: "Não é permitido o estacionamento de qualquer tipo de veículos na projeção dos cabos condutores.", categoria: "Uso do Solo e Estruturas", termoUsado: "permitido (negado)", frequenciaTermo: 1, pagina: 3, relevanciaSeguranca: "alta" },
  // Sem termo proibido/permitido – 0 ocorrências
  { id: 9, texto: "As obras não poderão avançar, em hipótese alguma, sobre áreas de preservação permanente.", categoria: "Segurança e Meio Ambiente", termoUsado: "não poderão", frequenciaTermo: 0, pagina: 6, relevanciaSeguranca: "media" },
];

// ============================================================================
// COLUNA PERMITIDO – Ações permitidas e obrigações do comodatário
// Ordenação: por frequência do termo "permitida" (1 ocorrência) > termos de obrigação ("deverá", "deve", etc.) = 0
// ============================================================================

export const acoesPermitidas: NormaItem[] = [
  // Termo "permitida" – 1 ocorrência total no documento
  { id: 10, texto: "É permitida a construção apenas de abrigo padrão (e fora da faixa de segurança sob os cabos condutores), conforme anexo do contrato de comodato.", categoria: "Uso do Solo e Estruturas", termoUsado: "permitida", frequenciaTermo: 1, pagina: 6, relevanciaSeguranca: "media" },
  // Obrigações sem termo "permitido/permitida" – frequência 0
  { id: 1, texto: "O comodatário deverá garantir o livre acesso das equipes de manutenção à faixa de segurança, independente de horário e sem prévio aviso da Enel.", categoria: "Acesso e Manutenção", termoUsado: "deverá", frequenciaTermo: 0, pagina: 3, relevanciaSeguranca: "critica" },
  { id: 2, texto: "A linha de transmissão deve permanecer sempre desobstruída.", categoria: "Acesso e Manutenção", termoUsado: "deve", frequenciaTermo: 0, pagina: 3, relevanciaSeguranca: "critica" },
  { id: 3, texto: "O comodatário deverá manter portão e cadeado padrão da Enel.", categoria: "Acesso e Manutenção", termoUsado: "deverá", frequenciaTermo: 0, pagina: 3, relevanciaSeguranca: "alta" },
  { id: 4, texto: "Manter no local dos serviços, em local de fácil acesso e visualização, cópia da presente autorização de comodatário, para ser exibida à fiscalização da Enel sempre que for solicitado.", categoria: "Governança e Fiscalização", termoUsado: "manter (obrigação)", frequenciaTermo: 0, pagina: 4, relevanciaSeguranca: "media" },
  { id: 5, texto: "O solo deverá permanecer limpo e livre de saliências ou rugosidades que comprometam o livre acesso das equipes de manutenção da Enel.", categoria: "Acesso e Manutenção", termoUsado: "deverá", frequenciaTermo: 0, pagina: 4, relevanciaSeguranca: "alta" },
  { id: 6, texto: "Quanto à utilização da faixa de segurança (sob projeção dos cabos condutores), não deverá haver despejo e/ou desvio de água pluvial e/ou qualquer outro material líquido e/ou sólido na faixa de segurança sem a devida tratativa de utilização em acordo com a Enel.", categoria: "Segurança e Meio Ambiente", termoUsado: "não deverá", frequenciaTermo: 0, pagina: 4, relevanciaSeguranca: "alta" },
  { id: 7, texto: "Caso seja solicitado pela Enel a não permanência do comodatário e pessoas de forma temporária, o comodatário deverá mover ações de saída temporária para atender esta solicitação.", categoria: "Governança e Fiscalização", termoUsado: "deverá", frequenciaTermo: 0, pagina: 4, relevanciaSeguranca: "alta" },
  { id: 8, texto: "Não permitir vazamento de óleo ou qualquer outro produto potencialmente poluidor no solo.", categoria: "Segurança e Meio Ambiente", termoUsado: "não permitir (obrigação)", frequenciaTermo: 0, pagina: 5, relevanciaSeguranca: "alta" },
  { id: 9, texto: "A altura da vegetação (culturas de ciclo rápido) não poderá ser superior a 2 metros de altura entre a ponta da vegetação em relação ao solo.", categoria: "Vegetação e Cultivo", termoUsado: "não poderá", frequenciaTermo: 0, pagina: 5, relevanciaSeguranca: "critica" },
];

// ============================================================================
// RECOMENDAÇÕES PARA AGRICULTORES – Ordenadas por relevância para segurança
// contra choques elétricos de alta tensão e preservação da manutenção
// ============================================================================

export interface Recomendacao {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  categoria: 'Segurança Elétrica' | 'Acesso e Manutenção' | 'Vegetação e Cultivo' | 'Uso do Solo e Estruturas' | 'Governança e Fiscalização' | 'Segurança e Meio Ambiente';
  fundamentacao: string;
}

export const recomendacoesAgricultores: Recomendacao[] = [
  {
    id: 1,
    titulo: "Manter distância segura dos cabos condutores e nunca escalar torres",
    descricao: "Os cabos condutores de alta tensão transportam tensões letais. Nenhum contato direto ou indireto é tolerável. O agricultor deve tratar toda a faixa sob os cabos como zona de risco permanente, mantendo-se sempre no nível do solo e nunca subindo nas torres ou usando-as como suporte para ferramentas, plantas ou estruturas.",
    prioridade: 1,
    categoria: "Segurança Elétrica",
    fundamentacao: "Cartilha: 'Fica proibida qualquer atividade que possa ocasionar risco de choque elétrico'; 'É proibido escalar as torres'; 'Proibido utilizar as torres como suporte e apoio para qualquer finalidade'."
  },
  {
    id: 2,
    titulo: "Evitar manuseio de objetos longos e verticais sob os cabos condutores",
    descricao: "Mastros, hastes, postes, bambus e troncos de madeira podem aproximar-se perigosamente dos cabos condutores de alta tensão, causando arco elétrico (descarga sem contato direto). Utilizar apenas ferramentas manuais de baixo perfil durante o cultivo na faixa de segurança.",
    prioridade: 2,
    categoria: "Segurança Elétrica",
    fundamentacao: "Cartilha: 'É proibido o manuseio de mastros, hastes, postes, bambu e troncos de madeira no interior da faixa de segurança (sob projeção dos cabos condutores)'."
  },
  {
    id: 3,
    titulo: "Não utilizar irrigação por aspersão nem jatos de água dirigidos para cima",
    descricao: "Jatos de água ascendentes podem atingir os cabos condutores e formar um caminho condutivo, provocando choque elétrico. Preferir sistemas de irrigação localizada (gotejamento ou microaspersão baixa) que mantenham a água no nível do solo.",
    prioridade: 3,
    categoria: "Segurança Elétrica",
    fundamentacao: "Cartilha: 'É proibida a irrigação artificial por aspersão ou com jato de água dirigido para cima'."
  },
  {
    id: 4,
    titulo: "Suspender todas as atividades durante manutenção da Enel e condições climáticas adversas",
    descricao: "Quando a Enel estiver executando atividades no Sistema Elétrico de Potência, o agricultor deve evacuar a área de trabalho delimitada. Igualmente, não trabalhar na faixa durante chuvas, descargas atmosféricas (raios) ou à noite, quando a visibilidade e o risco são críticos.",
    prioridade: 4,
    categoria: "Segurança Elétrica",
    fundamentacao: "Cartilha: 'Fica proibida a execução de qualquer atividade pelo comodatário quando estiverem sendo executadas pela Enel atividades no Sistema Elétrico de Potência'; 'É proibido trabalho no interior da faixa de segurança em condições climáticas adversas (chuva, descarga atmosférica e trabalho noturno)'."
  },
  {
    id: 5,
    titulo: "Garantir livre acesso permanente das equipes de manutenção",
    descricao: "O agricultor deve planejar o layout da horta de modo que todas as áreas sob a faixa de transmissão permaneçam acessíveis a qualquer momento, sem bloqueios, portões fechados ou obstáculos. A Enel pode acessar a faixa independentemente de horário e sem prévio aviso.",
    prioridade: 5,
    categoria: "Acesso e Manutenção",
    fundamentacao: "Cartilha: 'O comodatário deverá garantir o livre acesso das equipes de manutenção à faixa de segurança, independente de horário e sem prévio aviso da Enel'; 'A linha de transmissão deve permanecer sempre desobstruída'."
  },
  {
    id: 6,
    titulo: "Limitar a altura da vegetação a no máximo 2 metros",
    descricao: "Toda cultura implantada na faixa de segurança deve ter altura máxima de 2 metros da ponta da vegetação ao solo. Priorizar hortaliças de ciclo rápido (alface, rúcula, couve, cheiro-verde) e evitar qualquer espécie arbórea ou arbustiva de médio e grande porte.",
    prioridade: 6,
    categoria: "Vegetação e Cultivo",
    fundamentacao: "Cartilha: 'A altura da vegetação (culturas de ciclo rápido) não poderá ser superior a 2 metros de altura entre a ponta da vegetação em relação ao solo'; 'É proibido o plantio de árvores de médio e grande porte no interior da faixa de segurança'."
  },
  {
    id: 7,
    titulo: "Manter o solo limpo, nivelado e sem saliências ou rugosidades",
    descricao: "O terreno deve permanecer plano e desobstruído para permitir trânsito seguro das equipes e veículos de manutenção. Evitar canteiros elevados, muretas, degraus ou qualquer irregularidade que dificulte o acesso. Preferir canteiros baixos, demarcados com materiais flexíveis.",
    prioridade: 7,
    categoria: "Acesso e Manutenção",
    fundamentacao: "Cartilha: 'O solo deverá permanecer limpo e livre de saliências ou rugosidades que comprometam o livre acesso das equipes de manutenção da Enel'."
  },
  {
    id: 8,
    titulo: "Não estacionar veículos nem introduzir contêineres e guindastes na área",
    descricao: "Veículos estacionados sob os cabos condutores representam risco de contato indireto e obstruem a manutenção. Contêineres e guindastes são ainda mais perigosos devido à altura. Estacionar sempre fora da projeção dos cabos condutores.",
    prioridade: 8,
    categoria: "Uso do Solo e Estruturas",
    fundamentacao: "Cartilha: 'Não é permitido o estacionamento de qualquer tipo de veículos na projeção dos cabos condutores'; 'Fica proibido em toda área delimitada do comodato o uso de contêiner e guindastes'."
  },
  {
    id: 9,
    titulo: "Não permitir animais de qualquer espécie no local",
    descricao: "Animais podem escavar o solo, obstruir acessos, danificar cercas e provocar situações de risco imprevisíveis sob os cabos. A presença de animais é expressamente proibida, incluindo animais de criação e de estimação.",
    prioridade: 9,
    categoria: "Uso do Solo e Estruturas",
    fundamentacao: "Cartilha: 'É proibida a presença de animais de qualquer espécie no local (cavalo, cachorro, galinhas, patos, porcos etc.)'."
  },
  {
    id: 10,
    titulo: "Evitar queimadas e não despejar resíduos líquidos ou sólidos na faixa",
    descricao: "Queimadas podem danificar cabos e torres, além de gerar fumaça que provoca descargas. Despejo de água pluvial, resíduos ou poluentes pode causar erosão, deslizamentos e reduzir a distância entre o solo e os cabos. Toda gestão de resíduos e água deve ser acordada com a Enel.",
    prioridade: 10,
    categoria: "Segurança e Meio Ambiente",
    fundamentacao: "Cartilha: 'É proibido realizar queimadas'; 'não deverá haver despejo e/ou desvio de água pluvial e/ou qualquer outro material líquido e/ou sólido na faixa de segurança sem a devida tratativa'; 'Não permitir vazamento de óleo ou qualquer outro produto potencialmente poluidor no solo'."
  },
  {
    id: 11,
    titulo: "Manter documentação do comodato visível e atender solicitações temporárias da Enel",
    descricao: "Manter cópia do contrato de comodato no local, em local visível, para apresentação à fiscalização. Se a Enel solicitar saída temporária (para manutenção programada ou emergencial), o agricultor deve atender prontamente.",
    prioridade: 11,
    categoria: "Governança e Fiscalização",
    fundamentacao: "Cartilha: 'Manter no local dos serviços, em local de fácil acesso e visualização, cópia da presente autorização de comodatário'; 'Caso seja solicitado pela Enel a não permanência do comodatário e pessoas de forma temporária, o comodatário deverá mover ações de saída temporária'."
  },
  {
    id: 12,
    titulo: "Usar apenas portão e cadeado padrão da Enel e não abrir novos acessos",
    descricao: "O agricultor deve manter o portão e cadeado padrão da Enel, não abrir novos acessos em muros ou cercas, e não fechar portões existentes sem autorização. Toda modificação de acesso deve ser previamente acordada com a Enel.",
    prioridade: 12,
    categoria: "Acesso e Manutenção",
    fundamentacao: "Cartilha: 'O comodatário deverá manter portão e cadeado padrão da Enel'; 'É proibida a abertura de portões ou acessos de qualquer espécie nos muros e cercas sem a autorização da Enel'; 'É proibido o fechamento de portões já existentes da Enel sem autorização da Enel'."
  },
];

// ============================================================================
// RECOMENDAÇÕES ESTRATÉGICAS – Síntese para gestores e pesquisadores
// ============================================================================

export interface RecomendacaoEstrategica {
  id: number;
  titulo: string;
  descricao: string;
  impacto: string;
}

export const recomendacoesEstrategicas: RecomendacaoEstrategica[] = [
  {
    id: 1,
    titulo: "Adotar cultivos de baixo perfil como padrão técnico",
    descricao: "Priorizar hortaliças de ciclo rápido com altura máxima de 2 metros, utilizando canteiros rasos e demarcações flexíveis. Esta abordagem compatibiliza produção agrícola com segurança elétrica e acesso de manutenção.",
    impacto: "Reduz risco de aproximação com cabos condutores e garante conformidade normativa."
  },
  {
    id: 2,
    titulo: "Implementar irrigação localizada e drenagem controlada",
    descricao: "Substituir aspersão por gotejamento ou microaspersão baixa. Gerir águas pluviais com canais periféricos fora da faixa de segurança, evitando despejo sob os cabos condutores.",
    impacto: "Elimina risco de arco elétrico por jato d'água e previne erosão no interior da faixa."
  },
  {
    id: 3,
    titulo: "Estabelecer protocolo de evacuação para manutenção e emergências",
    descricao: "Criar procedimento formal para saída temporária do local quando solicitado pela Enel, incluindo comunicação rápida com os agricultores e plano de contingência para cultivos em andamento.",
    impacto: "Garante continuidade da manutenção e protege a vida dos agricultores em situações de risco."
  },
  {
    id: 4,
    titulo: "Capacitar continuamente os comodatários em segurança elétrica",
    descricao: "Realizar treinamentos periódicos sobre riscos de alta tensão, distâncias de segurança, uso de ferramentas adequadas e procedimentos em condições climáticas adversas.",
    impacto: "Reduz acidentes por desconhecimento e fortalece a cultura de segurança no projeto."
  },
  {
    id: 5,
    titulo: "Integrar o projeto paisagístico ao plano de manutenção da Enel",
    descricao: "Desenhar o layout das hortas em conjunto com a equipe de manutenção da Enel, garantindo que canteiros, caminhos e estruturas não interfiram no acesso às torres e cabos. Manter portões e cadeados padrão.",
    impacto: "Assegura operacionalidade da rede elétrica e longevidade do contrato de comodato."
  },
];

// ============================================================================
// DADOS PARA VISUALIZAÇÕES
// ============================================================================

export const distribuicaoCategorias = [
  { categoria: "Segurança Elétrica", proibidas: 9, permitidas: 0 },
  { categoria: "Acesso e Manutenção", proibidas: 3, permitidas: 4 },
  { categoria: "Vegetação e Cultivo", proibidas: 2, permitidas: 1 },
  { categoria: "Uso do Solo e Estruturas", proibidas: 3, permitidas: 1 },
  { categoria: "Segurança e Meio Ambiente", proibidas: 2, permitidas: 2 },
  { categoria: "Governança e Fiscalização", proibidas: 0, permitidas: 2 },
];

export const frequenciaTermos = [
  { termo: "proibido", frequencia: 10, tipo: "proibição" },
  { termo: "proibida", frequencia: 6, tipo: "proibição" },
  { termo: "permitida", frequencia: 1, tipo: "permissão" },
  { termo: "deverá", frequencia: 4, tipo: "obrigação" },
  { termo: "deve", frequencia: 1, tipo: "obrigação" },
  { termo: "não poderá", frequencia: 2, tipo: "obrigação" },
  { termo: "não deverá", frequencia: 1, tipo: "obrigação" },
];

export const distribuicaoRelevancia = [
  { nivel: "Crítica", proibidas: 9, permitidas: 3 },
  { nivel: "Alta", proibidas: 6, permitidas: 4 },
  { nivel: "Média", proibidas: 2, permitidas: 2 },
  { nivel: "Baixa", proibidas: 0, permitidas: 0 },
];

export const resumoGeral = {
  totalProibidas: 18,
  totalPermitidas: 10,
  totalRecomendacoes: 12,
  totalEstrategicas: 5,
  paginasAnalisadas: 9,
  categoriasNormativas: 6,
};
