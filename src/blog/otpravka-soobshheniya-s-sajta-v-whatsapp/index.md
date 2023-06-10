---
title: "Отправка сообщения с сайта в WhatsApp"
date: "2023-06-09"
descr: "Отправляем сообщение с сайта прямо в чат WhatsApp"
author: "maksim_vasyanovich"
pseudonim: "MaxGraph"
cover: "img/cover.jpg"
categories:
 - web-notes
sources: ""
layout: "post.njk"
---

Лично на мой взгляд решение не идеальное. Но другого я не вижу, если вы конечно не используете какие-то плагины на WordPress, и то сомнительно)

Собственно, вся суть находится на <a href="https://faq.whatsapp.com/en/android/26000030/?category=5245251" target="_blank">этой</a> странице. Нужно по сути отправлять запрос по ссылке, передавая номер телефона (обязательно уже зарегистрированного в WhatsApp и текст письма). Конечно, в плане больших данных придется довольствоваться только строчным представлением, типа: Телефон: 123456, Имя: Алексей, email: alexey@gmail.com. По крайней мере пока я не разобрался с переносами).

Итак, нам нужно сперва создать html-разметку:

## HTML

``` html
<form action="#" class="form" method="POST">
  <input type="text">
  <button type="submit">Отправить</button>
</form>
```
## JS

``` js
const form = document.querySelector('.form');
const number = '7911352392';
function sendToWhatsapp(text, phone) {

  text = encodeURIComponent(text);

  let url = `https://web.whatsapp.com/send?phone=${phone}&text=${text}&source=&data=`;

  window.open(url);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = e.currentTarget.querySelector('input').value;

  sendToWhatsapp(text, number);
});
```

Пишем функцию `sendToWhatsapp`, передавая два параметра - текст и телефон. Внутри обрабатываем текст с помощью <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" target="_blank">encodeURIComponent()</a>, чтобы убрать пробелы и верно закодировать строку для урла. Далее формируем сам урл, с помощью шаблонных строк вставляем наши текст и телефон. После этого через `window.open()` переходим по этой ссылке в новой вкладке.

Ниже же получаем при клике на кнопку телефон и текст и вызываем написанную функцию `sendToWhatsapp`.

Собственно, этот код перебросит нас сразу в чат с собеседником, останется только нажать кнопку "отправить". Ну и нужно понимать, что у отправляющего тоже должна быть настроена web-версия. Как я и говорил, способ не идеальный, но самый простой.

Всем успехов в применении :)
