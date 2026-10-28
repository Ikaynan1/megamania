import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Crown, ShieldCheck, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const useBanners = () =>
  useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banners").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!data.length) return [];
      const { data: signed } = await supabase.storage
        .from("banners")
        .createSignedUrls(data.map((b) => b.image_url), 60 * 60 * 24);
      return data.map((b, i) => ({ ...b, src: signed?.[i]?.signedUrl ?? "" }));
    },
  });

const Banner = () => {
  const { data: banners = [] } = useBanners();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, [banners.length]);

  if (!banners.length) {
    return (
      <div className="aspect-[16/7] sm:aspect-[16/5] w-full rounded-2xl border-2 border-dashed border-gold/30 bg-card/60 flex flex-col items-center justify-center gap-2 text-center px-4">
        <Crown className="w-8 h-8 text-gold" />
        <p className="font-display text-sm sm:text-base text-gold">Espaço para banner</p>
        <p className="text-xs text-muted-foreground">Adicione pelo painel admin</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/7] sm:aspect-[16/5] w-full overflow-hidden rounded-2xl border border-gold/30 glow-gold">
      {banners.map((b, idx) => {
        const img = <img src={b.src} alt="Banner" className="w-full h-full object-cover" />;
        return (
          <div
            key={b.id}
            className={cn("absolute inset-0 transition-opacity duration-700", idx === i ? "opacity-100" : "opacity-0 pointer-events-none")}
          >
            {b.link ? <a href={b.link} target="_blank" rel="noopener noreferrer">{img}</a> : img}
          </div>
        );
      })}
      {banners.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setI(idx)}
              aria-label={`Banner ${idx + 1}`}
              className={cn("h-1.5 rounded-full transition-all", idx === i ? "w-6 bg-gold" : "w-1.5 bg-foreground/50")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => (
  <header className="relative overflow-hidden">
    <div className="absolute inset-0 bg-casino-gradient" />
    <div className="relative z-10 px-4 sm:container pt-4 sm:pt-8 pb-2">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center glow-gold">
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-black tracking-wider">
          <span className="text-gradient-gold">MEGA</span>
          <span className="text-foreground">MANIA</span>
        </h1>
      </div>

      <Banner />

      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-medium">100% Regulamentadas</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-medium">Novidades todo dia</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
