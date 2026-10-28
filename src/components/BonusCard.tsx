import { ArrowUpRight, Flame, Trophy, Zap } from "lucide-react";
import type { CategoryId } from "@/lib/categories";
import { Button } from "./ui/button";

interface BonusCardProps {
  platformName: string;
  link: string;
  index: number;
  category: CategoryId;
}

const categoryIcons = {
  lancamentos: Flame,
  populares: Zap,
  melhores: Trophy,
};

const categoryLabels = {
  lancamentos: "Recém-chegada",
  populares: "Em alta",
  melhores: "Destaque",
};

const BonusCard = ({ platformName, link, index, category }: BonusCardProps) => {
  const CategoryIcon = categoryIcons[category] ?? Zap;
  const categoryLabel = categoryLabels[category] ?? "";
  const initials = platformName.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase();

  return (
    <div
      className={`card-casino category-card category-card--${category} p-4 sm:p-5 group animate-fade-in`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`category-mark category-mark--${category} relative w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 overflow-hidden`} aria-hidden="true">
            <span className="category-mark-initials">{initials}</span>
            <CategoryIcon className="category-mark-icon absolute right-1 bottom-1 w-3.5 h-3.5" />
            <span className="category-mark-glint" />
          </div>
          <div className="min-w-0">
            <h3 className={`category-title category-title--${category} font-sans text-base sm:text-lg font-semibold tracking-tight truncate`}>
              {platformName}
            </h3>
            <p className={`category-label category-label--${category} text-[10px] uppercase tracking-[0.14em] mt-1`}>{categoryLabel}</p>
          </div>
        </div>

        <Button
          variant="casino"
          size="lg"
          className="w-full font-sans font-medium tracking-wide mt-4 h-12 text-sm active:scale-[0.98] touch-manipulation"
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
