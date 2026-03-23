export type ProjectCategory =
  | "Estate & Grounds"
  | "Heritage Interiors"
  | "Civic & Club";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  area: string;
  location: string;
  status: "completed";
  summary: string;
  description: string[];
  heroImage: string;
  gallery: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "tidal-house",
    title: "Seaward Estate",
    category: "Estate & Grounds",
    year: "2024",
    area: "420 m²",
    location: "Sochi, Russia",
    status: "completed",
    summary:
      "A discreet coastal estate: measured proportions, quiet materials, and rooms that defer to the horizon.",
    description: [
      "The house sits above the Black Sea like a long-held family seat — not a statement object, but a calm anchor on the slope. Living spaces open west; service and storage tuck east, so daily life stays orderly and private.",
      "Pale stone, oiled oak, and bronze hardware age without theatrics. Deep eaves and layered glazing keep glare off stone floors; air moves naturally through the plan in summer.",
      "The impression is continuity: inherited restraint, light held carefully, nothing competing with the water.",
    ],
    heroImage: "/images/projects/tidal-house/hero.png",
    gallery: [
      "/images/projects/tidal-house/01.png",
      "/images/projects/tidal-house/02.png",
      "/images/projects/tidal-house/03.png",
      "/images/projects/tidal-house/04.png",
    ],
    featured: true,
  },
  {
    slug: "birch-pavilion",
    title: "Birch Grove Hall",
    category: "Civic & Club",
    year: "2023",
    area: "280 m²",
    location: "Moscow, Russia",
    status: "completed",
    summary:
      "A garden room at the woodland edge — civic in purpose, club-like in calm and craft.",
    description: [
      "The pavilion reads as a small institution tucked into birch: a circular plan, thin structure, and a roof that hovers without spectacle. It is a place to arrive, pause, and continue — closer to a reading room in the trees than a roadside shelter.",
      "Charred timber and quiet glass keep the silhouette low; interiors use felted wool and oiled wood so footfall stays soft for the grove.",
      "Lighting stays indirect after dusk, as you would in a members’ garden: enough to find your way, never a billboard to the forest.",
    ],
    heroImage: "/images/projects/birch-pavilion/hero.png",
    gallery: [
      "/images/projects/birch-pavilion/01.png",
      "/images/projects/birch-pavilion/02.png",
      "/images/projects/birch-pavilion/03.png",
      "/images/projects/birch-pavilion/04.png",
    ],
    featured: true,
  },
  {
    slug: "stone-and-light",
    title: "Stone Court Residence",
    category: "Heritage Interiors",
    year: "2025",
    area: "160 m²",
    location: "Saint Petersburg, Russia",
    status: "completed",
    summary:
      "A heritage apartment brought forward with patience: brick kept honest, light introduced in thin, deliberate layers.",
    description: [
      "We treated existing masonry as lineage, not inconvenience. New partitions are slim steel and fluted glass — privacy without sealing rooms away from one another, the way older flats were meant to breathe.",
      "Lighting is cove and graze, never spotlight theatre. Daylight enters through one enlarged court opening; evening reads as soft volumes, not feature walls.",
      "Furniture stays low and composed, so the eye travels across texture — stone, wool, brass — without a single ‘look-at-me’ gesture.",
    ],
    heroImage: "/images/projects/stone-and-light/hero.png",
    gallery: [
      "/images/projects/stone-and-light/01.png",
      "/images/projects/stone-and-light/02.png",
      "/images/projects/stone-and-light/03.png",
      "/images/projects/stone-and-light/04.png",
    ],
    featured: true,
  },
  {
    slug: "ridge-retreat",
    title: "Highland Seat",
    category: "Estate & Grounds",
    year: "2022",
    area: "580 m²",
    location: "Altai, Russia",
    status: "completed",
    summary:
      "A mountain seat in three quiet bars — larch, zinc, and stone arranged so the ridge stays dignified.",
    description: [
      "The brief was hospitality without domination: we terraced the program in three shifted bars, each turning slightly to a different valley view, like wings added over generations rather than one heroic gesture.",
      "Insulation and glazing are serious; a masonry core steadies temperature the way older houses rely on mass, not gadgets.",
      "Decks step with the wind so the building never reads as a barrier on the skyline — more a long-held family place than a weekend trophy.",
    ],
    heroImage: "/images/projects/ridge-retreat/hero.png",
    gallery: [
      "/images/projects/ridge-retreat/01.png",
      "/images/projects/ridge-retreat/02.png",
      "/images/projects/ridge-retreat/03.png",
      "/images/projects/ridge-retreat/04.png",
    ],
    featured: false,
  },
  {
    slug: "frame-library",
    title: "The Reading Hall",
    category: "Civic & Club",
    year: "2024",
    area: "1200 m²",
    location: "Kazan, Russia",
    status: "completed",
    summary:
      "A civic library where timber structure and shelving read as one continuous, club-quiet frame.",
    description: [
      "The reading room spans without fuss: paired glulam portals carry the roof while shelves and acoustic baffles align into a single rhythm — more reading hall than shopping-mall atrium.",
      "Daylight is drawn deep through a disciplined atrium; louvers tame glare the way you would in a serious collection, not a spectacle.",
      "Ramps weave into the section so dignity meets code without bolt-on lifts at the front door — public, but never loud.",
    ],
    heroImage: "/images/projects/frame-library/hero.png",
    gallery: [
      "/images/projects/frame-library/01.png",
      "/images/projects/frame-library/02.png",
      "/images/projects/frame-library/03.png",
      "/images/projects/frame-library/04.png",
    ],
    featured: false,
  },
  {
    slug: "silk-loft",
    title: "Silk Court",
    category: "Heritage Interiors",
    year: "2025",
    area: "95 m²",
    location: "Moscow, Russia",
    status: "completed",
    summary:
      "A compact city loft edited like a dressing room: plaster, brass, oak — tactile, never trendy.",
    description: [
      "We cleared partitions to recover one calm volume, then inserted a birch-ply service core as a freestanding piece of furniture — kitchen, bath, storage — so the room keeps the clarity of a well-kept flat.",
      "Concrete overhead stays honest; heat is in the floor; brass and oak age together without a ‘loft gimmick’.",
      "A single textile wall quiets calls and keyboards — old-money practicality: comfort before flex.",
    ],
    heroImage: "/images/projects/silk-loft/hero.png",
    gallery: [
      "/images/projects/silk-loft/01.png",
      "/images/projects/silk-loft/02.png",
      "/images/projects/silk-loft/03.png",
      "/images/projects/silk-loft/04.png",
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentSlugs(
  slug: string,
): { prev: Project | null; next: Project | null } {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1]! : null,
    next: i < projects.length - 1 ? projects[i + 1]! : null,
  };
}

export const featuredProjects = projects.filter((p) => p.featured);
