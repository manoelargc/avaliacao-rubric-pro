
export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} RubricPro. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
