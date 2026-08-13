import { useState, useMemo } from "react";
import { Search, Zap, ShieldCheck, AlertTriangle, FileText, TrendingUp, Lightbulb, X, Leaf, ArrowRight, Map } from "lucide-react";
import { useLocation } from "wouter";
import {
  acoesProibidas,
  acoesPermitidas,
  recomendacoesAgricultores,
  recomendacoesEstrategicas,
  distribuicaoCategorias,
  frequenciaTermos,
  distribuicaoRelevancia,
  resumoGeral
} from "@/data/enelData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

function SearchableTable({ data, columns, searchFields }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row: any) =>
      searchFields.some((field: string) =>
        String(row[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchFields]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col: any) => (
                <th key={col.key} className="px-4 py-3 text-left font-semibold text-foreground">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row: any, idx: number) => (
              <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                {columns.map((col: any) => (
                  <td key={col.key} className="px-4 py-3 text-muted-foreground">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum resultado encontrado para "{searchTerm}"
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        Mostrando {filtered.length} de {data.length} resultados
      </div>
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredProibidas = useMemo(() => {
    if (!searchTerm) return acoesProibidas;
    return acoesProibidas.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const filteredPermitidas = useMemo(() => {
    if (!searchTerm) return acoesPermitidas;
    return acoesPermitidas.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/enel-logo_da765f36.webp" alt="Logo ENEL – torre de transmissão" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-foreground">
                Dashboard ENEL – Cartilha do Comodatário
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                Análise de Normas de Segurança para Hortas sob Faixas de Transmissão
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
              <FileText className="h-3 w-3 mr-1" />
              {resumoGeral.paginasAnalisadas} páginas analisadas
            </Badge>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              <ShieldCheck className="h-3 w-3 mr-1" />
              {resumoGeral.totalProibidas + resumoGeral.totalPermitidas} normas mapeadas
            </Badge>
            <button
              onClick={() => navigate("/projeto-paisagistico")}
              className="ml-4 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Leaf className="h-4 w-4" />
              Ver Projeto
            </button>
            <a
              href="https://neaufabc.github.io/Hortas-ABCDMRR/#12/-23.6838/-46.4327"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
              title="Mapa de Hortas Urbanas - Grande ABC"
            >
              <Map className="h-4 w-4" />
              Mapa de Hortas
            </a>
            <a 
              href="https://nea.pesquisa.ufabc.edu.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto pl-4 border-l border-border hover:opacity-80 transition-opacity"
              title="Núcleo de Estudos em Agroecologia e Produção Orgânica - UFABC"
            >
              <img src="/nea-ufabc-logo_69437d45.webp" 
                alt="NEA-UFABC" 
                className="h-12 w-auto object-contain" 
              />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/enel-landscape-project-vfinal.jpg')",
          backgroundAttachment: 'fixed',
          filter: 'contrast(1.2) brightness(0.9) saturate(1.05)',
          opacity: 0.75
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/35 to-slate-900/40" />
        <div className="relative container py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 text-white">
              Projeto de Pesquisa – Hortas sob Linhões
            </Badge>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight mb-4">
              Normas de Segurança para Implantação de Hortas sob Faixas de Torres de Transmissão
            </h2>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">
              Análise interativa da Cartilha do Comodatário da ENEL Distribuição São Paulo, mapeando
              ações proibidas, permitidas e recomendações para agricultores que cultivam sob linhas de
              alta tensão. Dados extraídos e validados a partir do documento oficial de 9 páginas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setActiveTab("proibido-permitido")} className="bg-blue-600 hover:bg-blue-700">
                Ver Proibido vs Permitido
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("recomendacoes")} className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Recomendações para Agricultores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="overview" className="py-2 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="proibido-permitido" className="py-2 text-xs md:text-sm">
              <AlertTriangle className="h-4 w-4 mr-1.5" />
              Proibido vs Permitido
            </TabsTrigger>
            <TabsTrigger value="recomendacoes" className="py-2 text-xs md:text-sm">
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              Recomendações
            </TabsTrigger>
            <TabsTrigger value="estrategicas" className="py-2 text-xs md:text-sm">
              <Lightbulb className="h-4 w-4 mr-1.5" />
              Estratégicas
            </TabsTrigger>
          </TabsList>

          {/* Tab: Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-sm border-l-4 border-l-red-600">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Ações Proibidas</p>
                  <p className="text-2xl font-bold font-display text-red-600">{resumoGeral.totalProibidas}</p>
                  <p className="text-xs text-muted-foreground mt-1">Restrições normativas</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-l-4 border-l-green-600">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Permitido/Obrigações</p>
                  <p className="text-2xl font-bold font-display text-green-600">{resumoGeral.totalPermitidas}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ações exigidas ou autorizadas</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-l-4 border-l-amber-600">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Recomendações</p>
                  <p className="text-2xl font-bold font-display text-amber-600">{recomendacoesAgricultores.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Para agricultores</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-l-4 border-l-blue-600">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Estratégicas</p>
                  <p className="text-2xl font-bold font-display text-blue-600">{recomendacoesEstrategicas.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Para gestores e pesquisadores</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-display text-base">Distribuição por Categoria Normativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={distribuicaoCategorias} layout="vertical" margin={{ left: 120, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 13, fontWeight: 500 }} />
                      <YAxis dataKey="categoria" type="category" tick={{ fontSize: 13, fontWeight: 500 }} width={110} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "13px", fontWeight: 500 }}
                      />
                      <Legend wrapperStyle={{ fontSize: "13px", fontWeight: 500 }} />
                      <Bar dataKey="proibidas" name="Proibidas" fill="#DC2626" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 12, fontWeight: 500 }} />
                      <Bar dataKey="permitidas" name="Permitidas" fill="#16A34A" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 12, fontWeight: 500 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-display text-base">Frequência de Termos Normativos no Documento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={frequenciaTermos} margin={{ left: 0, right: 20, top: 10, bottom: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="termo" tick={{ fontSize: 12, fontWeight: 500 }} angle={-45} textAnchor="end" height={100} />
                      <YAxis tick={{ fontSize: 13, fontWeight: 500 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "13px", fontWeight: 500 }}
                      />
                      <Bar dataKey="frequencia" name="Frequência" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 12, fontWeight: 500 }}>
                        {frequenciaTermos.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.tipo === "proibição" ? "#DC2626" : entry.tipo === "permissão" ? "#16A34A" : "#2563EB"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Relevância */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="font-display text-base">Distribuição por Nível de Relevância para Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={distribuicaoRelevancia} margin={{ left: 0, right: 20, top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="nivel" tick={{ fontSize: 13, fontWeight: 500 }} />
                    <YAxis tick={{ fontSize: 13, fontWeight: 500 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "13px", fontWeight: 500 }}
                    />
                    <Legend wrapperStyle={{ fontSize: "13px", fontWeight: 500 }} />
                    <Bar dataKey="proibidas" name="Proibidas" fill="#DC2626" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 12, fontWeight: 500 }} />
                    <Bar dataKey="permitidas" name="Permitidas" fill="#16A34A" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 12, fontWeight: 500 }} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Resumo textual */}
            <Card className="shadow-sm border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="font-display text-base">Síntese da Análise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  A Cartilha do Comodatário da ENEL Distribuição São Paulo estabelece <strong>18 ações proibidas</strong> e <strong>10 obrigações/permissões</strong> distribuídas em 6 categorias normativas. O termo
                  <strong>"proibido"</strong> aparece com maior frequência (10 ocorrências), seguido de <strong>"proibida"</strong> (6 ocorrências), indicando que o documento trata predominantemente de restrições. A categoria <strong>Segurança Elétrica</strong> concentra a maior número de proibições críticas, refletindo o risco inerente à operação sob cabos de alta tensão. Apesar da ênfase em restrições, o documento também estabelece <strong>obrigações de manutenção e conformidade</strong> que o comodatário deve cumprir.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Proibido vs Permitido */}
          <TabsContent value="proibido-permitido" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">Análise Comparativa: Ações Proibidas vs Permitidas</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Visualize lado a lado as ações proibidas (coluna esquerda) e permitidas/obrigações (coluna direita), ordenadas por frequência dos termos no documento.
                </p>
              </div>

              {/* Grid de duas colunas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna PROIBIDO */}
                <Card className="shadow-sm border-l-4 border-l-red-600">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="font-display text-base flex items-center gap-2">
                      <span className="text-red-600 font-bold">✕</span>
                      Ações Proibidas
                      <Badge className="ml-auto bg-red-100 text-red-700 hover:bg-red-100">{filteredProibidas.length}</Badge>
                    </CardTitle>
                    <p className="text-xs text-red-700 mt-2">Ordenadas por frequência do termo "proibido/proibida"</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredProibidas.map((item, idx) => (
                        <div key={item.id} className="p-4 hover:bg-red-50 transition-colors border-b border-red-100 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-red-700 mb-1">{item.texto}</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                <Badge className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-100">{item.categoria}</Badge>
                                <Badge className={`text-xs ${
                                  item.relevanciaSeguranca === "critica" ? "bg-red-100 text-red-700" :
                                  item.relevanciaSeguranca === "alta" ? "bg-orange-100 text-orange-700" :
                                  "bg-yellow-100 text-yellow-700"
                                } hover:bg-opacity-80`}>{item.relevanciaSeguranca}</Badge>
                                <span className="text-xs text-muted-foreground ml-auto">p. {item.pagina}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Coluna PERMITIDO */}
                <Card className="shadow-sm border-l-4 border-l-green-600">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="font-display text-base flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Ações Permitidas/Obrigações
                      <Badge className="ml-auto bg-green-100 text-green-700 hover:bg-green-100">{filteredPermitidas.length}</Badge>
                    </CardTitle>
                    <p className="text-xs text-green-700 mt-2">Ordenadas por frequência do termo "permitido/permitida"</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredPermitidas.map((item, idx) => (
                        <div key={item.id} className="p-4 hover:bg-green-50 transition-colors border-b border-green-100 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-green-700 mb-1">{item.texto}</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                <Badge className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-100">{item.categoria}</Badge>
                                <Badge className={`text-xs ${
                                  item.relevanciaSeguranca === "critica" ? "bg-red-100 text-red-700" :
                                  item.relevanciaSeguranca === "alta" ? "bg-orange-100 text-orange-700" :
                                  "bg-yellow-100 text-yellow-700"
                                } hover:bg-opacity-80`}>{item.relevanciaSeguranca}</Badge>
                                <span className="text-xs text-muted-foreground ml-auto">p. {item.pagina}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Recomendações */}
          <TabsContent value="recomendacoes" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">Recomendações para Agricultores</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  12 recomendações ordenadas por relevância para segurança contra choques elétricos e preservação da manutenção das torres.
                </p>
              </div>

              <div className="space-y-4">
                {recomendacoesAgricultores.map((rec, idx) => (
                  <Card key={rec.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-amber-600 animate-fade-in-up">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white font-display font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-lg text-foreground mb-2">{rec.titulo}</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground mb-3">{rec.descricao}</p>
                          <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
                            <p className="text-xs text-amber-900">
                              <span className="font-semibold">Fundamentação: </span>
                              {rec.fundamentacao}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab: Estratégicas */}
          <TabsContent value="estrategicas" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">Recomendações Estratégicas</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  5 recomendações para gestores e pesquisadores, ordenadas por impacto esperado.
                </p>
              </div>

              <div className="space-y-4">
                {recomendacoesEstrategicas.map((rec, idx) => (
                  <Card key={rec.id} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-600 animate-fade-in-up">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-display font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-lg text-foreground mb-2">{rec.titulo}</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground mb-3">{rec.descricao}</p>
                          <div className="rounded-md bg-blue-50 border border-blue-200 p-3">
                            <p className="text-xs text-blue-900">
                              <span className="font-semibold">Impacto esperado: </span>
                              {rec.impacto}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* CTA para Projeto Paisagístico */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 border-t border-border">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">Projeto Paisagístico (Etapa C)</h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Visualize o projeto de implantação de hortas sob torres de transmissão em visão de cima (2D), com especificações
                técnicas, recomendações de implementação e benefícios socioambientais.
              </p>
            </div>
            <button
              onClick={() => navigate("/projeto-paisagistico")}
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Leaf className="h-5 w-5" />
              Ver Projeto Completo
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA para Galeria de Plantas */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-border">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">Galeria de Plantas Recomendadas</h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Conheça as 50 espécies selecionadas para cultivo em hortas sob torres, em 9 categorias: hortaliças e folhas, temperos e medicinais, tomate, trepadeiras, árvores frutíferas, PANCs, legumes, tubérculos e flores — todas com ciclo rápido, altura reduzida, alta rentabilidade e conformidade com normas de segurança.
              </p>
            </div>
            <button
              onClick={() => navigate("/galeria-plantas")}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Leaf className="h-5 w-5" />
              Ver Galeria
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA para Calculadora */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-border">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">Calculadora de Viabilidade</h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Ferramenta interativa para estimar produção, receita, custos e ROI baseado em área, tipo de cultura e preços de mercado local.
              </p>
            </div>
            <button
              onClick={() => navigate("/calculadora-viabilidade")}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <TrendingUp className="h-5 w-5" />
              Usar Calculadora
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-0">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-2">Sobre este Dashboard</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dashboard analítico desenvolvido para projeto de pesquisa sobre implantação de hortas sob faixas de torres de
                transmissão de alta tensão. Integra Etapas A (Proibido/Permitido), B (Recomendações) e C (Projeto Paisagístico).
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-2">Fontes de Dados</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ENEL Distribuição São Paulo. Cartilha do Comodatário – Direito e Deveres. 9 páginas. Documento oficial sobre uso
                de faixas de linha de transmissão para cultivo de hortas, plantas ornamentais e jardins.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                NEA-UFABC – Relatórios de pesquisa qualitativa sobre as hortas da região do Grande ABC.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-2">Metodologia</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Extração textual via pdftotext e inspeção visual página a página. Classificação por categoria, frequência de
                termos e relevância para segurança elétrica. Projeto paisagístico gerado com especificações técnicas precisas.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Dashboard desenvolvido para fins de pesquisa acadêmica · Universidade Federal de São Paulo · Etapas A, B e C
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
