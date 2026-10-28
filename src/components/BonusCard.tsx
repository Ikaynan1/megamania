import { ArrowUpRight, Building2 } from "lucide-react";
import { Button } from "./ui/button";

interface BonusCardProps {
  platformName: string;
  link: string;
  index: number;
}

const BonusCard = ({ platformName, link, index }: BonusCardProps) => {
  return (
    <div
      className="card-casino p-4 sm:p-5 group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="font-sans text-base sm:text-lg font-semibold text-foreground tracking-tight truncate">
              {platformName}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Plataforma externa</p>
          </div>
        </div>

        <Button
          variant="casino"
          size="lg"
          className="w-full font-sans font-medium tracking-wide mt-4 h-12 sm:h-12 text-sm active:scale-[0.98] touch-manipulation"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Visitar plataforma
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      
    </div>
  );
};

export default BonusCard;
