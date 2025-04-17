
import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info, Send, MessageSquare } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Suporte = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Como posso ajudar você hoje com o Rubric Pro?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const normalizedMessage = message.toLowerCase();
    
    if (normalizedMessage.includes("rubrica") || normalizedMessage.includes("criar rubrica")) {
      return "Você pode criar uma nova rubrica na seção 'Gerenciador de Rubricas' clicando no botão '+' e seguindo o fluxo de criação.";
    } else if (normalizedMessage.includes("avaliação") || normalizedMessage.includes("avaliar")) {
      return "Para realizar avaliações, acesse a disciplina desejada através da página 'Cursos', selecione a disciplina e então a avaliação que deseja realizar.";
    } else if (normalizedMessage.includes("perfil") || normalizedMessage.includes("conta")) {
      return "Você pode gerenciar seu perfil na página 'Perfil', onde é possível atualizar suas informações e alterar sua senha.";
    } else {
      return "Não tenho uma resposta específica para essa pergunta. Por favor, tente reformular ou consulte a seção de FAQ para tópicos comuns.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-foreground">
      <AppSidebar />
      <div className="md:pl-20 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/suporte">Suporte</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <ThemeToggle />
        </div>

        <h1 className="text-2xl font-bold mb-8">Central de Suporte</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">FAQ</h2>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Info</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-[#1E293B] border-[#1584CD]/30">
                  <p>Perguntas e respostas rápidas</p>
                </HoverCardContent>
              </HoverCard>
            </div>

            <Card className="bg-[#1E293B] border-border hover:border-[#1584CD]/50 transition-all">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4 py-3">
                      Como criar uma nova rubrica de avaliação?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      Para criar uma nova rubrica, acesse o menu "Rubricas" no painel lateral
                      e clique no botão de adicionar (+). Preencha os campos necessários como 
                      nome da rubrica, critérios e níveis de desempenho.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="px-4 py-3">
                      Como adicionar um novo curso no sistema?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      Para adicionar um novo curso, acesse a página "Cursos" e clique no botão
                      "Adicionar Curso". Preencha as informações como nome do curso, semestre
                      e ano letivo.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4 py-3">
                      Como avaliar os alunos usando o sistema?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      Para avaliar alunos, navegue até a página "Cursos", selecione o curso
                      e disciplina desejados. Em seguida, acesse "Avaliações" e clique no ícone
                      de avaliar (▶️) para cada avaliação que deseja realizar.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="px-4 py-3">
                      Posso personalizar os critérios de avaliação?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      Sim, ao criar ou editar uma rubrica, você pode adicionar quantos
                      critérios desejar clicando em "Linha +" e definir diferentes níveis
                      de desempenho usando "Coluna +". Cada critério e nível pode ser
                      personalizado com descrições detalhadas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="px-4 py-3">
                      Como visualizar o progresso das avaliações?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      Na página de "Avaliações" de uma disciplina específica, você pode
                      acompanhar o progresso de cada avaliação na coluna "Progresso", que
                      mostra a porcentagem de alunos avaliados.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Chatbot Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">Assistente Virtual</h2>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>

            <Card className="bg-[#1E293B] border-border hover:border-[#1584CD]/50 transition-all h-[500px] flex flex-col">
              <CardHeader className="p-4 border-b border-border">
                <CardTitle className="text-md font-medium">Chat de Suporte</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary/10 text-primary-foreground"
                            : "bg-secondary/10 text-secondary-foreground"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-border mt-auto">
                  <div className="flex gap-2">
                    <Textarea
                      className="min-h-[60px] bg-background/50"
                      placeholder="Digite sua pergunta..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      title="Converse com nosso assistente inteligente"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      className="h-full"
                      disabled={inputMessage.trim() === ""}
                    >
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Enviar</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suporte;
