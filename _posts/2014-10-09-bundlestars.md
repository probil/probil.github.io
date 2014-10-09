---
layout: post
title: "Веб-анімація гортання карток з BundleStars"
modified: 2014-10-10T00:54:32+03:00
categories: posts
comments: true
excerpt: "Дістав нестандартну анімацію гортання карток з BundleStars. Експерементальний CSS3 + Modernizr"
tags: [css3, анімація, flipper, front-end, modernizr]
image:
  feature: 1600x500_vertical-perspective-wallpaper.jpg
  credit: http://hqwallbase.com/
date: 2014-10-09T23:25:41+03:00
---

Помітив цікавий ефект перелистування карток на [BundleStars](http://www.bundlestars.com/). Він сподобався мені одразу. Але не міг зрозуміти за яким принципом він працює. 
Крутив-крутив та все ж витягнув його звідти. Виявляється там не все так просто. На чистому CSS3 як от у [iHover](http://gudh.github.io/ihover/dist/index.html) такий ефект не виходить зробити. Хоча такі параметри є:

{% highlight css %}
.flipper {
  /*...*/
  transition: 0.5s;
  transform-style: preserve-3d;
  /*...*/
}
{% endhighlight %}

Далі за допомогою [Modernizr](http://modernizr.com/) перевіряється підтримка **preserve-3d** та робиться підстановка стилів або заглушок.

Словом, ось результат на codepen.io. Думаю якось прикрутити його до портфоліо:

<p data-height="319" data-theme-id="0" data-slug-hash="huwbo" data-default-tab="result" data-user="probil" class='codepen'>See the Pen <a href='http://codepen.io/probil/pen/huwbo/'>Nice flipper from BundleStars</a> by Maks Lyashuk (<a href='http://codepen.io/probil'>@probil</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
**Увага!** Якщо у вас не працює анімація – відкрийте у вікні [(edit on CODEPEN)](http://codepen.io/probil/pen/huwbo), бо чомусь час від часу не працює вбудовано. Думаю це через бібліотеку Modernizr та її використання у iframe.
{:.notice}    
  
###Підтримка браузерами

Мобільні – починаючи з Android 3.0, а на ПК звичайна. IE як завжди позаду воза. Не дарма, люди просять Micro$oft припинити його розробку.

| Сhrome        | Opera         | Firefox        | Safari       |   IE    |
|:--------------|:-------------:|:--------------:|:------------:|--------:|
| 12 `(-webkit)`| 15 `(-webkit)`| 10 `(-moz)`/16 | Є `(-webkit)`| 11      |
|=====
{: rules="groups"}