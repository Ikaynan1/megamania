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
      className="card-casino p-6 group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none rounded-xl" />
      
      {/* Card content */}
      <div className="relative z-10">
        {/* Header with platform name and badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground tracking-wide">
                {platformName}
              </h3>
              <div className="badge-regulated mt-1">
                <Shield className="w-3 h-3" />
                Regulamentado
              </div>
            </div>
          </div>
        </div>

        {/* Bonus amount */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Bônus no Cadastro</p>
          <p className="text-3xl font-display font-bold text-gradient-gold">
            {bonusAmount}
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          variant="casino" 
          size="lg" 
          className="w-full font-display tracking-wider"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            RESGATAR BÔNUS
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-neon-purple/10 to-transparent rounded-bl-xl" />
    </div>
  );
};

export default BonusCard;
