import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Leaf, Users, Zap, Shield, Info } from "lucide-react";

interface TooltipData {
  id: string;
  label: string;
  type: "torre" | "canteiro" | "construcao" | "banheiro" | "vegetacao" | "arvore" | "meliponario" | "composteira" | "exclusao" | "pergolado" | "espiral" | "mandala" | "minhocario" | "substratos" | "viveiro";
  distancia: string;
  descricao: string;
  especificacoes: string[];
}

const tooltipsData: TooltipData[] = [
  {
    id: "viveiro",
    label: "Viveiro Comunitário",
    type: "viveiro",
    distancia: "Área: 100 m² (10m × 10m)",
    descricao: "Viveiro de alta diversidade com capacidade de 5.000 a 15.000 mudas/ano e banco de sementes crioulas e nativas da Mata Atlântica",
    especificacoes: [
      "Casa de sementes (10 m²): 15–22°C, umidade < 50%, estantes metálicas e armários para milhos crioulos e sementes florestais",
      "Bancadas de semeadura (20 m²): bandejas de 128/200 células para hortaliças, ervas, arbóreas e PANCs",
      "Bancadas de crescimento (25 m²): mudas em tubetes de 55, 110 e 280 cm³",
      "Área de rustificação (25 m²): sombreamento de 30–50% para adaptação das mudas",
      "Substratos (10 m²) e compostagem (10 m²) integrados",
      "Banco de sementes: milhos crioulos, hortaliças crioulas, medicinais e nativas da Mata Atlântica"
    ]
  },
  {
    id: "minhocario",
    label: "Minhocário",
    type: "minhocario",
    distancia: "Posição: Ao lado da composteira",
    descricao: "Sistema de vermicompostagem para produção de húmus de minhoca",
    especificacoes: [
      "Estrutura: 3 caixas empilhadas com tampa",
      "Minhocas californianas (Eisenia foetida)",
      "Produção: húmus sólido e chorume diluível como biofertilizante",
      "Alimentação: resíduos orgânicos da horta e restos vegetais",
      "Integrado ao ciclo composteira → minhocário → substratos"
    ]
  },
  {
    id: "substratos",
    label: "Área de Preparo de Substratos",
    type: "substratos",
    distancia: "Posição: Junto à composteira e ao minhocário",
    descricao: "Local coberto para preparo de substratos destinados às mudas do viveiro",
    especificacoes: [
      "Baias baixas de madeira para terra, areia e matéria orgânica",
      "Bancada com peneira, pás e vasos",
      "Mistura padrão: composto + húmus + terra peneirada",
      "Abastece as bandejas e tubetes do viveiro comunitário",
      "Cobertura simples para proteção da chuva"
    ]
  },
  {
    id: "mandala",
    label: "Horta Mandala Central",
    type: "mandala",
    distancia: "Posição: Centro do terreno | Diâmetro: 10m (~78 m²)",
    descricao: "Canteiro circular em mandala com caminho central, 5 canteiros radiais e 5 anéis concêntricos de cultivo, manejável por uma única pessoa",
    especificacoes: [
      "Anel 1 (interno): folhosas de colheita frequente – alfaces, rúcula, agrião, escarola, almeirão, catalônia, chicória, espinafre e acelga",
      "Anel 2: temperos e medicinais – cebolinha, salsinha, coentro, manjericão, hortelã, alecrim, tomilho, sálvia, orégano, capim-santo, erva-cidreira, gengibre, açafrão-da-terra, boldo, citronela e arruda",
      "Anel 3: flores funcionais – tagetes, capuchinha, calêndula, zínia, cosmos e girassol-anão",
      "Anel 4: hortaliças de porte médio – cenoura, beterraba, cebola, alho-poró, batata-doce, feijão, quiabo, pimentão e jiló",
      "Anel 5 (externo): tomate com tutor vertical, 60cm entre plantas, no lado mais ensolarado",
      "Perímetro: trepadeiras (maracujá, chuchu, ora-pro-nóbis) em pergolado, cerca, arco e espaldeira",
      "Entorno: árvores de meia-sombra – goiaba, acerola, limão, laranja e cambuci"
    ]
  },
  {
    id: "torre-1",
    label: "Torre 1",
    type: "torre",
    distancia: "Posição: Fundo do terreno, a 30m do muro limítrofe",
    descricao: "Primeira torre de distribuição elétrica (lado norte)",
    especificacoes: [
      "Altura: 50m",
      "Espaçamento: 20m até Torre 2",
      "Zona de exclusão: raio de 5m com cerca de proteção",
      "Alinhamento: transversal ao maior comprimento do terreno",
      "Cabos de alta tensão: 3 fases + neutro"
    ]
  },
  {
    id: "torre-2",
    label: "Torre 2",
    type: "torre",
    distancia: "Posição: Fundo do terreno, a 30m do muro limítrofe",
    descricao: "Segunda torre de distribuição elétrica (centro)",
    especificacoes: [
      "Altura: 50m",
      "Espaçamento: 20m até Torre 1 e Torre 3",
      "Zona de exclusão: raio de 5m com cerca de proteção",
      "Alinhamento: transversal ao maior comprimento do terreno"
    ]
  },
  {
    id: "torre-3",
    label: "Torre 3",
    type: "torre",
    distancia: "Posição: Fundo do terreno, a 30m do muro limítrofe",
    descricao: "Terceira torre de distribuição elétrica (lado sul)",
    especificacoes: [
      "Altura: 50m",
      "Espaçamento: 20m até Torre 2",
      "Zona de exclusão: raio de 5m com cerca de proteção",
      "Alinhamento: transversal ao maior comprimento do terreno",
      "Cabos de alta tensão: 3 fases + neutro"
    ]
  },
  {
    id: "exclusao",
    label: "Zona de Exclusão com Cerca",
    type: "exclusao",
    distancia: "Raio: 5m ao redor de cada torre",
    descricao: "Área cercada onde é proibida a ocupação e permanência de pessoas",
    especificacoes: [
      "Raio de exclusão: 5m a partir da base de cada torre",
      "Cerca de proteção: alambrado metálico perimetral",
      "Ocupação humana: proibida no interior da cerca",
      "Acesso: exclusivo das equipes de manutenção da ENEL",
      "Sinalização: placas de advertência de alta tensão"
    ]
  },
  {
    id: "canteiro-1",
    label: "Canteiro 1",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com hortaliças folhosas",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Alface, Couve, Rúcula",
      "Ciclo: 30-80 dias"
    ]
  },
  {
    id: "canteiro-2",
    label: "Canteiro 2",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com hortaliças folhosas",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Almeirão, Espinafre, Alface",
      "Ciclo: 40-50 dias"
    ]
  },
  {
    id: "canteiro-3",
    label: "Canteiro 3",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com temperos e ervas",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Cebolinha, Salsinha, Coentro",
      "Ciclo: 30-45 dias"
    ]
  },
  {
    id: "canteiro-4",
    label: "Canteiro 4",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com temperos e ervas",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Hortelã, Manjericão, Capim-santo, Erva-cidreira",
      "Ciclo: 30-60 dias"
    ]
  },
  {
    id: "canteiro-5",
    label: "Canteiro 5",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com plantas medicinais e PANCs",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Ora-pro-nóbis, Taioba, Peixinho",
      "Ciclo: 60-90 dias"
    ]
  },
  {
    id: "canteiro-6",
    label: "Canteiro 6",
    type: "canteiro",
    distancia: "Distância das torres: 22m (seguro)",
    descricao: "Canteiro elevado com hortaliças folhosas e PANCs",
    especificacoes: [
      "Dimensões: 1,5m × 5m",
      "Espaçamento entre canteiros: ~2m",
      "Altura máxima de plantas: 2m",
      "Plantas: Couve, Rúcula, Taioba",
      "Ciclo: 45-80 dias"
    ]
  },
  {
    id: "pergolado",
    label: "Espaço de Descanso com Pergolados",
    type: "pergolado",
    distancia: "Distância das torres: 30m+ (seguro)",
    descricao: "Área de descanso e visitação sombreada com bancos e 2 pergolados de 4m × 4m",
    especificacoes: [
      "2 pergolados de madeira de 4m × 4m com bancos",
      "Pergolado 1: Maracujá, Chuchu e Ora-pro-nóbis",
      "Pergolado 2: Inhame-trepador, Feijão-de-metro, Cipó-de-São-João e Bertalha",
      "Trepadeiras com flores para sombreamento natural",
      "Altura máxima: 2m (conforme norma de segurança)"
    ]
  },
  {
    id: "espiral",
    label: "Canteiro em Espiral",
    type: "espiral",
    distancia: "Distância das torres: 30m+ (seguro)",
    descricao: "Espaço de visitação acessível para idosos e crianças, com canteiro em espiral de ervas e temperos",
    especificacoes: [
      "Diâmetro: 3m, formato espiral em pedra",
      "Acessibilidade: circulação ampla e plana ao redor",
      "Ervas medicinais e temperos culinários",
      "Plantas: Cebolinha, Salsinha, Hortelã, Coentro, Manjericão, Capim-santo e Erva-cidreira",
      "Design permacultural com microclimas variados"
    ]
  },
  {
    id: "construcao",
    label: "Construção de Alvenaria",
    type: "construcao",
    distancia: "Distância das torres: 30m+ (seguro)",
    descricao: "Depósito de ferramentas e área de descanso",
    especificacoes: [
      "Dimensões: ~4m × 6m",
      "Cobertura: Concreto/metal (sem telhas soltas)",
      "Função: Armazenamento e descanso",
      "Localização: Próxima ao muro perimetral"
    ]
  },
  {
    id: "banheiro",
    label: "Banheiro Químico",
    type: "banheiro",
    distancia: "Distância das torres: 35m+ (seguro)",
    descricao: "Unidade de banheiro químico de alta qualidade",
    especificacoes: [
      "Modelo: Comercial robusto",
      "Manutenção: Limpeza regular",
      "Localização: Próxima à construção",
      "Acesso: Fácil e acessível"
    ]
  },
  {
    id: "vegetacao",
    label: "Vegetação Rasteira Heterogênea",
    type: "vegetacao",
    distancia: "Altura máxima: 1m",
    descricao: "Cobertura vegetal heterogênea em todo o solo do terreno",
    especificacoes: [
      "Tipo: Mosaico de diversas espécies de gramíneas e herbáceas",
      "Altura: Até 1m",
      "Função: Proteção do solo, biodiversidade, controle de erosão",
      "Substitui caminhos pavimentados: sem vias para veículos",
      "Manutenção: Capina regular"
    ]
  },
  {
    id: "arvore-1",
    label: "Árvores Frutíferas (Muro Norte)",
    type: "arvore",
    distancia: "Posição: Junto à cerca que limita o terreno",
    descricao: "Fileira de árvores frutíferas de pequeno porte ao longo do muro norte",
    especificacoes: [
      "Espécies: Abacate, Acerola, Amora, Cambuci",
      "Altura máxima: 2m (poda de contenção)",
      "Plantio em linha junto ao muro perimetral",
      "Produção de frutas para consumo e renda"
    ]
  },
  {
    id: "arvore-2",
    label: "Árvores Frutíferas (Muro Oeste)",
    type: "arvore",
    distancia: "Posição: Junto à cerca que limita o terreno",
    descricao: "Fileira de árvores frutíferas de pequeno porte ao longo do muro oeste",
    especificacoes: [
      "Espécies: Goiaba, Laranja, Limão, Maçã",
      "Altura máxima: 2m (poda de contenção)",
      "Plantio em linha junto ao muro perimetral",
      "Produção de frutas para consumo e renda"
    ]
  },
  {
    id: "arvore-3",
    label: "Árvores Frutíferas (Muro Sul)",
    type: "arvore",
    distancia: "Posição: Junto à cerca que limita o terreno",
    descricao: "Fileira de árvores frutíferas de pequeno porte ao longo do muro sul",
    especificacoes: [
      "Espécies: Mamão, Manga, Mixirica, Urucum",
      "Altura máxima: 2m (poda de contenção)",
      "Plantio em linha junto ao muro perimetral",
      "Produção de frutas para consumo e renda"
    ]
  },
  {
    id: "meliponario",
    label: "Meliponário",
    type: "meliponario",
    distancia: "Distância das torres: 35m+ (seguro)",
    descricao: "Estrutura para criação de abelhas sem ferrão (meliponas)",
    especificacoes: [
      "Função: Polinização e produção de mel",
      "Espécies: Jataí, Mandaçaia, Uruçu",
      "Estrutura: Caixas de madeira empilhadas",
      "Altura: ~1,5m do solo",
      "Benefício: Aumenta produtividade dos canteiros"
    ]
  },
  {
    id: "composteira",
    label: "Composteira",
    type: "composteira",
    distancia: "Distância das torres: 30m+ (seguro)",
    descricao: "Estrutura para compostagem de resíduos orgânicos",
    especificacoes: [
      "Função: Reciclagem de resíduos e produção de adubo",
      "Tipo: Composteira de 3 câmaras",
      "Dimensões: ~2m × 1m × 1,2m",
      "Capacidade: Processamento de resíduos da horta",
      "Ciclo: 3-4 meses para adubo pronto"
    ]
  }
];

