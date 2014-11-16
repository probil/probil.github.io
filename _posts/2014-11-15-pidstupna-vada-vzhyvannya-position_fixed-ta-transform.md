---
layout: post
title: "Підступна вада з position:fixed та transform у CSS"
modified:
categories: posts
excerpt: "Що за звір? Де зустрічається? Яким чином уникати та боротися?"
tags: [css3, front-end, позиціонування, вади, position, fixed, transform]
date: 2014-11-15T20:55:00+03:00
image:
  feature: common/bug-wallpaper.jpg
  credit: www.wallpapercondor.com
  creditlink: http://www.wallpapercondor.com/bug-dndesign-fresh-new-hd-wallpaper/
comments: true
---

Власне в чому полягає проблема: якщо до "прибитого до екрану" елемента застосувати будь-який ``transform``,
прибивання перестає функціонувати і працює точно як ``position: relative`` або ``position: static``.

<p data-height="409" data-theme-id="9157" data-slug-hash="NPWBRE" data-default-tab="result" data-user="probil" class='codepen'>See the Pen <a href='http://codepen.io/probil/pen/NPWBRE/'>Demonstration</a> by Maks Lyashuk (<a href='http://codepen.io/probil'>@probil</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Цей ваді вже **5 років**, вперше про її було сповіщено ще коли Хром був 4-ї версії. Доказ – [rendering bug : position:fixed AND -webkit-transform](https://code.google.com/p/chromium/issues/detail?id=20574).
Але не треба винити в цьому Google. Вони тут взагалі ні при чому і готові виправити коли буде точно описано як себе має поводити браузер у цій ситуації.
Тут [конфлікт в самому стандарті](https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328) і поки Пани, що їх пишуть, не розберуться між собою, його не поправлять.

Ну, а поки вони там вирішують, ми, прості смертні, маємо якось з тим жити. Власне є кілька варіантів виходу з ситуації.

#### 1. Взагалі відмовитись від transform
Забути що такий існує і реалізувати ефекти перетворення блоків за допомогою SVG або статистичних зображень.

#### 2. Обмежити застосування transform
Винести блок з ``position:fixed`` за межі застосування ``transform``, а якщо цьому блоку також потрібний ``transform`` – створити ще один контейнер,
застосувати до нього ``transform``, та кинути його (контейнер) в середину до ``position:fixed``. Головне, щоб вище ``position:fixed`` не було жодного батьківського елемента з ``transform``.

<p data-height="350" data-theme-id="9157" data-slug-hash="QwWZjM" data-default-tab="result" data-user="probil" class='codepen'>See the Pen <a href='http://codepen.io/probil/pen/QwWZjM/'>Demonstration</a> by Maks Lyashuk (<a href='http://codepen.io/probil'>@probil</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


#### 3. Не використовувати position:fixed
Цей метод полягає в реалізації ефекту, який забезпечує ``position:fixed`` за допомогою ``position:absolute``. Спочатку пропишемо для "прикріпленого" елемента в css ``position:absolute``.
Ну а js буде встановлювати позицію залежно від скролу.

{% highlight js %}
$(window).scroll(function(){
  $(".menu").css({'top':this.scrollY +'px'});
});
{% endhighlight %}

Це виглядає так:

<p data-height="350" data-theme-id="9157" data-slug-hash="raNqVr" data-default-tab="result" data-user="probil" class='codepen'>See the Pen <a href='http://codepen.io/probil/pen/raNqVr/'>Demonstration</a> by Maks Lyashuk (<a href='http://codepen.io/probil'>@probil</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Єдина незручність тут така: якщо всі сценарії сторінки ще не завантажились, а користувач вже починає скролити – переміщення блоку відбувається таким ривками. Вихід – закинути сценарій у шапку, або показувати сторіку лише тоді, коли вона повністю завантажилась.