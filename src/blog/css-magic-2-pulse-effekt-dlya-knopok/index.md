---
title: "CSS Magic #2. Pulse-эффект для кнопок"
date: "2023-06-09"
descr: "CSS Magic #2, делаем простейший пульс-эффект для кнопки"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

В этой статье расскажу, как сделать пульс-эффект для кнопки. Это в целом несложная темка, поэтому пробежимся довольно быстро.

## HTML

``` html
<button class="button">Кнопка</button>
```

Банальный html-код для кнопки.

## CSS

``` css
.button {
  width: 235px;
  height: 77px;
  border-radius: 39px;
  border: none;
  background-color: tomato;
  display: inline-block;
  color: #222222;
  font-family: sans-serif;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1.68px;
  cursor: pointer;
  transition: all .2s;
}

.button:hover {
  transition: all .2s;
  animation: shadow .6s infinite linear;
  background-color: tomato;
  color: #fff;
}

@keyframes shadow {
  0% {
    box-shadow: 0 0 10px 0px tomato, 0 0 10px 0px tomato;
  }
  100% {
    box-shadow: 0 0 18px 6px rgba(255, 48, 26, 0), 0 0 4px 50px rgba(255, 48, 26, 0);
  }
}
```

Тут в целом простейшая структура - обычные стили для кнопки, и вся магия находится в css-анимации, хотя и она простая: сначала одна тень, а на 100% - другая. Запускаем постоянную анимацию со своим временем и все.

Статейка получилась совсем мелкая (поэтому и решил ее выложить в выходной), но тем не менее такой эффект, думаю, будет весьма полезен. Вот, кстати, пен:

<iframe title="CSS Magic #2. Button pulse shine" src="//codepen.io/MaxGraph/embed/GLvKBV/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Увидимся в следующих статьях!
