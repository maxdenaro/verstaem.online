---
title: "Инверсия цвета на CSS"
date: "2023-06-09"
descr: "Рассказываем об инверсии цвета при наведении на текст с помощью свойства mix-blend-mode"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

<video muted autoplay playsinline controls src="/assets/for-blog/inversiya-czveta-na-css/inversion.mp4"></video>

Видели когда-нибудь такой эффект?) Думаю, кто-нибудь да видел.

Создан он очень просто - всего лишь с использованием css-свойства.

[Прочесть о свойстве](https://developer.mozilla.org/ru/docs/Web/CSS/mix-blend-mode) можете тут.

Это свойство `mix-blend-mode`. В данном конкретном случае нужно использовать код:

``` css
.link {
  mix-blend-mode: difference;
}
```

Тогда у вас так же красиво будет инвертироваться цвет.

Удачи!
