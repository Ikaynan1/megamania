export const CATEGORIES = [
  { id: "lancamentos", label: "Lançamentos", emoji: "🚀" },
  { id: "populares", label: "Populares", emoji: "🔥" },
  { id: "melhores", label: "As Melhores", emoji: "⭐" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
