
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Info, LogOut, Save, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

const Perfil = () => {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
      setFormData({ 
        name: parsedData.name || "", 
        email: parsedData.email || "" 
      });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };
  
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    toast.success("Perfil atualizado com sucesso!");
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
                  <BreadcrumbLink href="/perfil">Meu Perfil</BreadcrumbLink>
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
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Meu Perfil
          </h1>

          <Card className="max-w-3xl mx-auto">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Informações Pessoais</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={editMode ? "default" : "outline"} 
                    onClick={handleEditToggle}
                  >
                    {editMode ? "Cancelar" : "Editar Perfil"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{editMode ? "Cancelar edição" : "Atualizar seus dados"}</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserIcon className="h-16 w-16 text-primary/50" />
                </div>
                {!editMode && (
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="w-full" onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Salvar as informações atualizadas</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <p className="text-sm text-muted-foreground">Nome Completo</p>
                    <p className="font-medium">{user.name || "Não informado"}</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">{user.email || "Não informado"}</p>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full mt-8"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Encerrar sessão</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Perfil;
