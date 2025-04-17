
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Google } from "lucide-react";

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
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
          <Button 
            variant="outline" 
            onClick={() => setIsLoginOpen(true)}
          >
            Entrar
          </Button>
          <Button 
            className="bg-rubric-gradient hover:opacity-90 transition-opacity"
          >
            Registrar
          </Button>
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
            <Button 
              type="submit" 
              className="w-full bg-rubric-gradient hover:opacity-90 transition-opacity"
            >
              Entrar
            </Button>
            
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
              <Google className="mr-2 h-4 w-4" />
              Entrar com o Google
            </Button>
            
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link to="/registro" className="font-medium text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
