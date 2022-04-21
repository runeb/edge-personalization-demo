export enum COOKIES {
  affinity = "vercel-affinity",
  city = "vercel-city",
  country = "vercel-country",
  ip = "vercel-ip",
  region = "vercel-region",
  ua = "vercel-ua",
}

export type Personalization = {
  affinity?: string;
  marketingRegion?: string;
};

type SanityImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  contain?: boolean;
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  dimensions: {
    _type: string;
    aspectRatio: number;
    height: number;
    width: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  mimeType: string;
  _type: "image";
};

export type SectionBanner = {
  _type: "banner";
  eyebrow: string;
  image: SanityImage;
  isVariation?: boolean;
  title: string;
};

export type SectionCards = {
  _type: "cards";
  cards: {
    _key: string;
    description: string;
    eyebrow: string;
    image: SanityImage;
    title: string;
  }[];
  description: string;
  isVariation?: boolean;
  title: string;
};

export type SectionHero = {
  _type: "hero";
  description: string;
  eyebrow: string;
  image: SanityImage;
  isVariation?: boolean;
  title: string;
};

export type SectionNewsletter = {
  _type: "newsletter";
  description: string;
  isVariation?: boolean;
  title: string;
};

export type SectionQuote = {
  _type: "quote";
  description: string;
  eyebrow: string;
  isVariation?: boolean;
  title: string;
};
