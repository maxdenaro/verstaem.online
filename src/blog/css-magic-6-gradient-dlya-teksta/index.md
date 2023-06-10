---
title: "CSS Magic #6. Градиент для текста"
date: "2023-06-09"
descr: "CSS Magic #6, делаем градиент для текста"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

Нередко дизайнеры используют градиент для текста, и нам, верстальщикам, приходится все это дело реализовывать. Пока еще не придумано нормальных вариантов сделать градиент для текста, поэтому у нас есть лишь вариант, который поддерживают не все браузеры. Смотрим!

## HTML

``` html
<div class="text">
  My gradiented text
</div>
```

Самый обычный html-див.

## CSS

``` css
.text {
  font-family: sans-serif;
  font-size: 50px;
  background: linear-gradient(red, yellow);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
}
```

Немного магии. Свойства желательно писать именно в таком порядке — `background`, `background-clip`, `color`. Собственно, основную магию как раз и дает `background-clip:text`, который заливает буквы градиентом, который мы прописали ранее. Ну и чтобы буквы не залились обычный цветом — делаем его прозрачным.

В сущности, это все, друзья. Посмотреть пен можете тут:

<iframe title="CSS Magic #6. Gradient text" src="//codepen.io/MaxGraph/embed/OYvGzg/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

До скорого!