interface Tooltip {
  x: number;
  y: number;
  data: TooltipData;
}

export default function ProjetoPaisagistico() {
  const [hoveredTooltip, setHoveredTooltip] = useState<Tooltip | null>(null);

  // Coordenadas SVG normalizadas (0-1000 x 0-1000) para mapeamento na imagem
  // Terreno agora 100m × 40m (comprido × largo)
  const hotspots = [
    // Horta mandala central (10m de diâmetro)
    { id: "mandala", x: 500, y: 480, r: 140 },
    // Viveiro comunitário, minhocário e substratos
    { id: "viveiro", x: 190, y: 320, r: 85 },
    { id: "minhocario", x: 355, y: 870, r: 35 },
    { id: "substratos", x: 455, y: 870, r: 55 },
    // Torres de distribuição (transversais, no fundo do terreno, a 30m do muro)
    { id: "torre-1", x: 650, y: 130, r: 50 },
    { id: "torre-2", x: 745, y: 200, r: 50 },
    { id: "torre-3", x: 880, y: 280, r: 50 },
    // Zona de exclusão cercada (raio 5m em cada torre)
    { id: "exclusao", x: 810, y: 330, r: 35 },
    // Canteiros reduzidos em espaçamento (lado norte)
    { id: "canteiro-1", x: 165, y: 540, r: 40 },
    { id: "canteiro-2", x: 220, y: 520, r: 40 },
    { id: "canteiro-3", x: 275, y: 500, r: 40 },
    // Canteiros reduzidos em espaçamento (lado sul)
    { id: "canteiro-4", x: 215, y: 660, r: 40 },
    { id: "canteiro-5", x: 270, y: 640, r: 40 },
    { id: "canteiro-6", x: 325, y: 620, r: 40 },
    // Espaço de descanso com pergolados e canteiro em espiral
    { id: "pergolado", x: 720, y: 620, r: 80 },
    { id: "espiral", x: 600, y: 800, r: 50 },
    // Estruturas de suporte
    { id: "construcao", x: 155, y: 840, r: 55 },
    { id: "banheiro", x: 185, y: 950, r: 30 },
    { id: "meliponario", x: 240, y: 880, r: 40 },
    { id: "composteira", x: 300, y: 890, r: 40 },
    // Árvores frutíferas (junto aos muros)
    { id: "arvore-1", x: 450, y: 190, r: 45 },
    { id: "arvore-2", x: 55, y: 480, r: 35 },
    { id: "arvore-3", x: 660, y: 890, r: 45 },
    // Vegetação rasteira
    { id: "vegetacao", x: 480, y: 720, r: 40 }
  ];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;

    for (const hotspot of hotspots) {
      const data = tooltipsData.find(d => d.id === hotspot.id);
      if (!data) continue;

      const distance = Math.sqrt(Math.pow(x - hotspot.x, 2) + Math.pow(y - hotspot.y, 2));
      if (distance <= hotspot.r) {
        setHoveredTooltip({
          x: (hotspot.x / 1000) * 100,
          y: (hotspot.y / 1000) * 100,
          data
        });
        return;
      }
    }
    setHoveredTooltip(null);
  };

  const handleMouseLeave = () => {
    setHoveredTooltip(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "torre":
        return "bg-red-100 border-red-300 text-red-900";
      case "canteiro":
        return "bg-green-100 border-green-300 text-green-900";
      case "pergolado":
        return "bg-purple-100 border-purple-300 text-purple-900";
      case "espiral":
        return "bg-teal-100 border-teal-300 text-teal-900";
      case "mandala":
        return "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900";
      case "viveiro":
        return "bg-cyan-100 border-cyan-300 text-cyan-900";
      case "minhocario":
        return "bg-stone-100 border-stone-300 text-stone-900";
      case "substratos":
        return "bg-amber-100 border-amber-300 text-amber-900";
      case "construcao":
        return "bg-orange-100 border-orange-300 text-orange-900";
      case "banheiro":
        return "bg-blue-100 border-blue-300 text-blue-900";
      case "vegetacao":
        return "bg-emerald-100 border-emerald-300 text-emerald-900";
      case "arvore":
        return "bg-lime-100 border-lime-300 text-lime-900";
      case "meliponario":
        return "bg-yellow-100 border-yellow-300 text-yellow-900";
      case "composteira":
        return "bg-amber-100 border-amber-300 text-amber-900";
      case "exclusao":
        return "bg-rose-100 border-rose-400 text-rose-900";
      default:
        return "bg-gray-100 border-gray-300 text-gray-900";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container py-6">
          <Badge className="mb-3 bg-green-600 hover:bg-green-700 text-white">
            Etapa C – Projeto Paisagístico
          </Badge>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Projeto de Implantação de Hortas sob Faixas de Torres de Transmissão
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Vista em perspectiva do terreno de 4.000 m² (100m × 40m) com horta mandala central de 10m de diâmetro (5 canteiros
            radiais e 5 anéis de cultivo), viveiro comunitário de 100 m², torres de transmissão, canteiros de hortaliças folhosas,
            temperos e PANCs (1,5m × 5m), árvores frutíferas de pequeno porte junto à cerca, espaço de descanso com pergolados,
            canteiro em espiral acessível, meliponário, composteira, minhocário, área de preparo de substratos, solo coberto por
            vegetação rasteira heterogênea e infraestrutura de suporte ao agricultor.
          </p>
        </div>
      </div>

      <main className="container py-8 md:py-12">
        {/* Informação interativa */}
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">💡 Dica: Passe o mouse sobre a imagem</p>
            <p>Clique ou passe o mouse sobre torres, canteiros e estruturas para visualizar distâncias de segurança exatas e especificações técnicas.</p>
          </div>
        </div>

        {/* Imagem principal com SVG overlay interativo */}
        <div className="mb-12">
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="relative w-full bg-slate-100" style={{ aspectRatio: "21/9" }}>
              <img src="/enel-landscape-project-vfinal.jpg"
                alt="Projeto paisagístico – vista em perspectiva do terreno com hortas sob torres de transmissão"
                className="w-full h-full object-cover"
              />
              
              {/* SVG Overlay para hotspots */}
              <svg
                className="absolute inset-0 w-full h-full cursor-pointer"
                viewBox="0 0 1000 1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ pointerEvents: "auto" }}
              >
                {hotspots.map((hotspot) => (
                  <circle
                    key={hotspot.id}
                    cx={hotspot.x}
                    cy={hotspot.y}
                    r={hotspot.r}
                    fill="transparent"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="2"
                    className="hover:stroke-blue-500 hover:fill-blue-100 hover:fill-opacity-10 transition-all"
                  />
                ))}
              </svg>

              {/* Tooltip flutuante */}
              {hoveredTooltip && (
                <div
                  className={`absolute z-50 w-80 p-4 rounded-lg border-2 shadow-lg animate-fade-in ${getTypeColor(hoveredTooltip.data.type)}`}
                  style={{
                    left: `${hoveredTooltip.x}%`,
                    top: `${hoveredTooltip.y}%`,
                    transform: "translate(-50%, -120%)"
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-display font-bold text-base">{hoveredTooltip.data.label}</h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-white bg-opacity-50">
                      {hoveredTooltip.data.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-sm font-semibold mb-2">{hoveredTooltip.data.distancia}</p>
                  <p className="text-sm mb-3">{hoveredTooltip.data.descricao}</p>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold mb-2">Especificações:</p>
                    {hoveredTooltip.data.especificacoes.map((spec, idx) => (
                      <div key={idx} className="text-xs flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Seta do tooltip */}
                  <div
                    className={`absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent`}
                    style={{
                      borderTopColor: hoveredTooltip.data.type === "torre" ? "#fee2e2" :
                        hoveredTooltip.data.type === "canteiro" ? "#dcfce7" :
                        hoveredTooltip.data.type === "arvore" ? "#e4fce7" :
                        hoveredTooltip.data.type === "mandala" ? "#fae8ff" :
                        hoveredTooltip.data.type === "viveiro" ? "#cffafe" :
                        hoveredTooltip.data.type === "minhocario" ? "#f5f5f4" :
                        hoveredTooltip.data.type === "substratos" ? "#fef3c7" :
                        hoveredTooltip.data.type === "pergolado" ? "#f3e8ff" :
                        hoveredTooltip.data.type === "espiral" ? "#ccfbf1" :
                        hoveredTooltip.data.type === "construcao" ? "#fed7aa" :
                        hoveredTooltip.data.type === "banheiro" ? "#dbeafe" :
                        hoveredTooltip.data.type === "meliponario" ? "#fef08a" :
                        hoveredTooltip.data.type === "composteira" ? "#fed7aa" :
                        hoveredTooltip.data.type === "exclusao" ? "#ffe4e6" :
                        "#d1fae5",
                      bottom: "-8px",
                      left: "50%",
                      transform: "translateX(-50%)"
                    }}
                  />
                </div>
              )}
            </div>
            <CardContent className="p-4 bg-slate-50 border-t border-border">
              <p className="text-xs text-muted-foreground italic">
                Figura 1: Projeto paisagístico em vista em perspectiva com horta mandala central de 10m de diâmetro (~78 m²,
                caminho central, 5 canteiros radiais e 5 anéis concêntricos de cultivo), torres de transmissão,
                canteiros de hortaliças, temperos e PANCs (1,5m × 5m), árvores frutíferas de pequeno porte junto à cerca,
                espaço de descanso com 2 pergolados (4m × 4m) com trepadeiras, canteiro em espiral acessível (3m de diâmetro),
                viveiro comunitário de 100 m², meliponário, composteira, minhocário, área de preparo de substratos,
                construção de alvenaria, banheiro químico e solo integralmente coberto por
                vegetação rasteira heterogênea. Escala aproximada: 3 torres de 50m de altura, espaçadas 20m entre si,
                transversais ao maior comprimento, no fundo do terreno a 30m do muro limítrofe, cada uma com zona de
                exclusão cercada de 5m de raio; canteiros 1,5m × 5m; terreno total
                100m (comprimento) × 40m (largura).
                <strong> Passe o mouse sobre os elementos para ver detalhes.</strong>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Legenda de cores */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { type: "mandala", label: "Horta Mandala", color: "bg-fuchsia-100 border-fuchsia-300" },
            { type: "viveiro", label: "Viveiro", color: "bg-cyan-100 border-cyan-300" },
            { type: "torre", label: "Torres", color: "bg-red-100 border-red-300" },
            { type: "exclusao", label: "Zona de Exclusão", color: "bg-rose-100 border-rose-400" },
            { type: "canteiro", label: "Canteiros", color: "bg-green-100 border-green-300" },
            { type: "arvore", label: "Árvores", color: "bg-lime-100 border-lime-300" },
            { type: "pergolado", label: "Pergolados", color: "bg-purple-100 border-purple-300" },
            { type: "espiral", label: "Canteiro Espiral", color: "bg-teal-100 border-teal-300" },
            { type: "construcao", label: "Construção", color: "bg-orange-100 border-orange-300" },
            { type: "banheiro", label: "Banheiro", color: "bg-blue-100 border-blue-300" },
            { type: "meliponario", label: "Meliponário", color: "bg-yellow-100 border-yellow-300" },
            { type: "composteira", label: "Composteira", color: "bg-amber-100 border-amber-300" },
            { type: "minhocario", label: "Minhocário", color: "bg-stone-100 border-stone-300" },
            { type: "substratos", label: "Substratos", color: "bg-amber-50 border-amber-200" },
            { type: "vegetacao", label: "Vegetação", color: "bg-emerald-100 border-emerald-300" }
          ].map(item => (
            <div key={item.type} className={`p-3 rounded border-2 text-center text-xs font-semibold ${item.color}`}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Especificações técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Infraestrutura de Transmissão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">Torres de Transmissão</p>
                <p className="text-muted-foreground">
                  3 torres de distribuição elétrica de 50 metros de altura, espaçadas 20 metros entre si e dispostas
                  transversalmente ao maior comprimento do terreno, posicionadas no fundo do terreno a 30 metros do
                  muro limítrofe.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Cobertura do Solo</p>
                <p className="text-muted-foreground">
                  Todo o solo do terreno é coberto por vegetação rasteira heterogênea (mosaico de diversas espécies de
                  gramíneas e herbáceas de até 1m), sem caminhos pavimentados para veículos, protegendo o solo contra
                  erosão e mantendo o livre trânsito das equipes de manutenção da ENEL a pé.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Faixa de Segurança</p>
                <p className="text-muted-foreground">
                  Zona de exclusão com raio de 5 metros ao redor de cada torre, delimitada por cerca de proteção
                  metálica, onde é proibida a ocupação e permanência de pessoas. Acesso restrito às equipes de
                  manutenção da ENEL, com sinalização de advertência de alta tensão.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Componentes Agrícolas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">Canteiros de Hortas</p>
                <p className="text-muted-foreground">
                  Canteiros elevados retangulares de 1,5m × 5m, cultivados predominantemente com hortaliças folhosas
                  (alface, couve, rúcula, almeirão e espinafre), temperos e ervas (cebolinha, salsinha, hortelã,
                  coentro, manjericão, capim-santo e erva-cidreira) e plantas medicinais e PANCs (ora-pro-nóbis,
                  taioba e peixinho).
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Altura de Plantas</p>
                <p className="text-muted-foreground">
                  Todas as culturas mantidas abaixo de 2 metros de altura, conforme norma de segurança. Prioridade a
                  culturas de ciclo rápido (30–80 dias).
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Árvores Frutíferas Tropicais</p>
                <p className="text-muted-foreground">
                  Numerosas árvores frutíferas de pequeno porte (até 2 metros de altura) plantadas principalmente
                  junto à cerca que limita o terreno: Abacate, Acerola, Amora, Cambuci, Goiaba, Laranja, Limão,
                  Maçã, Mamão, Manga, Mixirica e Urucum, mantidas com poda de contenção.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Infraestrutura de suporte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-sm border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-600" />
                Construção de Alvenaria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Pequena estrutura de alvenaria (aproximadamente 4m × 6m) com função de depósito de ferramentas
                agrícolas e área de descanso para o agricultor.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Cobertura:</strong> Telhado de concreto ou metal (sem telhas soltas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Ambiente:</strong> Sombreado, fresco e protegido de chuvas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Localização:</strong> Próxima ao muro perimetral, distante das torres (30m+)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-cyan-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-cyan-600" />
                Banheiro Químico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Unidade de banheiro químico de alta qualidade posicionada próxima à construção de alvenaria,
                garantindo higiene e conforto do agricultor durante o trabalho.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold mt-0.5">•</span>
                  <span><strong>Manutenção:</strong> Limpeza e reabastecimento regular</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold mt-0.5">•</span>
                  <span><strong>Localização:</strong> Acessível, não interferindo com canteiros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold mt-0.5">•</span>
                  <span><strong>Padrão:</strong> Modelo comercial robusto para uso agrícola</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Novos elementos de sustentabilidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-sm border-l-4 border-l-cyan-600 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-cyan-600" />
                Viveiro Comunitário de Alta Diversidade (100 m²)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                Área de 100 m² (retângulo de 10m × 10m) destinada a um viveiro comunitário capaz de produzir entre
                5.000 e 15.000 mudas por ano, dependendo do sistema de cultivo, além de armazenar um banco de sementes
                crioulas e de espécies nativas da Mata Atlântica.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-cyan-50 text-cyan-900">
                      <th className="border border-cyan-200 px-3 py-2 text-left font-semibold whitespace-nowrap">Setor</th>
                      <th className="border border-cyan-200 px-3 py-2 text-left font-semibold whitespace-nowrap">Área</th>
                      <th className="border border-cyan-200 px-3 py-2 text-left font-semibold">Especificações</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Casa de sementes</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">10 m²</td>
                      <td className="border border-cyan-100 px-3 py-2">Climatização natural (15–22°C, umidade &lt; 50%), estantes metálicas, armários para milhos crioulos e sementes florestais, desumidificador ou sílica, mesa de limpeza e classificação</td>
                    </tr>
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Escritório</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">—</td>
                      <td className="border border-cyan-100 px-3 py-2">Gestão do viveiro e registros do banco de sementes</td>
                    </tr>
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Bancadas de semeadura</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">20 m²</td>
                      <td className="border border-cyan-100 px-3 py-2">Bandejas de 128 ou 200 células para hortaliças, ervas, espécies arbóreas e PANCs</td>
                    </tr>
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Bancadas de crescimento</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">25 m²</td>
                      <td className="border border-cyan-100 px-3 py-2">Mudas em tubetes de 55 cm³, 110 cm³ e 280 cm³</td>
                    </tr>
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Área de rustificação</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">25 m²</td>
                      <td className="border border-cyan-100 px-3 py-2">Cobertura com 30–50% de sombreamento, onde as mudas se adaptam antes do plantio definitivo</td>
                    </tr>
                    <tr>
                      <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Substratos + compostagem</td>
                      <td className="border border-cyan-100 px-3 py-2 whitespace-nowrap">10 + 10 m²</td>
                      <td className="border border-cyan-100 px-3 py-2">Preparo de substratos integrado à composteira e ao minhocário do terreno</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Banco de Sementes Crioulas e Nativas</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-cyan-50 text-cyan-900">
                        <th className="border border-cyan-200 px-3 py-2 text-left font-semibold whitespace-nowrap">Grupo</th>
                        <th className="border border-cyan-200 px-3 py-2 text-left font-semibold">Variedades / Espécies</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">A. Milhos crioulos</td>
                        <td className="border border-cyan-100 px-3 py-2">Cateto Amarelo, Cateto Roxo, Asteca, Caiano, Palha Roxa, Branco Oito Carreiras, Cunha, Pixurum, Sabugo Fino e Milho Pipoca Crioulo — ampla diversidade genética, multiplicados com isolamento adequado para evitar cruzamentos indesejados</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">B. Hortaliças crioulas</td>
                        <td className="border border-cyan-100 px-3 py-2">Alface, couve, quiabo, feijão, jiló, pimenta, abóbora, maxixe, pepino e tomate de polinização aberta</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">C. Plantas medicinais</td>
                        <td className="border border-cyan-100 px-3 py-2">Erva-cidreira, capim-santo, alecrim, manjericão, sálvia, hortelã, arruda, boldo, tomilho e citronela</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">D. Nativas da Mata Atlântica – Frutíferas</td>
                        <td className="border border-cyan-100 px-3 py-2">Cambuci (Campomanesia phaea), Uvaia (Eugenia pyriformis), Grumixama (Eugenia brasiliensis), Araçá (Psidium cattleianum), Jabuticaba (Plinia cauliflora), Cereja-do-Rio-Grande (Eugenia involucrata), Pitanga (Eugenia uniflora) e Guabiroba (Campomanesia xanthocarpa)</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">D. Nativas – Restauração</td>
                        <td className="border border-cyan-100 px-3 py-2">Ipê-amarelo, Ipê-roxo, Jequitibá-rosa, Pau-brasil, Cedro-rosa, Guapuruvu, Embaúba, Ingá, Aroeira-pimenteira, Capixingui, Mulungu e Paineira (produção de mudas para plantio fora da faixa de segurança)</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">D. Nativas – Polinizadores</td>
                        <td className="border border-cyan-100 px-3 py-2">Cambará, Assa-peixe, Manacá-da-serra, Quaresmeira, Brinco-de-princesa e maracujás nativos (Passiflora spp.)</td>
                      </tr>
                      <tr>
                        <td className="border border-cyan-100 px-3 py-2 font-semibold whitespace-nowrap">Trepadeiras</td>
                        <td className="border border-cyan-100 px-3 py-2">Maracujá-doce, Maracujá-azedo, Maracujá-suspiro, Ora-pro-nóbis e Cipó-de-São-João</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-stone-500">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-stone-500" />
                Minhocário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Sistema de vermicompostagem instalado ao lado da composteira, produzindo húmus de minhoca e
                biofertilizante líquido para os canteiros e para os substratos do viveiro.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-stone-500 font-bold mt-0.5">•</span>
                  <span><strong>Estrutura:</strong> 3 caixas empilhadas com tampa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-500 font-bold mt-0.5">•</span>
                  <span><strong>Minhocas:</strong> Californianas (Eisenia foetida)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-500 font-bold mt-0.5">•</span>
                  <span><strong>Produtos:</strong> Húmus sólido e chorume diluível (biofertilizante)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-stone-500 font-bold mt-0.5">•</span>
                  <span><strong>Integração:</strong> Ciclo composteira → minhocário → substratos → viveiro</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-amber-500" />
                Área de Preparo de Substratos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Espaço coberto próximo à composteira e ao minhocário, dedicado à mistura e peneiramento de substratos
                para as bandejas e tubetes do viveiro comunitário.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span><strong>Estrutura:</strong> Baias baixas de madeira para terra, areia e matéria orgânica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span><strong>Equipamentos:</strong> Bancada com peneira, pás e vasos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span><strong>Mistura padrão:</strong> Composto + húmus + terra peneirada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span><strong>Proteção:</strong> Cobertura simples contra chuva</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-fuchsia-600 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-fuchsia-600" />
                Horta Mandala Central (10m de diâmetro, ~78 m²)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                No centro do terreno, a horta mandala é o coração produtivo e pedagógico do projeto. Com 10 metros de
                diâmetro e área de aproximadamente 78 m², organiza-se em um caminho central, 5 canteiros radiais e
                5 anéis concêntricos de cultivo, permitindo o manejo confortável por uma única pessoa: as culturas de
                colheita mais frequente ficam próximas do caminho, e as de menor manejo, mais afastadas.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-fuchsia-50 text-fuchsia-900">
                      <th className="border border-fuchsia-200 px-3 py-2 text-left font-semibold whitespace-nowrap">Anel</th>
                      <th className="border border-fuchsia-200 px-3 py-2 text-left font-semibold">Função</th>
                      <th className="border border-fuchsia-200 px-3 py-2 text-left font-semibold">Espécies</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 font-semibold whitespace-nowrap">1 – Interno</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Colheita frequente, manejo constante, próximo do caminho</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Alface (crespa, lisa, americana e roxa), rúcula, agrião, escarola, almeirão, catalônia, chicória, espinafre e acelga</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 font-semibold whitespace-nowrap">2 – Temperos e medicinais</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Colheita diária de folhas e ramos</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Cebolinha, salsinha, coentro, manjericão, hortelã, alecrim, tomilho, sálvia, orégano, capim-santo, erva-cidreira, gengibre, açafrão-da-terra, boldo, citronela e arruda</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 font-semibold whitespace-nowrap">3 – Flores</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Atração de polinizadores e inimigos naturais de pragas; embelezamento</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Tagetes, capuchinha, calêndula, zínia, cosmos e girassol-anão</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 font-semibold whitespace-nowrap">4 – Porte médio</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Hortaliças de ciclo mais longo e menor manejo</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Cenoura, beterraba, cebola, alho-poró, batata-doce, feijão, quiabo, pimentão e jiló</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 font-semibold whitespace-nowrap">5 – Externo</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Tomate no lado mais ensolarado, com tutor vertical e 60cm entre plantas</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Tomate consorciado com manjericão, cebolinha, salsinha, alecrim e tagetes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto">
                <p className="font-semibold text-foreground mb-2">Funções das flores do Anel 3</p>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-fuchsia-50 text-fuchsia-900">
                      <th className="border border-fuchsia-200 px-3 py-2 text-left font-semibold whitespace-nowrap">Flor</th>
                      <th className="border border-fuchsia-200 px-3 py-2 text-left font-semibold">Função</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Tagetes (cravo-de-defunto)</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Ajuda no manejo de nematoides e atrai insetos benéficos</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Capuchinha</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Flor e folhas comestíveis; atrai polinizadores e pode desviar pulgões</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Calêndula</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Atrai abelhas e outros insetos benéficos</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Zínia</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Floresce por muitos meses e atrai borboletas</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Cosmos</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Muito atrativo para polinizadores</td>
                    </tr>
                    <tr>
                      <td className="border border-fuchsia-100 px-3 py-2 whitespace-nowrap">Girassol-anão</td>
                      <td className="border border-fuchsia-100 px-3 py-2">Atrai abelhas e fornece sementes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">Trepadeiras no perímetro</p>
                  <p className="text-muted-foreground">
                    A borda externa da mandala recebe maracujá, chuchu e ora-pro-nóbis, conduzidos em pergolado,
                    cerca, arco e espaldeira, criando um cinturão produtivo vertical de até 2m de altura.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Árvores no entorno</p>
                  <p className="text-muted-foreground">
                    Goiaba, acerola, limão, laranja e cambuci plantadas ao redor da mandala fornecem meia-sombra
                    sem prejudicar a produção, mantidas com poda de contenção em até 2m de altura.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-purple-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Espaço de Descanso e Visitação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Área sombreada de convivência com bancos e 2 pergolados de madeira de 4m × 4m, cobertos por plantas
                trepadeiras com flores que fornecem sombra natural e produção de alimentos.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Pergolado 1:</strong> Maracujá, Chuchu e Ora-pro-nóbis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Pergolado 2:</strong> Inhame-trepador, Feijão-de-metro, Cipó-de-São-João e Bertalha</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Mobiliário:</strong> Bancos de madeira sob e ao redor dos pergolados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Altura:</strong> Estruturas limitadas a 2m, conforme norma de segurança</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-teal-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-teal-600" />
                Canteiro em Espiral Acessível
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Espaço de visitação acessível para idosos e crianças, com canteiro em espiral de 3 metros de diâmetro
                construído em pedra, reunindo ervas medicinais e temperos culinários em diferentes microclimas.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Diâmetro:</strong> 3m em formato espiral (design permacultural)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Plantas:</strong> Cebolinha, Salsinha, Hortelã, Coentro, Manjericão, Capim-santo e Erva-cidreira</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Acessibilidade:</strong> Circulação ampla e plana ao redor, altura de trabalho confortável</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Função:</strong> Educação ambiental e integração comunitária</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-yellow-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-yellow-600" />
                Meliponário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Estrutura dedicada à criação de abelhas sem ferrão (meliponas), espécies nativas da Mata Atlântica que
                polinizam naturalmente os canteiros e produzem mel de alta qualidade.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">•</span>
                  <span><strong>Espécies:</strong> Jataí, Mandaçaia, Uruçu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">•</span>
                  <span><strong>Estrutura:</strong> Caixas de madeira empilhadas (~1,5m de altura)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">•</span>
                  <span><strong>Benefício:</strong> Polinização natural, aumento de produtividade dos canteiros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold mt-0.5">•</span>
                  <span><strong>Localização:</strong> Próxima às árvores frutíferas, distante das torres (35m+)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Leaf className="h-5 w-5 text-amber-600" />
                Composteira
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Sistema de compostagem para reciclagem de resíduos orgânicos da horta, produzindo adubo natural de
                alta qualidade para fertilização dos canteiros.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Tipo:</strong> Composteira de 3 câmaras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Dimensões:</strong> ~2m × 1m × 1,2m</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Ciclo:</strong> 3-4 meses para adubo pronto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span><strong>Localização:</strong> Próxima à construção de alvenaria, distante das torres (30m+)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Benefícios e conformidade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-sm border-l-4 border-l-green-600">
            <CardHeader>
              <CardTitle className="font-display text-sm flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Segurança Operacional
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                O projeto mantém conformidade integral com as normas de segurança da Cartilha do Comodatário:
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Zona de exclusão cercada de 5m de raio ao redor de cada torre, sem ocupação humana</li>
                <li>✓ Torres a 30m do muro limítrofe, com acesso livre para manutenção</li>
                <li>✓ Solo coberto por vegetação rasteira heterogênea, limpo e livre de obstáculos</li>
                <li>✓ Altura de vegetação limitada a 2 metros</li>
                <li>✓ Nenhuma estrutura vertical ou árvore de grande porte próxima aos cabos</li>
                <li>✓ Irrigação localizada (sem aspersão ascendente)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="font-display text-sm flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Continuidade de Manutenção
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                A disposição do projeto facilita operações de manutenção da ENEL:
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Acesso irrestrito às torres em qualquer horário</li>
                <li>✓ Faixa central desobstruída para trânsito das equipes de manutenção</li>
                <li>✓ Visibilidade clara das estruturas e cabos</li>
                <li>✓ Espaço para posicionamento de guinchos e plataformas</li>
                <li>✓ Sem interferência de canteiros ou estruturas agrícolas</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle className="font-display text-sm flex items-center gap-2">
                <Leaf className="h-5 w-5 text-amber-600" />
                Benefícios Socioambientais
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Coexistência produtiva entre infraestrutura energética e agricultura urbana:
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Produção de alimentos saudáveis e frescos</li>
                <li>✓ Geração de renda para agricultores urbanos</li>
                <li>✓ Melhoria da qualidade de vida e segurança alimentar</li>
                <li>✓ Vigilância natural das torres pela presença do agricultor</li>
                <li>✓ Redução de invasões e acúmulo de lixo</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recomendações de implementação */}
        <Card className="shadow-sm border-l-4 border-l-purple-600 mb-12">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              Recomendações de Implementação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">1. Planejamento e Aprovação</p>
              <p className="text-muted-foreground">
                Validar o projeto com a ENEL Distribuição São Paulo antes da implantação. Obter autorização formal
                via Contrato de Comodato, especificando direitos, deveres e condições de uso.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">2. Capacitação de Agricultores</p>
              <p className="text-muted-foreground">
                Realizar treinamento obrigatório sobre segurança elétrica, distâncias de segurança, procedimentos em
                caso de emergência e conformidade com a cartilha normativa.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">3. Manutenção de Registros</p>
              <p className="text-muted-foreground">
                Manter cópia do contrato de comodato no local, em local visível, para apresentação à fiscalização da
                ENEL. Documentar atividades agrícolas e manutenção do terreno.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">4. Protocolo de Evacuação</p>
              <p className="text-muted-foreground">
                Estabelecer procedimento claro para saída temporária do agricultor quando solicitado pela ENEL para
                manutenção programada ou emergencial. Comunicação rápida e sem penalidades.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">5. Monitoramento Contínuo</p>
              <p className="text-muted-foreground">
                Realizar inspeções periódicas (mensais) para verificar conformidade com normas, altura de plantas,
                estado da cobertura vegetal e integridade das estruturas.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
