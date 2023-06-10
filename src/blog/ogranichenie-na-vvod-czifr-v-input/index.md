---
title: "Ограничение на ввод цифр в инпут"
date: "2023-06-09"
descr: "Ограничиваем количество вводимых символов в инпут на JS"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - js
sources: ""
layout: "post.njk"
---

## HTML

``` html
<input type="text" class="input">
```

Див, в который мы можем вводить данные.

## JS

``` js
const maxChars = 4;
const input = document.querySelector('.input');

input.addEventListener('keydown', function(){
  if (this.value.length >= maxChars) {
    this.value = this.value.substr(0, maxChars);
  }
});

input.addEventListener('keyup', function(){
  if (this.value.length >= maxChars) {
    this.value = this.value.substr(0, maxChars);
  }
});
```

Логика максимально проста. Задаем количество символов в переменной `maxChars`. Затем, используя события нажатия/отпуская кнопок - пишем функции. Внутри функции условие - если длина вводимых данных больше или равна `maxChars` - о, используем метод `substr`, чтобы удалить ненужные вводимые символы ПОСЛЕ четырех введенных.

