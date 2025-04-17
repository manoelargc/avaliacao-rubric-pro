
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronLeft, ChevronRight, Info, LockIcon, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// Example course data
const cursos = {
  "1": { id: "1", nome: "Curso Teste", semestre: "1. Semestre", ano: "2025" },
};

// Example disciplines data
const disciplinas = {
  "1": { id: "1", nome: "Disciplina A", cursoId: "1" },
};

// Example assessments data
const avaliacoes = {
  "1": { id: "1", nome: "Trabalho Parcial", disciplinaId: "1" },
};

// Example rubric for assessment
const rubrica = {
  criterios: [
    { id: "1", nome: "Clareza na apresentação" },
    { id: "2", nome: "Profundidade do conteúdo" },
    { id: "3", nome: "Originalidade" },
    { id: "4", nome: "Recursos visuais" },
  ],
  niveis: [
    { id: "1", nome: "Insatisfatório", pontos: 1 },
    { id: "2", nome: "Básico", pontos: 2 },
    { id: "3", nome: "Proficiente", pontos: 3 },
    { id: "4", nome: "Exemplar", pontos: 4 },
  ],
  descricoes: {
    "1": {
      "1": "Apresentação confusa e desorganizada, difícil de seguir.",
      "2": "Apresentação compreensível, mas com alguns pontos confusos.",
      "3": "Apresentação clara e bem organizada.",
      "4": "Apresentação excepcionalmente clara, estruturada e envolvente."
    },
    "2": {
      "1": "Conteúdo superficial, faltam conceitos importantes.",
      "2": "Cobre conceitos básicos, mas falta aprofundamento.",
      "3": "Bom nível de detalhe e conexões entre conceitos.",
      "4": "Análise profunda, com conexões interdisciplinares e insights originais."
    },
    "3": {
      "1": "Ideias derivadas inteiramente de outras fontes.",
      "2": "Algumas ideias originais, mas principalmente convencionais.",
      "3": "Abordagem criativa com várias ideias originais.",
      "4": "Abordagem inovadora que expande o campo de conhecimento."
    },
    "4": {
      "1": "Recursos visuais inadequados ou ausentes.",
      "2": "Recursos visuais básicos que apoiam minimamente o conteúdo.",
      "3": "Recursos visuais bem elaborados que complementam a apresentação.",
      "4": "Recursos visuais excepcionais que elevam significativamente a apresentação."
    }
  }
};

// Example students
const alunos = [
  { id: "1", nome: "João Silva" },
  { id: "2", nome: "Maria Oliveira" },
  { id: "3", nome: "Pedro Santos" },
];

