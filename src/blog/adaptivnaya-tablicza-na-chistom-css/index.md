---
title: "Адаптивная таблица на чистом CSS"
date: "2023-06-09"
descr: "В этой статье рассказывается, как можно адаптировать html-таблицу с помощью CSS"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - css
sources: ""
layout: "post.njk"
---

## Введение

Не секрет для любого верстальщика, что таблицы — зло. Их сложно адаптировать, кастомизировать. Если на десктопной версии сайта еще довольно легко расписать таблицу, то когда начинается адаптивная верстка — все идет в тартарары.

Собственно, одним из действенных вариантов — создание горизонтальной прокрутки у таблицы. Делается несложно, но сегодняшний пост не об этом. Однако, покажу для Вас.

## Первый способ адаптации

``` html
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Услуга</th>
        <th>Описание</th>
        <th>Цена</th>
        <th>Скидка</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Мобильная верстка</td>
        <td>Верстка под телефоны</td>
        <td>$3000</td>
        <td>50%</td>
      </tr>
      <tr>
        <td>Посадка на CMS WordPress</td>
        <td>Создание сайта с админ. панелью</td>
        <td>$3000</td>
        <td>30%</td>
      </tr>
    </tbody>
  </table>
</div>
```

Стилизуем все это дело (главным образом нам нужно стилизовать `.table-wrap`).

``` css
.table-wrap {
  text-align: center;
  display: inline-block;
  background-color: #fff;
  padding: 2rem 2rem;
  color: #000;
}

@media screen and (max-width: 600px) {
  .table-wrap {
    overflow-y: scroll;
  }
}
```

В результате, на ширине ДО 600 пикселей таблица будет скроллиться, а сайт нет. Удобно, но сегодня я хотел бы поговорить о другом.
Я нашел еще один интересный подход к адаптивности таблицы. Он заключается в использовании data-атрибутов и псевдоклассов. Сейчас все покажу.

## Второй способ адаптации

Для начала поменяем разметку:

``` html
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Услуга</th>
        <th>Описание</th>
        <th>Цена</th>
        <th>Скидка</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Услуга">Мобильная верстка</td>
        <td data-label="Описание">Верстка под телефоны</td>
        <td data-label="Цена">$3000</td>
        <td data-label="Скидка">50%</td>
      </tr>
      <tr>
        <td data-label="Услуга">Посадка на CMS WordPress</td>
        <td data-label="Описание">Создание сайта с админ. панелью</td>
        <td data-label="Цена">$3000</td>
        <td data-label="Скидка">30%</td>
      </tr>
    </tbody>
  </table>
</div>
```

В принципе, вы можете с помощью js сделать тоже самое, пробежавшись по всем `td`.

Итак, раздали каждому столбцу атрибут `data-label`, который нам пригодится в будущем.

Задаем базовые стили:

``` css
body {
  text-align: center;
  padding-top: 10%;
  font-family: sans-serif;
  background-image: url('bg.jpg');
  background-size: cover;
  height: 100vh;
  color: #fff;

}
.table-wrap {
  text-align: center;
  display: inline-block;
  background-color: #fff;
  padding: 2rem 2rem;
  color: #000;
}

table {
  border: 1px solid #ccc;
  width: 100%;
  margin:0;
  padding:0;
  border-collapse: collapse;
  border-spacing: 0;
}

table tr {
  border: 1px solid #ddd;
  padding: 5px;
}

table th, table td {
  padding: 10px;
  text-align: center;
  border-right: 1px solid #ddd;
}

table th {
  color: #fff;
  background-color: #444;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}
```

Выглядит, как обычная таблица, естественно, сдвигая сайт на 320-420 пикселях, мы увидим горизонтальный скролл всего сайта. Не дело. Как это исправить? добавляем стили:

``` css
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table thead {
    display: none;
  }

  table tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
  }

  table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    border-right: 1px solid transparent;
  }

  table td:last-child {
    border-bottom: 0;
  }

  table td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
}
```

Здесь мы сделали строки таблицы блочными, удалили названия столбцов, а текст самих столбцов выровняли по правому краю. В свою очередь при помощи псевдокласса `::before` мы присоединяем к левому краю наши data-атрибуты. И все получилось. Пример посмотрите в пене:

<iframe title="Adaptive Table" src="//codepen.io/MaxGraph/embed/gyxqpB/?height=265&amp;theme-id=0&amp;default-tab=css,result" allowfullscreen></iframe>

Как видно, мы превратили строки таблицы в небольшой блок, в котором заключена вся информация. Думаю, такой вариант адаптивности таблицы подойдет для небольших таблиц. Пользуйтесь, друзья!

Надеюсь, Вам было интересно читать данную информацию. До скорых встреч)
