---
title: "CSS Magic #5. Как сделать изображение в виде параллелограмма?"
date: "2023-06-09"
descr: "CSS Magic #5, делаем форму параллелограмма для изображения"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

Привет! В этой статье я расскажу, как сделать блок в виде параллелограмма. Будем использовать `transform: skew()`. Рассмотрим на примере:

## HTML

``` html
<div class="image">
  <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" alt="">
</div>
```

Имеем обычный блок с классом image и внутри картинку (т.к. просто делать текст внутри параллелограмма не так интересно).

## CSS (SCSS)

``` scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  position: relative;
  z-index: 12;
  overflow: hidden;
  border-radius: 10px;
  width: 605px;
  height: 282px;
  transform: skewX(-30deg);
  transition: all 0.15s;

  img {
    position: absolute;
    left: 50%;
    width: 130%;
    height: 100%;
    object-fit: cover;
    transform: skewX(30deg) translateX(-50%);
  }
}
```

Написал код в scss, так как сейчас чаще всего пишу на нем и так быстрее. Собственно, создаем блок, даем ему размеры, `border-radius` (опционально) и `overflow: hidden` (опционально). Последнее нужно, чтобы наша картинка за пределы блока не выходила. Ну и конечно же, ставим transform: `skewX(-30deg)`. `skewX` означает что смещение будем делать только по оси X.

Далее картинка. `transform: skew` по умолчанию так же смещает все элементы внутри себя. Поэтому, если мы не хотим скошенную картинку, нам нужно вернуть ее назад. Просто пишем обратный `transform: skewX(30deg)`. Важно, что не 0, а именно противоположное по знаку значение, чем у родителя.

Картинку так же делаем абсолютной, высоту в 100%, а дальше интересный момент. Ширина у нас 130%, т.к. картинка при обратном изменении `transform` станет квадратной и в углы параллелограмма не попадет. Ее приходится расширять, чтобы она заняла больше пространства (но `overflow` у родителя как раз не даст нам увидеть это расширение). Ну и конечно, нужно задать `object-fit: cover` (для тех, кто очень хочет поддерживать ie 11, такой метод, конечно, не подойдет. Но мы идем в ногу со временем и не обращаем внимания на ie).

Вот собственно и все. Вы в принципе можете любой контент вставить внутрь параллелограмма (текст, видео и т.д.), но не забудьте, что обязательно нужно «вернуть» его в обратное положение. Кстати, на scss вы можете изначально задать переменную `$degrees: 30deg`, и просто ставить transform: skewX(-$degrees)` и transform: `skewX($degrees)`. Очень удобно)

Пен:

<iframe title="skew-ed block" src="//codepen.io/MaxGraph/embed/Xwaaze/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Спасибо Вам, что читаете, и успехов в применении `transform: skew()`!
