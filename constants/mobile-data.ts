export type HairCategory =
  | "Trending"
  | "Fade"
  | "Protective"
  | "Formal"
  | "Low Maintenance"
  | "Textured";

export type Hairstyle = {
  id: string;
  name: string;
  category: HairCategory;
  match: string;
  barberNote: string;
  duration: string;
  maintenance: string;
  tags: string[];
  isFavorite: boolean;
};

export const hairstyleCategories: HairCategory[] = [
  "Trending",
  "Fade",
  "Protective",
  "Formal",
  "Low Maintenance",
  "Textured",
];

// Shared mock data keeps the Phase 5 screens visually consistent while the API layer is still growing.
export const hairstyles: Hairstyle[] = [
  {
    id: "burst-fade-curls",
    name: "Burst Fade Curls",
    category: "Trending",
    match: "Best for coily or curly hair with strong volume on top.",
    barberNote: "Keep the fade tight around the ear and leave the curl crown soft.",
    duration: "40 min",
    maintenance: "Every 2 weeks",
    tags: ["Sharp", "Modern", "Curly"],
    isFavorite: true,
  },
  {
    id: "textured-crop",
    name: "Textured Crop",
    category: "Low Maintenance",
    match: "Easy daily styling for straight to wavy hair.",
    barberNote: "Ask for blunt texture through the fringe with clean temple edges.",
    duration: "30 min",
    maintenance: "Every 3 weeks",
    tags: ["Easy", "Clean", "Daily"],
    isFavorite: false,
  },
  {
    id: "slick-back-taper",
    name: "Slick Back Taper",
    category: "Formal",
    match: "Great when you want a polished cut for work or events.",
    barberNote: "Leave enough length on top to comb back without exposing the scalp.",
    duration: "45 min",
    maintenance: "Every 2 to 3 weeks",
    tags: ["Classic", "Office", "Refined"],
    isFavorite: true,
  },
  {
    id: "mid-fade-twists",
    name: "Mid Fade Twists",
    category: "Protective",
    match: "Balanced shape for medium-length textured hair.",
    barberNote: "Clean the fade perimeter while preserving twist definition.",
    duration: "55 min",
    maintenance: "Every 2 weeks",
    tags: ["Defined", "Protective", "Fresh"],
    isFavorite: false,
  },
  {
    id: "skin-fade-quiff",
    name: "Skin Fade Quiff",
    category: "Fade",
    match: "High-contrast finish for thicker hair that holds volume.",
    barberNote: "Blend from skin tight into a fuller crown and keep the front airy.",
    duration: "45 min",
    maintenance: "Weekly line-up",
    tags: ["Bold", "Volume", "Statement"],
    isFavorite: true,
  },
  {
    id: "layered-wolf-cut",
    name: "Layered Wolf Cut",
    category: "Textured",
    match: "Works well for medium-length hair with natural movement.",
    barberNote: "Shape the layers so the silhouette stays messy but intentional.",
    duration: "50 min",
    maintenance: "Every 4 weeks",
    tags: ["Layered", "Edgy", "Soft"],
    isFavorite: false,
  },
];

export const homeHighlights = [
  {
    title: "3 styles match your texture",
    description: "Based on your saved preferences for curl definition and easy upkeep.",
  },
  {
    title: "Weekend-ready cuts",
    description: "Polished options that still photograph well after a long day out.",
  },
];

export const profileSummary = {
  name: "Jay Walker",
  city: "Vancouver",
  membership: "CutBook Plus",
  preferredBarber: "North Studio",
  faceShape: "Oval",
  hairType: "Curly",
  savedLooks: hairstyles.filter((style) => style.isFavorite).length,
  upcomingVisit: "March 27, 2026 at 2:30 PM",
};

export function getHairstyleById(id: string) {
  return hairstyles.find((style) => style.id === id);
}
