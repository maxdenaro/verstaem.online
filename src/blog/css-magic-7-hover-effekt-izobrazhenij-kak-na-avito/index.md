---
title: "CSS Magic #7. Hover-эффект изображений как на Авито"
date: "2023-06-09"
descr: "CSS Magic #7, делаем эффект наведения, как у Авито"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

Совсем недавно заказчик попросил сделать эффект при наведении на изображение как на _авито_ или _auto.ru_. Там как раз, если чуть пролистнуть, есть блоки с фотографиями и описанием машины, и если наводить на фото — появляется разделение ее на 5 разных фотографий, и в зависимости от области наведения появляются разные фотографии. Удобно. Такая мини-галерея получается. Вот сейчас как раз покажу, как такое делать на примере трех фото.

## HTML

``` html
<div class="image">
  <img src="https://img4.goodfon.ru/wallpaper/nbig/5/6e/abstrakitsiia-fon-polosy-cherno-krasnyi-tsvet.jpg" alt="">
  <div class="image-switch">
    <div class="image-switch-item">
      <div class="switched-image">
        <img src="https://img4.goodfon.ru/wallpaper/nbig/5/6e/abstrakitsiia-fon-polosy-cherno-krasnyi-tsvet.jpg" alt="">
      </div>
    </div>
    <div class="image-switch-item">
      <div class="switched-image">
        <img src="https://uwalls.ru/gallery/5/source/29577.jpg" alt="">
      </div>
    </div>
    <div class="image-switch-item">
      <div class="switched-image">
        <img src="https://i.ytimg.com/vi/BwBhaQoiV94/maxresdefault.jpg" alt="">
      </div>
    </div>
  </div>
</div>
```

Не самая простая разметка, которая содержит в себе главный блок `.image`, картинку (которая будет стартовой и так же она же должна быть вставлена в первый «слайд»), а так же область слайдов `.image-switch` и сами слайды `.image-switch-item`. Ну и внутри айтемов так же есть сами блоки с картинками `.switched-image`, они сделаны абсолютом, но об этом ниже.

## CSS

``` css
.image {
  position: relative;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.image-switch {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-switch-item {
  width: 33.33%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;
}

.image-switch-item::after {
  content: "";
  width: 90%;
  margin: 0 auto;
  height: 3px;
  background-color: rgba(255,255,255, 0.4);
  border-radius: 10px;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.switched-image {
  position: absolute;
  left: 50%;
  top: 0;
  opacity: 0;
  z-index: 2;
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  pointer-events: none;
}

.image:hover .image-switch {
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.image-switch-item:hover .switched-image {
  transition: all 0.3s ease-in-out;
  opacity: 1;
  z-index: -1;
}

.image-switch-item:hover::after {
  background-color: #fff;
  transition: all 0.3s ease-in-out;
}
```

Постараюсь объяснить на пальцах, ибо не совсем ясная структура вырисовывается.

1. Итак, у нас есть блок `.image`, который имеет размеры и центрирован. Внутри него картинка, здесь сделано так, что любая картинка занимает 100% родителя и растягивается, если надо (через `object-fit`).
2. Есть контейнер слайдов - `.image-switch`. Изначально он абсолютный, растянут на 100% родителя, имеет `display: flex` для размещения слайдов в строку, а так же скрыт от нас (имеет `opacity: 0`), чтобы изначально была видна самая первая картинка.
3. Есть сами слайды `.image-switch-item`, они имеют flex для того, чтобы показать белый прямоугольник именно снизу.
4. Есть контейнер для фото - `.switched-image`. Он так же выполнен абсолютом, и обратите внимание, поскольку у `.image-switch-item` нет ни `position: relative`, ни `position: absolute` - он позиционируется от ближайшего элемента с этими свойствами - это элемент `.image-switch`, т.е. контейнер для слайдов. Это сделано не случайно, а чтобы фотография в итоге была не размером со слайд, а размером с контейнер, т.е. 100% изначальной фотографии. Ну и очень важно, что у них у всех стоит `pointer-events: none`, с помощью которого эти блоки никак не подчиняются наведению, выделению и т.д.
5. Ну и дальше сама магия. Сперва, при наведении на `.image`, показываем `.image-switch` - контейнер слайдов, меняя `opacity на 1`.
6. Затем, чтобы показать конкретный слайд, мы при наведении на `.image-switch-item` меняем у `.switched-image` opacity на 1. А так же, для того чтобы наши блоки (полупрозрачные белые) остались видны - меняем z-index на -1. Если вам эти мелочи не нужны - вы можете их убрать и так же убрать `z-index: -1` из стилей.
7. Ну и в конце меняем полупрозрачный белый фон на просто белый.

Вот собственно и все. Надеюсь, Вам было более-менее понятно) Если нет - пишите вопросы в личку или в комментарии - отвечу)

Как обычно, пен:

<iframe title="CSS Magic #7. Image hover effect" src="//codepen.io/MaxGraph/embed/pmMYQz/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Успехов Вам, друзья, и до скорого)
