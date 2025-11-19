export const siteConfig = {
  name: "Gay Men's Field Guide",
  description:
    "Tech, culture, and queer perspectives collide in raw, unfiltered takes for modern LGBTQ+ readers.",
  tagline: "Dispatches on digital life, wellbeing, and community from a gay lens.",
  hero: {
    kicker: "Field Notes for the Digital Queer",
    headline: "Guidance for navigating tech, culture, and wellness",
    subheading:
      "Stories, experiments, and practical lessons from Cleveland's Gay Men's Field Guide community—now optimized for the open web.",
    cta: {
      label: "Explore the latest posts",
      href: "#latest",
    },
  },
  contactEmail: "hello@gaymensfieldguide.com",
  nav: [
    { label: "Articles", href: "/" },
    { label: "About", href: "/about" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/gaymensfieldguide" },
    { label: "YouTube", href: "https://www.youtube.com/@GayMensFieldGuide" },
  ],
  location: "Cleveland, Ohio",
}

export type SiteConfig = typeof siteConfig
