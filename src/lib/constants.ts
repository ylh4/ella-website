export const siteConfig = {
  name: "Ella's Creative World",
  description:
    "Books, poems, artwork, videos, and blog posts by Elnatan Lemma.",
  author: "Elnatan Lemma",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Poems", href: "/poems" },
  { label: "Artwork", href: "/artwork" },
  { label: "Videos", href: "/videos" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const adminNavLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Books", href: "/admin/books" },
  { label: "Poems", href: "/admin/poems" },
  { label: "Artwork", href: "/admin/artwork" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Blog", href: "/admin/blog" },
];

export const contentTypes = [
  "books",
  "poems",
  "artwork",
  "videos",
  "blog",
] as const;

export type ContentType = (typeof contentTypes)[number];
