import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@astrojs/react";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react(), tailwind(), image(), prefetch()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
});
