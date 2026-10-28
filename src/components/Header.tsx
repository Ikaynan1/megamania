import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
      <div className="aspect-[16/7] sm:aspect-[16/5] w-full rounded-2xl border border-border bg-card flex flex-col items-start justify-center text-left px-6 sm:px-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gold mb-3">Mega Mania · catálogo</p>
        <h2 className="font-sans text-xl sm:text-3xl font-semibold tracking-tight text-foreground max-w-xl">Conheça plataformas de entretenimento</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">Explore as opções listadas e acesse cada plataforma para conferir os detalhes.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/7] sm:aspect-[16/5] w-full overflow-hidden rounded-2xl border border-border bg-card">
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
      <div className="flex flex-col items-center mb-5 sm:mb-7">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-muted-foreground mb-1">Catálogo independente</p>
        <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-[0.12em] text-foreground">
          <span className="text-gold">MEGA</span> MANIA
        </h1>
      </div>

      <Banner />

      <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 tracking-wide">Links para plataformas externas · Confira os termos antes de acessar</p>
    </div>
  </header>
);

export default Header;
