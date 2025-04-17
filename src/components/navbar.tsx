
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Normalmente haveria uma chamada API aqui
      localStorage.setItem("user", JSON.stringify({ name: email.split('@')[0], email }));
      setIsLoginOpen(false);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
      // Normalmente haveria uma chamada API aqui
      localStorage.setItem("user", JSON.stringify({ name, email }));
      setIsRegisterOpen(false);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  return (
    <TooltipProvider>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            RubricPro
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium">Sobre</Link>
            <Link to="/como-funciona" className="text-sm font-medium">Como funciona</Link>
            <Link to="/modelos" className="text-sm font-medium">Modelos</Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={() => setIsLoginOpen(true)}
                >
                  Entrar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Acesse sua conta</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="bg-rubric-gradient hover:opacity-90 transition-opacity"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Registrar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Crie uma nova conta</p>
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </nav>
          <Button 
            className="md:hidden" 
            variant="outline" 
            size="icon"
            onClick={() => setIsLoginOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M4 12h16"></path>
              <path d="M4 6h16"></path>
              <path d="M4 18h16"></path>
            </svg>
          </Button>
        </div>

        {/* Login Dialog */}
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Entrar no RubricPro</DialogTitle>
            </DialogHeader>
            <div className="text-center text-sm text-muted-foreground">
              Acesse sua conta para criar e gerenciar suas rubricas de avaliação
            </div>
            <form onSubmit={handleLogin} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="submit" 
                    className="w-full bg-rubric-gradient hover:opacity-90 transition-opacity"
                  >
                    Entrar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Acessar sua conta</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    ou continue com
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                type="button" 
                className="w-full"
                onClick={() => {
                  toast.success("Login com Google realizado com sucesso!");
                  localStorage.setItem("user", JSON.stringify({ name: "Usuário Google", email: "usuario@gmail.com" }));
                  setIsLoginOpen(false);
                  navigate("/dashboard");
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Entrar com o Google
              </Button>
              
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-medium"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                >
                  Cadastre-se
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Register Dialog */}
        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Cadastre-se no RubricPro</DialogTitle>
            </DialogHeader>
            <div className="text-center text-sm text-muted-foreground">
              Crie sua conta para começar a usar rubricas de avaliação
            </div>
            <form onSubmit={handleRegister} className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Nome</Label>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p>Seu nome completo ou como deseja ser chamado no sistema.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Seu nome" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="register-email">Email</Label>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p>Seu email será usado para login e comunicações importantes.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="register-password">Senha</Label>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p>Sua senha deve ter pelo menos 8 caracteres e incluir letras, números e símbolos.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Input 
                  id="register-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <p>Digite novamente sua senha para confirmar.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="submit" 
                    className="w-full bg-rubric-gradient hover:opacity-90 transition-opacity"
                  >
                    Cadastrar
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Criar sua conta</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-medium"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                >
                  Entrar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>
    </TooltipProvider>
  );
}
