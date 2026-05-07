// import mountains from "@/assets/poster-mountains.jpg";
// import botanical from "@/assets/poster-botanical.jpg";
// import abstract from "@/assets/poster-abstract.jpg";
// import city from "@/assets/poster-city.jpg";
// import portrait from "@/assets/poster-portrait.jpg";
// import ocean from "@/assets/poster-ocean.jpg";
import { StaticImageData } from "next/image";

export type Poster = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: StaticImageData | string;
  description: string;
};

export const categories = [
  {
    slug: "landscapes",
    name: "Landscapes",
    note: "mountains, beaches, big skies",
  },
  { slug: "botanical", name: "Botanical", note: "plants & green stuff" },
  { slug: "abstract", name: "Abstract", note: "shapes & weird vibes" },
  { slug: "urban", name: "Urban", note: "city views & street energy" },
  { slug: "portrait", name: "Portrait", note: "faces with character" },
];

export const posters: Poster[] = [
  {
    id: "p1",
    title: "Quiet Summit",
    price: 18,
    category: "landscapes",
    image: "mountains",
    description:
      "Big mountain energy. Looks great above a desk or bed — instant calm.",
  },
  {
    id: "p2",
    title: "First Leaf",
    price: 14,
    category: "botanical",
    image: "botanical",
    description: "A simple leaf print. Easy on the eyes, easy on the wallet.",
  },
  {
    id: "p3",
    title: "Three Moons",
    price: 20,
    category: "abstract",
    image: "abstract",
    description: "Three circles, lots of vibe. Weirdly satisfying to stare at.",
  },
  {
    id: "p4",
    title: "Distant City",
    price: 22,
    category: "urban",
    image: "city",
    description:
      "A skyline that hits different at night. Pairs well with fairy lights.",
  },
  {
    id: "p5",
    title: "Looking East",
    price: 16,
    category: "portrait",
    image: "portrait",
    description: "Minimal one-line face print. Surprisingly chill.",
  },
  {
    id: "p6",
    title: "Wave No. 3",
    price: 18,
    category: "landscapes",
    image: "ocean",
    description: "A wave mid-curl. Surf-shack vibes for any room.",
  },
];
