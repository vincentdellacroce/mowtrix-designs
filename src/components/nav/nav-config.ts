export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavVariant = "pill" | "overlay" | "autohide";

export const NAV_VARIANTS: { id: NavVariant; label: string }[] = [
  { id: "pill", label: "Floating pill" },
  { id: "overlay", label: "Menu overlay" },
  { id: "autohide", label: "Auto-hide" },
];
