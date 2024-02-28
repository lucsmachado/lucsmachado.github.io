---
title: "Why Astro?"
pubDate: 2023-12-21
description: "My first blog post, which explains my reasoning for choosing Astro to build my personal website"
author: "Lucas Machado"
image:
    url: "https://docs.astro.build/assets/full-logo-light.png"
    alt: "The full Astro logo."
tags: ["astro", "blogging", "learning in public"]
---

Recently I've been very nostalgic about the internet of my teenage years (around 2010).

I vividly remember having loads of free time and endless, varied interests. I'd get home from school, sit in front of the computer and try to think of a random topic, say, skateboarding. It was amazing just how easily you could find high-quality, user-generated content about your hobbies. People would spend their time writing blog posts on Blogspot, or recording vlogs to upload to YouTube.

Nowadays, technology has evolved in the direction of SEO optimization and AI-generated articles, so those days are long gone. Thankfully, through the [Wayback Machine](https://web.archive.org/) you can still find those random personal websites where strangers would share their interests with the online world, and, when you do, it feels like you've just stumbled upon a relic of a distant, simpler past.

## Astro

Enter [Astro](https://astro.build/), yet another JavaScript framework. But here's the fun part - it's the best tool for the job when it comes to building content-driven websites in a timely manner.

This blog post, for instance, is currently being written in a Markdown file. And, as I write it, everytime I hit save on my text editor, I get to see the resulting HTML and CSS being rendered in real-time on my browser window, just as the end-user would see it.

Once I'm done writing, all I need to do is commit the changes and push them to the main branch on GitHub, which has a workflow configured to auto-deploy the result to GitHub pages.

```bash
git add .
git commit -m "feat: add new blog post"
git push
```

It may not sound like much, but for a computer nerd who enjoys writing on his spare-time, like yours truly, this is awesome.

Now, let's pull back the curtains to see how it actually works.

## Build a Blog

The (simplified) project structure looks something like this:

```bash
.
├── astro.config.mjs
├── node_modules/
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── components
│   │   ├── BlogPost.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content
│   │   ├── config.ts
│   │   └── posts
│   │       └── why-astro.md
│   ├── layouts
│   │   ├── BlogLayout.astro
│   │   └── RootLayout.astro
│   └── pages
│       ├── blog.astro
│       ├── index.astro
│       └── posts
│           └── [...slug].astro
├── tailwind.config.cjs
└── tsconfig.json
```

Let's start with the `./src/content` directory, which is a reserved path for storing and managing content within Astro projects, using a feature called [Content Collections](https://docs.astro.build/en/guides/content-collections/).

At its most simple, it's just a folder called `./src/content/posts/` where all the blog posts are stored. Then, on the `./src/content/config.ts` file, you can define and export your collections.

```ts
import { z, defineCollection } from "astro:content";

const posts = defineCollection({
    type: "content",
    // This is literally just a Zod schema
    schema: z.object({
        title: z.string(),
        author: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    posts,
};
```

Now, let's take a look at the `./src/pages/posts/[...slug].astro` page. Keep in mind that Astro uses file-based routing, so the path above will reflect the actual URL of your blog posts.

```astro
---
import { getCollection } from "astro:content";
import BlogLayout from "../../layouts/BlogLayout.astro";

export async function getStaticPaths() {
  const blogPosts = await getCollection("posts");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout frontmatter={post.data}>
  <Content />
</BlogLayout>
```

I just love how simple the code spinnet above is in contrast to what it acomplishes. It's a dynamic route (almost exactly the same as in Next.js) which uses Static Site Generation (SSG) to determine the route path of all the blog posts in our `"posts"` collection at _build_ time.

Then, via props (almost exactly the same as React), you can access the individual blog posts, render the Markdown source file as an Astro component and wrap it in a layout with pre-determined styles.

That's _almost_ it. Now, we've dynamically created a route called `https://my-blog.com/posts/my-post`, but we still need to create a link that will redirect the user to said blog post, or even, any blog post the user may wish to read.

```astro
---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";

const postCollection = await getCollection("posts");
---

<Layout>
    <h1>
      My Blog
    </h1>
    <p>
      Welcome to my blog.
    </p>
    <ul>
        {postCollection.map((post) => ({
            <li>
                <a href={`/posts/${post.slug}`}>
                    {post.data.title}
                </a>
            </li>
        })
    </ul>
</Layout>
```

Here, we're just awaiting our collection of blog posts and mapping the resulting array into various `<a>` tags.

## Conclusion

Given enough spare time, you can get way more fancy than this, but this is how the most basic blog setup works in Astro.

I highly recommend following their official tutorial called [Build your first Astro blog](https://docs.astro.build/en/tutorial/0-introduction/).
