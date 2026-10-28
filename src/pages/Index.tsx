import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BonusCard from "@/components/BonusCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, CategoryId } from "@/lib/categories";
import { cn } from "@/lib/utils";

const Index = () => {
  const [tab, setTab] = useState<CategoryId>("lancamentos");

  const { data: platforms = [], isLoading } = useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platforms")
        .select("id,name,link,category")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const list = platforms.filter((p) => p.category === tab);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 py-6 sm:container sm:py-12">
        <div className="sticky top-0 z-20 -mx-4 px-4 py-3 mb-4 bg-background/90 backdrop-blur sm:mx-0 sm:px-0">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-card border border-border max-w-xl mx-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={cn(
                  "h-11 rounded-lg text-xs sm:text-sm font-sans font-medium tracking-wide transition-all touch-manipulation",
                  tab === c.id
                    ? "bg-muted text-gold shadow-sm"
                    : "text-muted-foreground active:bg-muted"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex items-end justify-between gap-4 mb-5 sm:mb-6">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Explore o catálogo</p>
            <h2 className="font-sans text-lg sm:text-xl font-semibold tracking-tight text-foreground">{CATEGORIES.find((c) => c.id === tab)?.label}</h2>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{isLoading ? "Carregando" : `${list.length} ${list.length === 1 ? "plataforma" : "plataformas"}`}</span>
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Carregando plataformas...</p>
        ) : list.length === 0 ? (
          <div className="max-w-6xl mx-auto rounded-xl border border-border bg-card/60 px-5 py-12 text-center">
            <p className="font-medium text-foreground">Nenhuma plataforma nesta categoria</p>
            <p className="text-sm text-muted-foreground mt-2">Volte em breve para conferir novas opções.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
            {list.map((p, i) => (
              <BonusCard key={p.id} platformName={p.name} link={p.link} index={i} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
