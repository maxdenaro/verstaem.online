---
title: "FadeIn и FadeOut на чистом JS"
date: "2023-06-09"
descr: "Как сделать fadeIn и fadeOut на чистом JS? Рассказываю в этой статье, как не использовать для таких целей jQuery"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - js
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/JS-%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F%20%E2%84%9619.%20FadeIn%2C%20FadeOut"
layout: "post.njk"
---

<iframe src="https://www.youtube.com/embed/B5UNidKMPMU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Что потребуется

Потребуется небольшое знание JS, а также смекалка. Давайте разбираться, но сперва - простейший HTML и CSS.


``` html
<button class="btn">Нажми!</button>
<div class="block">Далеко-далеко, за словесными горами в стране
  гласных и согласных живут рыбные тексты
</div>
```

``` css
.block {
  display: none;
}
```

По сути, у нас есть кнопка, которая будет скрывать\раскрывать блок, а также стиль, который делает скрытым блок по умолчанию. А теперь самое интересное - JS. Сперва сделаем функцию FadeIn.

## FadeIn

``` js
const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};
```

Пройдемся по коду. На самом деле он максимально простой.
1. Создаем функцию с тремя параметрами - передаем сам элемент, время задержки, а также дисплей, который мы хотим получить после того, как блок появится. Кстати, классический fadeIn из jQuery, насколько я знаю, так не умеет.
2. Явно устанавливаем опасити в 0, чтобы потом была возможность сделать из нуля - единицу.
3. Ставим блоку значений __block__, или то, которое передадим в саму функцию.
4. Устанавливаем транзишн, с которым мы хотим менять плавность у блока. За это отвечает переменная `timeout`.
5. И далее, через небольшую задержку, которую человек даже и не заметит, ставим блоку опасити 1.

Тем самым, функция сперва внешне скрывает элемент, затем делает ему дисплей блок (при этом элемент все еще будет внешне не виден, ведь опасити 0), а потом, через микро-задержку ставим опасити 1 с тем временем, которое мы задали собственноручно.

Теперь займемся функцией fadeOut.

## FadeOut

``` js
const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};
```

Здесь ситуация обратная. Сперва явно ставим опасити 1, меняем на 0 с тем же временем, которое нам надо. А вот потом, чтобы опасити успел отработать как надо, мы используем `setTimeout` с тем же временем, что и анимация опасити. Так выходит, что сперва меняется опасити, а уже потом элемент пропадает из потока, т.к. применяется __display: none__.

## Запуск

Остался запуск кода. Здесь будет простой клик на элемент, которой запускает то FadeIn, то FadeOut.

``` js
const block = document.querySelector('.block');
const btn = document.querySelector('.btn');

let flag = false;

btn.addEventListener('click', (e) => {
  if (!flag) {
    fadeIn(block, 1000, 'flex');
    flag = true;
  } else {
    fadeOut(block, 1000);
    flag = false;
  }
});
```

Здесь все просто - делаем клик, и с помощью переменной `flag` определяем состояние - либо элемент виден, либо нет. Ну и вызываем наши готовые функции.

## Заключение

Надеюсь, данная статья была вам полезна. Если же вам интересна видео-версия – в начале статьи есть видео, переходите и смотрите! До скорого!