const Avaliacao = () => {
  const { cursoId, disciplinaId, avaliacaoId } = useParams<{ 
    cursoId: string, 
    disciplinaId: string, 
    avaliacaoId: string 
  }>();
  const [user, setUser] = useState<{ name?: string }>({});
  const navigate = useNavigate();
  
  const [alunoAtual, setAlunoAtual] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState<Record<string, Record<string, string>>>({});
  const [feedback, setFeedback] = useState("");
  const [anotacoes, setAnotacoes] = useState("");
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Initialize empty assessments for each student
    const inicialAvaliacoes = {};
    alunos.forEach(aluno => {
      inicialAvaliacoes[aluno.id] = {};
    });
    setAvaliacoes(inicialAvaliacoes);
  }, []);
  
  if (!cursoId || !cursos[cursoId] || !disciplinaId || !disciplinas[disciplinaId] || !avaliacaoId || !avaliacoes[avaliacaoId]) {
    return <div>Curso, disciplina ou avaliação não encontrada.</div>;
  }
  
  const curso = cursos[cursoId];
  const disciplina = disciplinas[disciplinaId];
  const avaliacao = avaliacoes[avaliacaoId];
  const alunoAtualObj = alunos[alunoAtual];
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  
  const selecionarNivel = (criterioId: string, nivelId: string) => {
    const novasAvaliacoes = { ...avaliacoes };
    if (!novasAvaliacoes[alunoAtualObj.id]) {
      novasAvaliacoes[alunoAtualObj.id] = {};
    }
    novasAvaliacoes[alunoAtualObj.id][criterioId] = nivelId;
    setAvaliacoes(novasAvaliacoes);
    
    // Recalculate total score
    let total = 0;
    rubrica.criterios.forEach(criterio => {
      const nivelSelecionado = novasAvaliacoes[alunoAtualObj.id][criterio.id];
      if (nivelSelecionado) {
        const nivel = rubrica.niveis.find(n => n.id === nivelSelecionado);
        if (nivel) {
          total += nivel.pontos;
        }
      }
    });
    setPontuacaoTotal(total);
  };
  
  const salvarEVoltar = () => {
    toast.success("Avaliação salva com sucesso.");
    navigate(`/cursos/${cursoId}/disciplinas/${disciplinaId}/avaliacoes`);
  };
  
  const salvarEAnterior = () => {
    toast.success("Avaliação salva com sucesso.");
    if (alunoAtual > 0) {
      setAlunoAtual(alunoAtual - 1);
      setFeedback("");
      setAnotacoes("");
    }
  };
  
  const salvarEProximo = () => {
    toast.success("Avaliação salva com sucesso.");
    if (alunoAtual < alunos.length - 1) {
      setAlunoAtual(alunoAtual + 1);
      setFeedback("");
      setAnotacoes("");
    }
  };
  
  const getNivelClasses = (criterioId: string, nivelId: string) => {
    const isSelecionado = avaliacoes[alunoAtualObj.id]?.[criterioId] === nivelId;
    return `p-4 border hover:bg-accent transition-colors cursor-pointer ${
      isSelecionado ? "bg-primary/10 border-primary" : ""
    }`;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 ml-20 p-6">
          <div className="container flex items-center justify-between mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/cursos">Cursos e Disciplinas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/cursos/${cursoId}`}>{curso.nome}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/cursos/${cursoId}/disciplinas/${disciplinaId}/avaliacoes`}>
                    {disciplina.nome}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {avaliacao.nome}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <span className="hidden md:inline-block">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-2">
                    <Link to="/perfil" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <Info className="h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <Info className="h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {avaliacao.nome}
                  </h1>
                  <p className="text-muted-foreground">
                    Avaliando: {alunoAtualObj.nome} ({alunoAtual + 1} de {alunos.length})
                  </p>
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-md">
                  <span className="text-sm text-muted-foreground">Pontuação</span>
                  <p className="text-2xl font-bold">{pontuacaoTotal} / {rubrica.criterios.length * 4}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-x-auto rounded-md border mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Critérios</TableHead>
                  {rubrica.niveis.map(nivel => (
                    <TableHead key={nivel.id}>
                      {nivel.nome} ({nivel.pontos} {nivel.pontos === 1 ? 'ponto' : 'pontos'})
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rubrica.criterios.map(criterio => (
                  <TableRow key={criterio.id}>
                    <TableCell className="font-medium">{criterio.nome}</TableCell>
                    {rubrica.niveis.map(nivel => (
                      <TableCell 
                        key={nivel.id} 
                        className={getNivelClasses(criterio.id, nivel.id)}
                        onClick={() => selecionarNivel(criterio.id, nivel.id)}
                      >
                        {rubrica.descricoes[criterio.id]?.[nivel.id] || "Sem descrição"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium">Feedback do Professor</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MessageSquare className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Este feedback será visível para o aluno</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite um feedback para o aluno..."
                className="min-h-[150px]"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium">Anotações para o Professor</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LockIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estas anotações são privadas e não serão visíveis para o aluno</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea 
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
                placeholder="Anotações privadas sobre esta avaliação..."
                className="min-h-[150px]"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={salvarEAnterior}
                    disabled={alunoAtual === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Salvar e Anterior
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salvar e ir para o aluno anterior</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={salvarEVoltar}
                  >
                    Salvar e Fechar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salvar e voltar para a lista de avaliações</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={salvarEProximo}
                  disabled={alunoAtual === alunos.length - 1}
                >
                  Salvar e Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Salvar e ir para o próximo aluno</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Avaliacao;
