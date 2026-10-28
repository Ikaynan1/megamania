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
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-card border border-gold/20 max-w-xl mx-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={cn(
                  "h-11 rounded-lg text-xs sm:text-sm font-display font-bold tracking-wide transition-all touch-manipulation",
                  tab === c.id
                    ? "bg-gradient-to-r from-gold to-gold-light text-primary-foreground shadow-lg"
                    : "text-muted-foreground active:bg-muted"
                )}
              >
                <span className="mr-1">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Carregando...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Nenhuma plataforma nesta aba ainda.</p>
        ) : (
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
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
