export const CATEGORIES = [
  { id: "lancamentos", label: "Lançamentos" },
  { id: "populares", label: "Populares" },
  { id: "melhores", label: "As Melhores" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
