import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplets, Clock, TrendingUp } from "lucide-react";
import { plantasRecomendadas } from "@/data/plantasData";
import { useState } from "react";

const tiposCores: Record<string, { bg: string; text: string }> = {
  "hortaliças e folhas": { bg: "bg-green-100", text: "text-green-700" },
  "temperos e medicinais": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "tomate": { bg: "bg-red-100", text: "text-red-700" },
  "trepadeiras": { bg: "bg-purple-100", text: "text-purple-700" },
  "árvores frutíferas": { bg: "bg-lime-100", text: "text-lime-700" },
  "PANCs": { bg: "bg-teal-100", text: "text-teal-700" },
  "legumes": { bg: "bg-amber-100", text: "text-amber-700" },
  "tubérculos": { bg: "bg-orange-100", text: "text-orange-700" },
  "flores": { bg: "bg-pink-100", text: "text-pink-700" }
};

const categorias = [
  "todas",
  "hortaliças e folhas",
  "temperos e medicinais",
  "tomate",
  "trepadeiras",
  "árvores frutíferas",
  "PANCs",
  "legumes",
  "tubérculos",
  "flores"
];

export default function GaleriaPlantas() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
  const plantasFiltradas =
    categoriaAtiva === "todas"
      ? plantasRecomendadas
      : plantasRecomendadas.filter((p) => p.tipo === categoriaAtiva);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container py-6">
          <Badge className="mb-3 bg-green-600 hover:bg-green-700 text-white">
            <Leaf className="h-3 w-3 mr-1" />
            Galeria de Plantas
          </Badge>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            50 Plantas Recomendadas para Hortas sob Torres
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Conheça as 50 espécies selecionadas para cultivo em hortas sob faixas de transmissão de alta tensão,
            organizadas em 9 categorias: hortaliças e folhas, temperos e medicinais, tomate, trepadeiras,
            árvores frutíferas, PANCs, legumes, tubérculos e flores. Cada planta foi escolhida por ciclo rápido,
            altura reduzida, rentabilidade e conformidade com normas de segurança.
          </p>
        </div>
      </div>

      <main className="container py-12">
        {/* Filtro por categoria */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map((cat) => {
            const ativa = categoriaAtiva === cat;
            const qtd = cat === "todas" ? plantasRecomendadas.length : plantasRecomendadas.filter((p) => p.tipo === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                  ativa
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-card border-border text-muted-foreground hover:border-green-400 hover:text-green-700"
                }`}
              >
                {cat} ({qtd})
              </button>
            );
          })}
        </div>

        {/* Grid de plantas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plantasFiltradas.map((planta) => {
            const corInfo = tiposCores[planta.tipo] ?? { bg: "bg-gray-100", text: "text-gray-700" };
            return (
              <Card key={planta.id} className="shadow-sm hover:shadow-lg transition-shadow overflow-hidden border-0">
                {/* Cabeçalho com cor por tipo */}
                <div className={`${corInfo.bg} p-6 flex items-start justify-between`}>
                  <div>
                    <h3 className={`font-display font-bold text-xl ${corInfo.text} mb-1`}>{planta.nome}</h3>
                    <p className={`text-sm ${corInfo.text} opacity-75`}>{planta.nomeComum}</p>
                  </div>
                  <span className="text-4xl">{planta.imagemUrl}</span>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Tipo */}
                  <div>
                    <Badge className={`${corInfo.bg} ${corInfo.text} border-0 capitalize`}>
                      {planta.tipo}
                    </Badge>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm leading-relaxed text-muted-foreground">{planta.descricao}</p>

                  {/* Especificações */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-foreground">Ciclo:</span>
                      <span className="text-muted-foreground">{planta.ciclo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-foreground">Altura máxima:</span>
                      <span className="text-muted-foreground">{planta.alturaMaxima}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                      <span className="font-semibold text-foreground">Produção:</span>
                      <span className="text-muted-foreground">{planta.producaoEstimada}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💰</span>
                      <span className="font-semibold text-foreground">Preço:</span>
                      <span className="text-muted-foreground">{planta.precoCultivar}</span>
                    </div>
                  </div>

                  {/* Benefícios */}
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-2">Benefícios:</p>
                    <ul className="space-y-1">
                      {planta.beneficios.map((beneficio, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cuidados */}
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-2">Cuidados:</p>
                    <ul className="space-y-1">
                      {planta.cuidados.map((cuidado, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{cuidado}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Resumo e recomendações */}
        <Card className="shadow-sm border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="font-display text-lg">Critérios de Seleção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              As 50 plantas recomendadas foram selecionadas com base nos seguintes critérios:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="font-semibold text-foreground">Segurança Elétrica</p>
                  <p className="text-muted-foreground">Altura máxima &lt; 2 metros, sem árvores ou estruturas altas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">⏱️</span>
                <div>
                  <p className="font-semibold text-foreground">Ciclo Rápido</p>
                  <p className="text-muted-foreground">30-80 dias, permitindo múltiplas colheitas por ano</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">💰</span>
                <div>
                  <p className="font-semibold text-foreground">Rentabilidade</p>
                  <p className="text-muted-foreground">Preços de mercado competitivos e demanda consistente</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">🌱</span>
                <div>
                  <p className="font-semibold text-foreground">Sustentabilidade</p>
                  <p className="text-muted-foreground">Baixa demanda hídrica, resistência a pragas, valor nutricional</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container py-8">
          <p className="text-xs text-muted-foreground text-center">
            Galeria de Plantas · Projeto de Pesquisa sobre Hortas sob Torres de Transmissão · ENEL Distribuição São Paulo
          </p>
        </div>
      </footer>
    </div>
  );
}
