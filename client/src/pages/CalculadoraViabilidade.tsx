import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, DollarSign, Zap } from "lucide-react";
import { calcularViabilidade, plantasRecomendadas } from "@/data/plantasData";

export default function CalculadoraViabilidade() {
  const [cultura, setCultura] = useState("Alface");
  const [area, setArea] = useState(50);
  const [precoMedio, setPrecoMedio] = useState(12);
  const [resultado, setResultado] = useState(calcularViabilidade(cultura, area, precoMedio));

  const handleCalcular = () => {
    const novoResultado = calcularViabilidade(cultura, area, precoMedio);
    setResultado(novoResultado);
  };

  const culturaAtual = plantasRecomendadas.find((p) => p.nome === cultura);

  const dados = [
    { nome: "Receita Bruta", valor: resultado.receitaBruta, fill: "#16A34A" },
    { nome: "Custos", valor: resultado.custosEstimados, fill: "#DC2626" },
    { nome: "Lucro Líquido", valor: resultado.lucroLiquido, fill: "#2563EB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container py-6">
          <Badge className="mb-3 bg-blue-600 hover:bg-blue-700 text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            Calculadora de Viabilidade
          </Badge>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Calcule a Rentabilidade de sua Horta
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Ferramenta interativa para estimar produção, receita, custos e ROI baseado em área, tipo de cultura e preços de mercado.
          </p>
        </div>
      </div>

      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Inputs */}
          <Card className="shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-display text-base">Parâmetros de Cálculo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Cultura</label>
                <Select value={cultura} onValueChange={setCultura}>
                  {plantasRecomendadas.map((p) => (
                    <option key={p.id} value={p.nome}>
                      {p.nome}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Área (m²): {area}
                </label>
                <Input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">Mínimo: 10 m² | Máximo: 500 m²</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Preço Médio (R$/kg): R$ {precoMedio.toFixed(2)}
                </label>
                <Input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={precoMedio}
                  onChange={(e) => setPrecoMedio(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Preço recomendado: {culturaAtual?.precoCultivar}
                </p>
              </div>

              <Button onClick={handleCalcular} className="w-full bg-blue-600 hover:bg-blue-700">
                Calcular Viabilidade
              </Button>
            </CardContent>
          </Card>

          {/* KPIs */}
          <div className="lg:col-span-2 space-y-4">
            {/* Receita Bruta */}
            <Card className="shadow-sm border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Receita Bruta</p>
                    <p className="text-3xl font-bold font-display text-green-600">
                      R$ {resultado.receitaBruta.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {resultado.producaoEstimada.toFixed(1)} kg × R$ {resultado.precoMedio.toFixed(2)}/kg
                    </p>
                  </div>
                  <div className="rounded-xl p-3 bg-green-50">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custos */}
            <Card className="shadow-sm border-l-4 border-l-red-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Custos Estimados</p>
                    <p className="text-3xl font-bold font-display text-red-600">
                      R$ {resultado.custosEstimados.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      R$ {(resultado.custosEstimados / area).toFixed(2)}/m² (sementes, adubos, irrigação)
                    </p>
                  </div>
                  <div className="rounded-xl p-3 bg-red-50">
                    <Zap className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lucro Líquido */}
            <Card className="shadow-sm border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Lucro Líquido (por ciclo)</p>
                    <p className="text-3xl font-bold font-display text-blue-600">
                      R$ {resultado.lucroLiquido.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      ROI: <span className="font-semibold">{resultado.roi.toFixed(1)}%</span> por ciclo
                    </p>
                  </div>
                  <div className="rounded-xl p-3 bg-blue-50">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gráfico */}
        <Card className="shadow-sm mb-12">
          <CardHeader>
            <CardTitle className="font-display text-base">Análise Financeira</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dados} margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }}
                  formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}`}
                />
                <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                  {dados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projeção Anual */}
        <Card className="shadow-sm border-l-4 border-l-purple-600">
          <CardHeader>
            <CardTitle className="font-display text-base">Projeção Anual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Ciclos por Ano</p>
                <p className="text-2xl font-bold font-display text-purple-600">{resultado.colheitasAno}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {resultado.diasCiclo} dias por ciclo
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Lucro Anual Estimado</p>
                <p className="text-2xl font-bold font-display text-emerald-600">
                  R$ {(resultado.lucroLiquido * resultado.colheitasAno).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {resultado.colheitasAno} ciclos × R$ {resultado.lucroLiquido.toFixed(0)}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Lucro por m² (anual)</p>
                <p className="text-2xl font-bold font-display text-amber-600">
                  R$ {((resultado.lucroLiquido * resultado.colheitasAno) / area).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Rentabilidade por metro quadrado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas importantes */}
        <Card className="shadow-sm bg-blue-50 border-0 mt-12">
          <CardContent className="p-6">
            <h3 className="font-display font-bold text-lg text-blue-900 mb-3">Notas Importantes</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Os valores de custos são estimativas baseadas em dados médios de mercado. Custos reais podem variar conforme região, insumos e técnicas utilizadas.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>A produção estimada assume condições ideais de cultivo, irrigação adequada e manejo fitossanitário correto.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Preços de mercado variam sazonalmente. Recomenda-se pesquisar preços locais antes de implantar a horta.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>O ROI é calculado por ciclo de cultivo. A rentabilidade anual depende do número de ciclos possíveis no ano.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Consulte a Cartilha do Comodatário da ENEL para garantir conformidade com normas de segurança.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container py-8">
          <p className="text-xs text-muted-foreground text-center">
            Calculadora de Viabilidade · Ferramenta de Apoio para Planejamento de Hortas sob Torres de Transmissão
          </p>
        </div>
      </footer>
    </div>
  );
}
