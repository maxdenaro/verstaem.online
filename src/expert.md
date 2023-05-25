---
layout: "expert.njk"
pagination:
  data: people
  size: 1
  alias: author
permalink: "/people/{{author.key}}/"
eleventyComputed:
  title: "{{author.name}}"
---
