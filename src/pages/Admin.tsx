import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { Trash2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CATEGORIES, CategoryId } from "@/lib/categories";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = signup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (signup && !data.session) toast.success("Conta criada! Confirme pelo link no seu e-mail.");
  };

  return (
    <form onSubmit={submit} className="card-casino p-6 max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="font-display text-2xl font-bold text-gradient-gold text-center">Painel Admin</h1>
      <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
      <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12" />
      <Button variant="casino" className="w-full h-12 font-display" disabled={busy}>
        {signup ? "CRIAR CONTA" : "ENTRAR"}
      </Button>
      <button type="button" onClick={() => setSignup(!signup)} className="w-full text-sm text-muted-foreground">
        {signup ? "Já tenho conta" : "Primeiro acesso? Criar conta"}
      </button>
    </form>
  );
};

const BannerAdmin = () => {
  const qc = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banners").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!data.length) return [];
      const { data: signed } = await supabase.storage.from("banners").createSignedUrls(data.map((b) => b.image_url), 86400);
      return data.map((b, i) => ({ ...b, src: signed?.[i]?.signedUrl ?? "" }));
    },
  });

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    const path = `${Date.now()}-${file.name.replace(/[^\w.]/g, "")}`;
    const up = await supabase.storage.from("banners").upload(path, file);
    if (up.error) {
      setBusy(false);
      return toast.error(up.error.message);
    }
    let url = link.trim();
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    const { error } = await supabase.from("banners").insert({ image_url: path, link: url || null });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Banner publicado!");
    setFile(null);
    setLink("");
    (e.target as HTMLFormElement).reset();
    qc.invalidateQueries({ queryKey: ["banners"] });
  };

  const remove = async (id: string, path: string) => {
    if (!confirm("Excluir este banner?")) return;
    await supabase.storage.from("banners").remove([path]);
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["banners"] });
  };

  return (
    <div className="card-casino p-4 space-y-3">
      <h2 className="font-display text-lg font-bold text-gold">Banners do topo</h2>
      <p className="text-xs text-muted-foreground">Tamanho ideal: 1600 x 500 (formato largo).</p>
      <form onSubmit={upload} className="space-y-3">
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required className="h-12 pt-3" />
        <Input placeholder="Link ao clicar no banner (opcional)" value={link} onChange={(e) => setLink(e.target.value)} className="h-12" />
        <Button variant="casino" className="w-full h-12 font-display" disabled={busy || !file}>
          {busy ? "ENVIANDO..." : "PUBLICAR BANNER"}
        </Button>
      </form>
      {banners.map((b) => (
        <div key={b.id} className="flex items-center gap-3">
          <img src={b.src} alt="" className="h-14 aspect-[16/5] object-cover rounded-md border border-border" />
          <span className="flex-1 text-xs text-muted-foreground truncate">{b.link || "Sem link"}</span>
          <Button variant="ghost" size="icon" onClick={() => remove(b.id, b.image_url)} aria-label="Excluir banner">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
};

const Admin = () => {
  const qc = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState<CategoryId>("lancamentos");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(false);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  const { data: platforms = [] } = useQuery({
    queryKey: ["platforms"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("platforms").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = link.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    setBusy(true);
    const { error } = await supabase.from("platforms").insert({ name: name.trim().toUpperCase(), link: url, category });
    setBusy(false);
    if (error) return toast.error("Erro ao publicar: " + error.message);
    toast.success("Publicado no site!");
    setName("");
    setLink("");
    qc.invalidateQueries({ queryKey: ["platforms"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir esta plataforma?")) return;
    const { error } = await supabase.from("platforms").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["platforms"] });
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      {!session ? (
        <Login />
      ) : !isAdmin ? (
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">Esta conta não tem acesso de administrador.</p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sair</Button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-gradient-gold">Painel Admin</h1>
            <Button variant="ghost" size="icon" onClick={() => supabase.auth.signOut()} aria-label="Sair">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={publish} className="card-casino p-4 space-y-3">
            <Input placeholder="Nome da plataforma" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
            <Input placeholder="Link (https://...)" value={link} onChange={(e) => setLink(e.target.value)} required className="h-12" />
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "h-11 rounded-lg text-xs font-bold border transition-all",
                    category === c.id ? "bg-gold text-primary-foreground border-gold" : "border-border text-muted-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <Button variant="casino" className="w-full h-12 font-display text-lg" disabled={busy}>
              PUBLICAR
            </Button>
          </form>

          <BannerAdmin />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{platforms.length} plataformas no site</p>
            {platforms.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {CATEGORIES.find((c) => c.id === p.category)?.label} · {p.link}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)} aria-label="Excluir">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
