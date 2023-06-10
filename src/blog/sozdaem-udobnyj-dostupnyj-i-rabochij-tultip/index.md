---
title: "Создаем удобный, доступный и рабочий тултип"
date: "2023-06-09"
descr: "В этой статье расскажу, как сделать простой тултип с поддержкой доступности на HTML и CSS"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: "https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%B5%D0%BC%20%D1%83%D0%B4%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9%2C%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B9%20%D0%B8%20%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%82%D1%83%D0%BB%D1%82%D0%B8%D0%BF"
layout: "post.njk"
---

## Что такое тултип?

Тултип&nbsp;&mdash; это всплывающее уведомление, как правило работающее по&nbsp;наведению или по&nbsp;клику.
<span class="tooltip">
  <button class="tooltip__btn" aria-describedby="one">Часто</button>
  <span class="tooltip__txt" role="tooltip" id="one">
    <span class="visually-hidden">Тултип: </span>
    Часто&nbsp;&mdash; значит почти всегда))
  </span>
</span> можно увидеть в&nbsp;интернет-магазинах.
И&nbsp;на&nbsp;слове &laquo;часто&raquo; на&nbsp;этой странице вы&nbsp;тоже можете увидеть тултип.

Казалось&nbsp;бы все просто&nbsp;&mdash; сделай див в&nbsp;диве да&nbsp;по&nbsp;ховеру покажи внутренний див и&nbsp;все. Но&nbsp;не&nbsp;тут то&nbsp;было. Давайте разбираться.

## Что нужно для правильного тултипа?

Делать исключительно див в&nbsp;диве нельзя, так как это будет крайне недоступно. Пользователи с&nbsp;ограниченными возможностями просто не&nbsp;смогут никак узнать информацию из&nbsp;тултипа, прочесть ее&nbsp;и&nbsp;понять что в&nbsp;ней. Мы&nbsp;должны им&nbsp;помочь, и&nbsp;это делается стандартными средствами html&nbsp;&mdash; с&nbsp;помощью
<span class="tooltip">
  <button class="tooltip__btn" aria-describedby="two">aria-атрибутов</button>
  <span class="tooltip__txt" role="tooltip" id="two">
    <span class="visually-hidden">Тултип: </span>
    Атрибуты, помогающие расширить привычные возможности HTML&nbsp;в план доступности. Добавляют специальные описания и&nbsp;т.д.
  </span>
</span>.

Ну&nbsp;вот и&nbsp;представье, что на&nbsp;сайт заходит незрячий человек. Он&nbsp;не&nbsp;сможет никак навестись мышкой на&nbsp;тултип, значит ему нужно альтернативное действие. И&nbsp;оно есть&nbsp;&mdash; состояние `:focus`. Так, он&nbsp;сможет лишь с&nbsp;клавиши _tab_ попасть на&nbsp;любой интерактивный элемент страницы, и&nbsp;тултип мы&nbsp;должны сделать таковым.

<div class="note">
  <p>
    <strong>Примечание:</strong>
    Сперва мы&nbsp;сделаем первый из&nbsp;двух видов тултипа&nbsp;&mdash; описательный. Еще есть &laquo;уведомляющий&raquo;, о&nbsp;нем позже.
  </p>
</div>

## HTML

``` html
<span class="tooltip">
  <button class="tooltip__btn" aria-describedby="some_id">Термин</button>
  <span class="tooltip__txt" role="tooltip" id="some_id">
    <span class="visually-hidden">Тултип: </span>
    Описание термина
  </span>
</span>
```

Итак, что&nbsp;же здесь:
* У&nbsp;нас есть спан-родитель с&nbsp;классом `.tooltip` для того, чтобы удобно относительно него располагать сам тултип.
* Внутри два элемента&nbsp;&mdash; кнопка, открывающая тултип, а&nbsp;также спан с&nbsp;текстом&nbsp;&mdash; описанием.
* Кнопка и&nbsp;спан связаны между собой засчет атрибута `aria-describedby` и `id`. Тут мы&nbsp;просто говорим, что хотим по&nbsp;действию на&nbsp;кнопку услышать&nbsp;то, что в&nbsp;спане, если грубо говоря.
* У&nbsp;тултипа есть специальный атрибут `role` со&nbsp;значением `tooltip`. Это позволяет превратить наш обычный спан-элемент в&nbsp;доступный тултип-элемент.
* Еще внутри тултипа есть спан с&nbsp;текстом __Тултип:__. Это для того, чтобы экранная читалка явно сказала пользователю, что он&nbsp;слышит содержимое тултипа.

## CSS

``` css
.tooltip {
  position: relative;
}

.tooltip__btn {
  border: none;
  border-bottom: 1px dashed currentColor;
  padding: 0;
  color: #000;
  background-color: transparent;
  cursor: pointer;
}

.tooltip__txt {
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  z-index: 3;
  padding: 20px;
  width: max-content;
  max-width: 370px;
  box-shadow: 0 0 29px rgb(0 0 0&nbsp;/ 32%);
  font-weight: 400;
  font-size: 14px;
  line-height: 200%;
  color: #fff;
  background: #222;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity .3s ease-in-out,transform .3s ease-in-out,visibility .3s ease-in-out;
}

.tooltip__btn:hover + .tooltip__txt {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.tooltip__btn:focus + .tooltip__txt {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0)
}
```

В&nbsp;целом простой, несложный код. Просто делаем блок внутри блока и&nbsp;показываем его. Тут ключевая особенность как раз в&nbsp;методе показа&nbsp;&mdash; не&nbsp;только по&nbsp;ховеру, но&nbsp;и&nbsp;по&nbsp;фокусу, чтобы с&nbsp;клавиатуры легко &laquo;достать&raquo; элемент. И&nbsp;тут как раз нам помогает кнопка, которая этот самый фокус по&nbsp;умолчанию имеет.

Вот так делается тултип с описанием. Их примеры есть в текущей статье, а также иногда будут встречаться и в иных моих статьях.
А теперь давайте к тултипу-уведомлению. CSS там будет тот же, а вот html другой.

## HTML (тултип-уведомление)

``` html
<span class="tooltip">
  <button class="tooltip__btn" aria-labelledby="warn-tooltip">
    <svg><use xlink:href="#warn"></use></svg>
  </button>
  <span class="tooltip__txt" role="tooltip" id="warn-tooltip">Уведомление!</span>
</span>
```

В сущности, тут все тоже самое, кроме пары нюансов:
* Отсутствует текст в кнопке. Он и не нужен, при фокусе нужно сразу читать содержимое тултипа.
* `aria-describedby` поменялся на `aria-labelledby`. Это как раз и меняет работу тултипа.

Теперь вместо того, чтобы читать сам термин и его расшифровку, тултип просто будет о чем-то уведомлять пользователя. Удобно)

Надеюсь, вам все было понятно. Рекомендую также ознакомиться со статьей: <a href="https://inclusive-components.design/tooltips-toggletips/" target="_blank">ссылка</a>, а также посмотреть видео (в начале статьи) и примеры на гитхаб (ссылка в конце статьи).

Ну и увидимся еще. Удачи!
