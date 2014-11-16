---
layout: post
title: "Як приручити мета-теґ 'viewport' на iOS7 та нище"
modified:
categories: posts
excerpt: "Власний досвід спілкування з viewport на iOS7/6/5."
tags: [front-end, iOS, viewport, iOS7, meta, вигляд, масштаб, правки, html]
image:
  feature: 22.2014/How-to-Train-Your-Dragon.jpg
  credit: wnypapers.com
  creditlink: http://www.wnypapers.com/content/images/entertainment/How-to-Train-Your-Dragon.jpg
date: 2014-10-22T14:58:00+03:00
comments: true
---

В одному з останніх проектів потрібно було налаштувати зум на сторінці таким чином, щоб на великих екранах – основний контент був посередині (весь інший простір заповнював фон), а на маленьких – сайт брав найбільш доцільну ширину і вписував її в розміри екрану (зменшуючи). Власне все просто реалізувалось через задання статичної ширини основному блоку та його центрування. На ПК все чудово.

Дійшло діло до мобільних браузерів – полізли косяки. Спочатку був стандарний підхід з шаблону htm5:
{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1">
{% endhighlight %}
Але умова припасування взагалі не спрацьовувала – отже, не піде. Наступним кроком стало статичне задання ширини
{% highlight html %}
<meta name="viewport" content="width=1200, initial-scale=1">
{% endhighlight %}
На всіх андроїдах та iOS8 – ідеально. iOS7 – основний блок у значно меншому масштабі.

<figure class="half">
    <a href="/images/22.2014/bs_ios_Tablet_iPad_Mini_2-8.0.jpg"><img src="/images/22.2014/bs_ios_Tablet_iPad_Mini_2-8.0.jpg"></a>
    <a href="/images/22.2014/bs_ios_Tablet_iPad_4th-7.0.jpg"><img src="/images/22.2014/bs_ios_Tablet_iPad_4th-7.0.jpg"></a>
    <figcaption>Вигляд в iOS8 (ліворуч) та у iOS7 (праворуч).</figcaption>
</figure>

<br/>

Кілька годин перечитував документацію використання цього мета-теґу – думав проблема у використанні, перепробував кучу комбінацій. Одні люди рекомендують вказувати ширину перед початковим зумом, інші – після, але використовувати інші лапки. Словом, вирішити проблему це не допомогло.
Випадково наткнувся на статтю одного чоловіка, що тестував iOS 7 та жаліється на кучу підступних вад. Тут до мене почало доходити, що проблема конкретно для iOS7/6/5.

Після п’ятихвилинного спілкування з гуглом я знайшов сценарій [Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill) на GitHub, який легко це виправляє.

Використання доволі просте:

{% highlight html %}
<script src="viewport-units-buggyfill.js"></script>
<script>window.viewportUnitsBuggyfill.init();</script>
{% endhighlight %}

Нестиснений JavaScript розміром 8Кб одразу все вирішив. А я стільки мучився...

