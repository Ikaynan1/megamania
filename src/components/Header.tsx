import { Coins, Crown, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-casino-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_100%_50%_/_0.05)_0%,_transparent_70%)]" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-gold/30 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-neon-purple/40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-gold/20 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-gold-dark mb-6 glow-gold animate-pulse-glow">
            <Crown className="w-10 h-10 text-primary-foreground" />
          </div>
          
          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="text-gradient-gold">MEGA</span>
            <span className="text-foreground">BÔNUS</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            As melhores plataformas de slots com bônus exclusivos de cadastro.
            <br />
            <span className="text-gold/80">100% regulamentadas e seguras.</span>
          </p>
          
          {/* Stats/Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-foreground">+14 Plataformas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
              <Coins className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-foreground">Bônus Exclusivos</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </header>
  );
};

export default Header;
