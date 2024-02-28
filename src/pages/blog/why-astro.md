---
layout: "../../layouts/BlogLayout.astro"
title: "Why Astro?"
pubDate: "2023/12/21"
description: "My first blog post, which explains my reasoning for choosing Astro to build my personal website"
author: "Lucas Machado"
tags: ["astro", "blogging", "learning in public"]
---

# Heading 1

This is a paragraph with _italic_ and **bold**, as well as ~strikethrough~ sample text.

## Heading 2

Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.

## Heading 3

```js
const ref = React.useRef();
React.useEffect(() => {
    ref.current = "some value";
});

// then, later in another hook or something
React.useLayoutEffect(() => {
    console.log(ref.current); // <-- this logs an old value because this runs first!
});
```
