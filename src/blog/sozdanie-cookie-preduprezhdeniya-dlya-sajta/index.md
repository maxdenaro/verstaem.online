---
title: "Создание cookie-предупреждения для сайта"
date: "2023-06-09"
descr: "Предупреждение о куках на сайте с помощью плагина cookie.js"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - js
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/JS-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD%D1%8B%20%E2%84%961.%20%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20cookie-%D0%BF%D1%80%D0%B5%D0%B4%D1%83%D0%BF%D1%80%D0%B5%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F"
layout: "post.njk"
---

<iframe src="https://www.youtube.com/embed/RrMgCWBtE_s" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Тут нам поможет библиотека <a href="https://github.com/js-cookie/js-cookie" target="_blank">js-cookie</a>.

По традиции, пишем HTML

## HTML

``` html
<div class="cookie-block">
  Пока куки есть - меня не будет видно.

  <button class="ok">ok</button>
</div>
<script src="cookie.min.js"></script>
<script src="script.js"></script>
```

Ну как видите сам див говорит за себя)

## CSS

``` css
.cookie-block {
  width: 300px;
  height: 50px;
  border: 3px solid red;
  display: none;
}
```

Скрываем предупреждение по умолчанию

## JS

``` js
const cookieEl = document.querySelector('.cookie-block');
const okEl = document.querySelector('.ok');

okEl.addEventListener('click', () => {
  cookieEl.style.display = 'none';
});

let cookies = () => {
  if (!Cookies.get('hide-cookie')) {
    setTimeout(() => {
      cookieEl.style.display = 'block';
    }, 1000);
  }

  Cookies.set('hide-cookie', 'true', {
    expires: 30
  });
}


cookies();
```

Ну&nbsp;и&nbsp;относительно несложный JS:

1. Находим блок с&nbsp;куки и&nbsp;кнопку _ок_
2. По&nbsp;клику на&nbsp;кнопку _ок_ скрываем предупреждение
3. Пишем функцию cookies, которая смотрит, если кука `hide-cookie` не&nbsp;существует&nbsp;&mdash; показываем блок
4. Ну&nbsp;и&nbsp;устанавливаем саму куку на&nbsp;30&nbsp;дней через параметр `expires`

В&nbsp;общем-то и&nbsp;все, очень простой код. Надеюсь, поможет вам. Исходники внизу, а&nbsp;видео&nbsp;&mdash; в&nbsp;начале поста)

Удачи!
