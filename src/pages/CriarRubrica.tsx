
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Info, 
  Save, 
  Upload,
  ArrowLeft
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// Types for the rubrica model
interface Criterio {
  id: string;
  nome: string;
}

interface Nivel {
  id: string;
  nome: string;
  pontos: number;
}

interface Celula {
  criterioId: string;
  nivelId: string;
  descricao: string;
}

interface Rubrica {
  id: string;
  nome: string;
  publica: boolean;
  criterios: Criterio[];
  niveis: Nivel[];
  celulas: Celula[];
  cursos: string[];
  disciplinas: string[];
}

const CriarRubrica = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rubricaId = searchParams.get('id');
  
  const [rubrica, setRubrica] = useState<Rubrica>({
    id: rubricaId || Date.now().toString(),
    nome: "",
    publica: false,
    criterios: [
      { id: "c1", nome: "Critério 1" },
      { id: "c2", nome: "Critério 2" },
    ],
    niveis: [
      { id: "n1", nome: "Level 1", pontos: 1 },
      { id: "n2", nome: "Level 2", pontos: 2 },
      { id: "n3", nome: "Level 3", pontos: 3 },
    ],
    celulas: [],
    cursos: [],
    disciplinas: [],
  });
  
  const [novoCurso, setNovoCurso] = useState("");
  const [novaDisciplina, setNovaDisciplina] = useState("");
  
  // Carrega dados da rubrica se estiver editando
  useEffect(() => {
    if (rubricaId) {
      // Simulando carregamento de dados
      // Em uma aplicação real, você buscaria estes dados de uma API
      if (rubricaId === "1") {
        setRubrica({
          id: "1",
          nome: "Modelo de Avaliação de Projeto Final",
          publica: true,
          criterios: [
            { id: "c1", nome: "Apresentação" },
            { id: "c2", nome: "Conteúdo" },
            { id: "c3", nome: "Criatividade" },
          ],
          niveis: [
            { id: "n1", nome: "Insuficiente", pontos: 1 },
            { id: "n2", nome: "Básico", pontos: 2 },
            { id: "n3", nome: "Bom", pontos: 3 },
            { id: "n4", nome: "Excelente", pontos: 4 },
          ],
          celulas: [
            { criterioId: "c1", nivelId: "n1", descricao: "Apresentação desorganizada" },
            { criterioId: "c1", nivelId: "n2", descricao: "Apresentação básica" },
            { criterioId: "c1", nivelId: "n3", descricao: "Boa apresentação" },
            { criterioId: "c1", nivelId: "n4", descricao: "Apresentação excelente" },
          ],
          cursos: ["Engenharia", "Computação", "Design"],
          disciplinas: ["Projetos", "Metodologia", "Programação"],
        });
      }
    }
  }, [rubricaId]);
  
  // Adicionar um novo critério
  const adicionarCriterio = () => {
    const novoCriterio: Criterio = {
      id: `c${Date.now()}`,
      nome: `Critério ${rubrica.criterios.length + 1}`,
    };
    
    setRubrica({
      ...rubrica,
      criterios: [...rubrica.criterios, novoCriterio],
    });
  };
  
  // Adicionar um novo nível
  const adicionarNivel = () => {
    const novoNivel: Nivel = {
      id: `n${Date.now()}`,
      nome: `Level ${rubrica.niveis.length + 1}`,
      pontos: rubrica.niveis.length + 1,
    };
    
    setRubrica({
      ...rubrica,
      niveis: [...rubrica.niveis, novoNivel],
    });
  };
  
  // Remover um critério
  const removerCriterio = (id: string) => {
    setRubrica({
      ...rubrica,
      criterios: rubrica.criterios.filter(criterio => criterio.id !== id),
      celulas: rubrica.celulas.filter(celula => celula.criterioId !== id),
    });
  };
  
  // Remover um nível
  const removerNivel = (id: string) => {
    setRubrica({
      ...rubrica,
      niveis: rubrica.niveis.filter(nivel => nivel.id !== id),
      celulas: rubrica.celulas.filter(celula => celula.nivelId !== id),
    });
  };
  
  // Atualizar o valor de uma célula
  const atualizarCelula = (criterioId: string, nivelId: string, descricao: string) => {
    const celulaExistente = rubrica.celulas.find(
      c => c.criterioId === criterioId && c.nivelId === nivelId
    );
    
    if (celulaExistente) {
      setRubrica({
        ...rubrica,
        celulas: rubrica.celulas.map(c => 
          c.criterioId === criterioId && c.nivelId === nivelId
            ? { ...c, descricao }
            : c
        ),
      });
    } else {
      setRubrica({
        ...rubrica,
        celulas: [...rubrica.celulas, { criterioId, nivelId, descricao }],
      });
    }
  };
  
  // Atualizar nome do critério
  const atualizarNomeCriterio = (id: string, nome: string) => {
    setRubrica({
      ...rubrica,
      criterios: rubrica.criterios.map(criterio => 
        criterio.id === id ? { ...criterio, nome } : criterio
      ),
    });
  };
  
  // Atualizar nome e pontos do nível
  const atualizarNivel = (id: string, nome: string, pontos: number) => {
    setRubrica({
      ...rubrica,
      niveis: rubrica.niveis.map(nivel => 
        nivel.id === id ? { ...nivel, nome, pontos } : nivel
      ),
    });
  };
  
  // Adicionar curso
  const adicionarCurso = () => {
    if (novoCurso.trim() && !rubrica.cursos.includes(novoCurso.trim())) {
      setRubrica({
        ...rubrica,
        cursos: [...rubrica.cursos, novoCurso.trim()],
      });
      setNovoCurso("");
    }
  };
  
  // Adicionar disciplina
  const adicionarDisciplina = () => {
    if (novaDisciplina.trim() && !rubrica.disciplinas.includes(novaDisciplina.trim())) {
      setRubrica({
        ...rubrica,
        disciplinas: [...rubrica.disciplinas, novaDisciplina.trim()],
      });
      setNovaDisciplina("");
    }
  };
  
  // Remover curso
  const removerCurso = (curso: string) => {
    setRubrica({
      ...rubrica,
      cursos: rubrica.cursos.filter(c => c !== curso),
    });
  };
  
  // Remover disciplina
  const removerDisciplina = (disciplina: string) => {
    setRubrica({
      ...rubrica,
      disciplinas: rubrica.disciplinas.filter(d => d !== disciplina),
    });
  };
  
  // Salvar rubrica
  const salvarRubrica = () => {
    // Aqui você enviaria os dados para a API
    console.log("Salvando rubrica:", rubrica);
    toast.success("Rubrica salva com sucesso!");
  };
  
  // Publicar rubrica
  const publicarRubrica = () => {
    // Aqui você enviaria os dados para a API e marcaria como publicada
    console.log("Publicando rubrica:", rubrica);
    toast.success("Rubrica publicada com sucesso!");
    navigate("/gerenciador-rubricas");
  };
  
  // Encontrar o valor de uma célula
  const getCelulaValor = (criterioId: string, nivelId: string): string => {
    const celula = rubrica.celulas.find(
      c => c.criterioId === criterioId && c.nivelId === nivelId
    );
    return celula?.descricao || "";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 ml-20">
        <div className="container mx-auto p-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground flex items-center">
            <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={() => navigate("/gerenciador-rubricas")}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Rubricas
            </Button>
            <span className="mx-2">/</span>
            <span className="font-medium text-foreground">Criar Modelo</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Crie ou edite seu modelo de rubrica</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* Título da página */}
          <h1 className="text-2xl font-bold mb-6">Rubrica de Avaliação – Modelo Personalizado</h1>
          
          {/* Configurações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center">
                    <Label htmlFor="nome">Nome do Modelo</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Como chamar sua rubrica?</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Input 
                  id="nome" 
                  value={rubrica.nome} 
                  onChange={(e) => setRubrica({...rubrica, nome: e.target.value})}
                  placeholder="Ex: Avaliação de Apresentação de Projeto"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <div className="flex items-center">
                    <Switch 
                      id="publica"
                      checked={rubrica.publica}
                      onCheckedChange={(checked) => setRubrica({...rubrica, publica: checked})}
                    />
                    <Label htmlFor="publica" className="ml-2">Pública</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tornar disponível para todos</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          {/* Ações de adição de linhas e colunas */}
          <div className="flex space-x-4 mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={adicionarCriterio} variant="outline" className="border-dashed">
                    <Plus className="mr-2 h-4 w-4" />
                    Linha +
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar critério</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={adicionarNivel} variant="outline" className="border-dashed">
                    <Plus className="mr-2 h-4 w-4" />
                    Coluna +
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar nível</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Tabela de Rubrica */}
          <div className="overflow-x-auto mb-8">
            <Card className="p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-40 p-2 border-b"></th>
                    {rubrica.niveis.map((nivel) => (
                      <th key={nivel.id} className="p-2 border-b min-w-[200px]">
                        <div className="flex items-center mb-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="cursor-move mr-2"
                                >
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Arraste para reordenar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Input 
                            value={nivel.nome} 
                            onChange={(e) => atualizarNivel(nivel.id, e.target.value, nivel.pontos)}
                            className="flex-1 h-8"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removerNivel(nivel.id)}
                                  className="ml-2"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remover nível</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">Pontos:</span>
                          <Input 
                            type="number" 
                            value={nivel.pontos} 
                            onChange={(e) => atualizarNivel(nivel.id, nivel.nome, parseInt(e.target.value) || 0)}
                            className="w-16 h-7"
                            min="0"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rubrica.criterios.map((criterio) => (
                    <tr key={criterio.id}>
                      <td className="p-2 border-b">
                        <div className="flex items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="cursor-move mr-2"
                                >
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Arraste para reordenar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Input 
                            value={criterio.nome} 
                            onChange={(e) => atualizarNomeCriterio(criterio.id, e.target.value)}
                            className="flex-1 h-8"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removerCriterio(criterio.id)}
                                  className="ml-2"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remover critério</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                      {rubrica.niveis.map((nivel) => (
                        <td key={nivel.id} className="p-2 border-b">
                          <Textarea 
                            value={getCelulaValor(criterio.id, nivel.id)} 
                            onChange={(e) => atualizarCelula(criterio.id, nivel.id, e.target.value)}
                            placeholder="Descrição do critério para este nível..."
                            className="min-h-[80px] text-sm"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          
          {/* Seção de Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <TooltipProvider>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-medium">Cursos:</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Associe a cursos específicos</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              
              <div className="flex items-center mb-4">
                <Input 
                  value={novoCurso} 
                  onChange={(e) => setNovoCurso(e.target.value)}
                  placeholder="Digite o nome do curso"
                  className="mr-2"
                  onKeyDown={(e) => e.key === 'Enter' && adicionarCurso()}
                />
                <Button variant="outline" onClick={adicionarCurso}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {rubrica.cursos.map((curso) => (
                  <div 
                    key={curso} 
                    className="bg-secondary text-secondary-foreground py-1 px-3 rounded-full flex items-center text-sm"
                  >
                    {curso}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removerCurso(curso)}
                      className="h-5 w-5 ml-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <TooltipProvider>
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-medium">Disciplinas:</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Associe disciplinas</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              
              <div className="flex items-center mb-4">
                <Input 
                  value={novaDisciplina} 
                  onChange={(e) => setNovaDisciplina(e.target.value)}
                  placeholder="Digite o nome da disciplina"
                  className="mr-2"
                  onKeyDown={(e) => e.key === 'Enter' && adicionarDisciplina()}
                />
                <Button variant="outline" onClick={adicionarDisciplina}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {rubrica.disciplinas.map((disciplina) => (
                  <div 
                    key={disciplina} 
                    className="bg-secondary text-secondary-foreground py-1 px-3 rounded-full flex items-center text-sm"
                  >
                    {disciplina}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removerDisciplina(disciplina)}
                      className="h-5 w-5 ml-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Ações finais */}
          <div className="flex justify-end space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={salvarRubrica} variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Rubrica
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salvar sem sair</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={publicarRubrica}>
                    <Upload className="mr-2 h-4 w-4" />
                    Publicar Rubrica
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Salvar e publicar para uso</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarRubrica;
