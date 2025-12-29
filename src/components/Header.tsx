import { Coins, Crown, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative py-8 sm:py-16 md:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-casino-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45_100%_50%_/_0.05)_0%,_transparent_70%)]" />
      
      <div className="px-4 sm:container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold to-gold-dark mb-4 sm:mb-6 glow-gold">
            <Crown className="w-7 h-7 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          
          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-black tracking-wider mb-2 sm:mb-4">
            <span className="text-gradient-gold">MEGA</span>
            <span className="text-foreground">BÔNUS</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed px-2">
            As melhores plataformas de slots com bônus exclusivos.
            <span className="text-gold/80 block sm:inline"> 100% regulamentadas.</span>
          </p>
          
          {/* Stats/Trust indicators */}
          <div className="flex items-center justify-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 border border-border/50">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
              <span className="text-xs sm:text-sm font-medium text-foreground">+14 Plataformas</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 border border-border/50">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Bônus Exclusivos</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </header>
  );
};

export default Header;
