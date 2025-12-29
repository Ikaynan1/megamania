import { AlertTriangle, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Warning */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold text-gold">JOGO RESPONSÁVEL</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Jogue com responsabilidade. Aposte apenas o que você pode perder. 
            Se você ou alguém que você conhece tem problemas com jogos de azar, 
            procure ajuda profissional. Proibido para menores de 18 anos.
          </p>
          
          {/* Regulation badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/30">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-xs text-muted-foreground">
              Todas as plataformas são regulamentadas e licenciadas
            </span>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground/60 mt-8">
            © {new Date().getFullYear()} MegaBônus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
