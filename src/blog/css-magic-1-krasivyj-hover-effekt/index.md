---
title: "CSS Magic #1. Красивый hover-эффект"
date: "2023-06-09"
descr: "CSS Magic #1, делаем красивый ховер-эффект"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

Привет! Расскажу в этой статье, как можно сделать красивый ховер-эффект заполнения цвета.

## HTML

``` html
<div class="main__menu">
  <div class="container">
    <nav>
      <ul>
        <li><a href="#"><span data-text="HTML/CSS"></span>HTML</a></li>
        <li><a href="#"><span data-text="JavaScript"></span>JavaScript</a></li>
        <li><a href="#"><span data-text="CSS"></span>CSS</a></li>
        <li><a href="#"><span data-text="React"></span>React</a></li>
        <li><a href="#"><span data-text="Angular"></span>Angular</a></li>
      </ul>
    </nav>
  </div>
</div>
```

Собственно, простой html-код. Единственное что важно - у span внутри ссылки есть дата-атрибут data-text. Он должен совпадать с текстом внутри самой ссылки.

<div class="note">
  <p>
    <strong>Примечание:</strong> Возможен баг при наведении, с которым я сам когда-то столкнулся на другом сайте. Может неверно отрабатывать ховер, если у вас есть слова с пробелом в этих ссылках. В таком случае внутри дата-атрибута должно быть "текстnbspтекст". Т.е. вместо пробела ставим символ nbsp. Не забудьте написать символ верно (здесь я указал его без & и ;).
  </p>
</div>

## CSS

``` css
a {
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-size: vh(80);
  color: $color-white;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.6s;

  span {
    position: absolute;
    left: 0;
    display: block;
    overflow: hidden;
    width: 0;
    height: 100%;
    font-size: vh(80);
    background-color: #111517;
    backface-visibility: hidden;
    transition: width .3s;

    &::before {
      content: attr(data-text);
      position: absolute;
      right: 0;
      display: block;
      width: 100%;
      color: $color-red;
      backface-visibility: hidden;
    }
  }

  &:hover {
    span {
      width: 100%;
      transition: width 0.3s;
    }
  }
}
```

Я пожалуй опущу тут остальные стили, только самые нужные покажу. Остальное увидите в конце статьи в codepen. Что тут собственно важно, так это `overflow: hidden` у ссылки и работа псевдоэлемента у `span`. Обратите внимание, в качестве контента указываем `content: attr(data-text)`, это как раз таки "вызов" данных прямо из дата-атрибута. Ну и работает все по довольно простой логике - ширина span меняется с нуля до 100% плавно, благодаря `transition`. Вот собственно и все) И собственно сам codepen:

<iframe title="CSS Magic #1. Hover effect" src="//codepen.io/MaxGraph/embed/zXKerg/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Надеюсь, Вам был полезен данный прием, и Вы сумеете его использовать где-нибудь на Ваших проектах. Это был первый выпуск CSS Magic, дальше будет только интереснее)
