import { ExternalLink, Shield, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface BonusCardProps {
  platformName: string;
  bonusAmount: string;
  link: string;
  index: number;
}

const BonusCard = ({ platformName, bonusAmount, link, index }: BonusCardProps) => {
  return (
    <div 
      className="card-casino p-4 sm:p-6 group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Card content */}
      <div className="relative z-10">
        {/* Header with platform name, badge and bonus - Mobile optimized layout */}
        <div className="flex items-center justify-between gap-3">
          {/* Left side: Icon + Name + Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground tracking-wide truncate">
                {platformName}
              </h3>
              <div className="badge-regulated mt-0.5">
                <Shield className="w-3 h-3" />
                <span className="text-[10px] sm:text-xs">Regulamentado</span>
              </div>
            </div>
          </div>
          
          {/* Right side: Bonus amount */}
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Bônus</p>
            <p className="text-xl sm:text-2xl font-display font-bold text-gradient-gold whitespace-nowrap">
              {bonusAmount}
            </p>
          </div>
        </div>

        {/* CTA Button - Larger touch target for mobile */}
        <Button 
          variant="casino" 
          size="lg" 
          className="w-full font-display tracking-wider mt-4 h-12 sm:h-14 text-base sm:text-lg active:scale-[0.98] touch-manipulation"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            RESGATAR BÔNUS
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </a>
        </Button>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-tr-xl" />
    </div>
  );
};

export default BonusCard;
