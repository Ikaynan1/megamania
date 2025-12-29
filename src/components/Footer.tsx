import { AlertTriangle, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 border-t border-border/50">
      <div className="px-4 sm:container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Warning */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            <span className="text-xs sm:text-sm font-semibold text-gold">JOGO RESPONSÁVEL</span>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Jogue com responsabilidade. Aposte apenas o que você pode perder. 
            Proibido para menores de 18 anos.
          </p>
          
          {/* Regulation badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/30 border border-border/30">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              Plataformas regulamentadas
            </span>
          </div>
          
          {/* Copyright */}
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-6 sm:mt-8">
            © {new Date().getFullYear()} MegaBônus
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
