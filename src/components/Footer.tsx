import { AlertTriangle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 border-t border-border/50">
      <div className="px-4 sm:container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Warning */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <AlertTriangle className="w-4 h-4 text-gold" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">JOGO RESPONSÁVEL · 18+</span>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Este site reúne links para plataformas externas. Antes de se cadastrar, confira os termos e as informações de autorização para operar no Brasil diretamente com cada plataforma. Jogue com responsabilidade e aposte apenas o que pode perder.
          </p>
          

          {/* Copyright */}
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-6 sm:mt-8">
            © {new Date().getFullYear()} Mega Mania
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
