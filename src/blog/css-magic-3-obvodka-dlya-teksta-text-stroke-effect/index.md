---
title: "CSS Magic #3. Обводка для текста (text-stroke effect)"
date: "2023-06-09"
descr: "CSS Magic #3, делаем обводку для текста без цвета"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

Привет! Обводка для текста делается довольно легко, однако прежде чем начнем - стоит понимать, что данный метод не сработает в IE. Если Вам не особо нужен IE - либо игнорим проблему, либо выкручиваемся (я покажу как это можно сделать). Поехали!

## HTML

``` html
<div class="no-ie">Text with stroke.</div>
<div class="ie">Text with stroke.</div>
```

Самая обыкновенная разметка. Даже и останавливаться на ней неохота, разве что тут два текста, один будет под IE, другой - под все остальное.

## CSS

``` css
.no-ie {
  font-size: 4em;
  -webkit-text-stroke: 1px darkgrey;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2em;
}

.ie {
  font-size: 4em;
  color: #fff;
  text-shadow:
    -0  -1px  0   #000000,
    0   -1px  0   #000000,
    -0   1px  0   #000000,
    0    1px  0   #000000,
    -1px -0   0   #000000,
    1px  -0   0   #000000,
    -1px  0   0   #000000,
    1px   0   0   #000000,
    -1px -1px 0   #000000,
    1px  -1px 0   #000000,
    -1px  1px 0   #000000,
    1px   1px 0   #000000,
    -1px -1px 0   #000000,
    1px  -1px 0   #000000,
    -1px  1px 0   #000000,
    1px   1px 0   #000000;
}
```

Используем два -webkit-свойства `-webkit-text-stroke` и `-webkit-text-fill-color` для достижения нужного результата. Текст будет прозрачным и будет иметь красивую, нужную нам, обводку. Под IE идем другим путем - придется задать цвет тексту и `text-shadow`. Конкретно такой код может не сработать, поэтому вот вам <a href="https://protocoder.ru/css/strokeTextGen" target="_blank">генератор тени для текста</a>.

Определять браузер можно любым доступным способом (благо их полно в интернете), но если нужно - я расскажу в отдельной статье как)

И по традиции пен:

<iframe title="CSS Magic #3. Text-stroke" src="//codepen.io/MaxGraph/embed/KEybPw/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Вот собственно и все. Простой, но полезный эффект. К сожалению, не лишенный недостатков, но ничего в мире не бывает идеально.

До скорых встреч!)
