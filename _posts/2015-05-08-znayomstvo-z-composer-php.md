---
layout: post
title: "Знайомство з composer, менеджером залежностей php"
modified:
categories: posts
excerpt: "Встановлення в denwer, команди CLI, composer.json, використання з wordpress та інше"
tags: [composer,php, denwer, встановити composer в denwer, інструкція, структура composer.json, wordpress, менеджер залежностей]
image:
  feature: 05.2015/composer-wide.jpg
date: 2015-05-08T23:38:40+03:00
comments: true
---

<section id="table-of-contents" class="toc">
  <header>
    <h3>Зміст</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

### Що таке той ваш composer?

То є такий собі менеджер залежностей php. Коли ви пишете свою програму вона так чи інакше залежить від інших (читай сторонніх) бібліотек як от різні API, фрейморки, ліби що вносять "синтаксичний цукор" і т.д. Так от composer дозволяє правильно керувати цими залежностями: вирішувати конфлікти, автоматично завантажувати правильні простори імен, швидко стягувати з сервера, оновлювати, шукати і т.д. Всі ці залежності він зберігає **в теці з проектом** тому це саме менеджер залежностей, а не менеджер пакунків (як ```PECL``` ) який зберігає залежності в системі. В принципі якщо ви знайомі з ```npm```, ```bower```, ```gem``` то це аналогічна річ тільки для php.

### Які проблеми вирішує composer?

1. Ведення проекту зі сторонніми бібліотеками.
2. Деякі з ваших бібліотек залежать від інших бібліотек. Вирішення конфліктів та пріоритети.
3. Пошук та завантаження в проект потрібних версій бібліотек 
 
### Встановлення
В принципі інсталяція дуже проста (див. оф.сайт)[^getcomposer]... для нормальних систем, а для денвера без танців і енергічного постукування по бубну не обійтись(див. наступний розділ)

{% highlight bash %}
 curl -sS https://getcomposer.org/installer | php
{% endhighlight %} 
Або його можна знайти в репозиторіях системи, якщо ви знаєте як це зробити. 

> **Зауважте:** Краще встановлювати composer в систему глобально щоб писати ```composer <command>``` а не ```php composer.phar <command>```

### Встановлення у denwer
 - Завантажити додатковий пакет модулів PHP[^denwermodules] для denwer (https://db.tt/GBqjgujD)
 - Вимкнути denwer. Встановити бібліотеки.
 - Завантажити інсталятор Composer для windows з офіційного сайту[^getcomposer] або [за прямим посиланням](https://getcomposer.org/Composer-Setup.exe).
 - Підготуємо denwer. 

{% highlight ini %}
c:\WebServers\usr\local\php5\php.ini
----------
819 | extension_dir = "/usr/local/php5/ext"
; замінити на
819 | extension_dir = "c:\WebServers\usr\local\php5\ext\"
{% endhighlight %} 
   - Увімкнемо розширення openssl
{% highlight ini %}
c:\WebServers\usr\local\php5\php.ini
----------
973 | ;extension=php_openssl.dll
; замінити на
973 | extension=php_openssl.dll
{% endhighlight %}
- Встановлення Composer-Setup.exe.  Під час встановлення вказуємо шлях до php.exe наступним чином:
{% highlight ini %}
c:\WebServers\usr\local\php5\php.exe
{% endhighlight %}
- Можливо знадобиться вийти та зайти до системи
- Перевірка встановлення відбувається в консолі наступним чином:
{% highlight sh %}
composer -V
{% endhighlight %}
має бути щось на зразок
{% highlight sh %}
# Composer version 1.0-dev
{% endhighlight %}
### Базові команди

{% highlight sh %}
composer init
{% endhighlight %}
Створює простий файл ``composer.json`` за допомогою інтерактивного меню.
{% highlight bash %}
composer search <ключові слова>
{% endhighlight %}
Шукає співпадіння з описом або назвою в базі даних всіх пакунків[^packagist]
{% highlight bash %}
composer create-project johnpbloch/wordpress dir/
{% endhighlight %}
Створює новий проект з вказаного пакунку в директорію ``dir/``
{% highlight bash %}
 composer install
{% endhighlight %}
Читає файл ``composer.json`` вирішує залежності та встановлює всі необхідні пакунки.
{% highlight bash %}
composer require vendor-name/package-name
{% endhighlight %}
Додає вказаний пакунок до залежностей даного проекту в ``composer.json`` та встановлює його.
{% highlight bash %}
composer update
{% endhighlight %}
Оновлює всі залежності проекту до останньої версії враховуючи обмеження вказані в налаштуваннях. 

> **Зауважте:** Інтерактивне представлення **всіх** команд та пояснення до них можна знайти [тут](http://composer.json.jolicode.com/)[^interactiveComposer] (англ.) а у вигляді структурованого json [тут](https://github.com/composer/composer/blob/master/res/composer-schema.json)[^composerschema]

### Структура файлу composer.json
``composer.json`` то є стандартний json файл. Єдиним обов'язковим параметром є `require` в якому має бути хоча б один елемент.
Приклад базового файлу:
{% highlight json %}
{
    "require": { //список залежностей та версій
        "eldadfux/w3c-validator": "~0.1.0"
    }
}
{% endhighlight %}
Composer підтримує спеціальний формат версій MAJOR.MINOR.PATCH які звуться **семантичними**[^semver]. Вказані версії можуть бути точними ``1.0``, проміжком ``>=1.0 <2.0`` або ``1.0 - 2.0``, приблизними типу ``1.*`` або ``~1.2``. 

Приклад складного файлу:
{% highlight json %}
{
	"name": "laravel/laravel", //назва пакунка
	"description": "The Laravel Framework.", //опис
	"keywords": ["framework", "laravel"], //ключові слова
	"license": "MIT", //ліцензія розповсюдження
	"type": "project", // тип
	"require": { //залежності для використання
		"laravel/framework": "5.0.*"
	},
	"require-dev": { //залежності для розробки
		"phpunit/phpunit": "~4.0",
		"phpspec/phpspec": "~2.1"
	},
	"autoload": { //автозавантаження для використання
		"classmap": [
			"database"
		],
		"psr-4": {
			"App\\": "app/"
		}
	},
	"autoload-dev": {  //автозавантаження для розробки
		"classmap": [
			"tests/TestCase.php"
		]
	},
	"scripts": { //виконання скріптів підчас процедур оновлення/встановлення
		"post-install-cmd": [
			"php artisan clear-compiled",
			"php artisan optimize"
		],
		"post-update-cmd": [
			"php artisan clear-compiled",
			"php artisan optimize"
		],
		"post-create-project-cmd": [
			"php -r \"copy('.env.example', '.env');\"",
			"php artisan key:generate"
		]
	},
	"config": { //параметри конфігурації
		"preferred-install": "dist"
	}
}
{% endhighlight %}

### Composer та Wordpress
Встановлення:
{% highlight bash %}
composer create-project johnpbloch/wordpress www/
{% endhighlight %}
Додавання до проекту репозиторію пакунків wordpress[^wpackagist] та кількох плагінів (ACF, SCPO, Cyr3Lat та ін.):
{% highlight json %}
{
    "name": "acme/brilliant-wordpress-site",
    "description": "My brilliant WordPress site",
    "repositories":[
        {
            "type":"composer",
            "url":"http://wpackagist.org"
        }
    ],
    "require": {
	    "php": ">=5.3.2",
	    "johnpbloch/wordpress-core-installer": "~0.2",
        "wpackagist-plugin/simple-custom-post-order": "~2.2",
	    "wpackagist-plugin/advanced-custom-fields": "~4.4",
	    "wpackagist-plugin/all-in-one-seo-pack": "~2.2",
	    "wpackagist-plugin/query-monitor": "~2.7",
	    "wpackagist-plugin/acf-field-date-time-picker": "~2.0",
	    "wpackagist-plugin/cyr3lat": "~3",
    }
}
{% endhighlight %}
Багато цікавої інформації використання composer з wordpress можна знайти [тут](http://composer.rarst.net/)[^composerrastr].

### Composer та IDE

``composer.json`` чудово редагується будь-яким редактором з підтримкою ``javascript``. Проте існують плагіни які спрощують роботу з ним. 

- [Composer-Sublime](https://github.com/francodacosta/composer-sublime) для Sublime Text 2 & 3
- PhpStorm з версії 8 має вбудовану підтримку composer[^composer-phpstorm]
- NetBeans з версії 7.3 має вбудовану підтримку composer[^composer-netbeans]
- PHP Tools for Visual Studio[^composer-vsphp]

### Корисні посилання

[^getcomposer]: [getcomposer.org](https://getcomposer.org/) – Офіційний сайт composer. Тут знаходиться основна інформація, інструкція з встановлення на всіх платформах та документація.

[^denwermodules]: [denwer.ru/packages/php5.html](http://www.denwer.ru/packages/php5.html) – Офіційна сторінка додаткових модулів php для denwer. На випадок якщо оновиться денвер і пряме посилання не працюватиме.

[^packagist]:  [packagist.org](https://packagist.org/) – Основний репозиторій Composer. Тут знаходяться близько 54 тисячі пакунків які "з коробки" можуть бути встановлені.

[^interactiveComposer]: [composer.json.jolicode.com](http://composer.json.jolicode.com/) – інтерактивне представлення консольних команд composer а також всіх параметрів файлу composer.json

[^wpackagist]: [wpackagist.org](http://wpackagist.org/) – основний composer-репозиторій плагінів та тем для wordpress. Містить абсолютно всі плагіни та теми 

[^composerrastr]:[composer.rarst.net](http://composer.rarst.net/) – Збірка корисних матеріалів для використання composer+wordpress. Метод збірки власного пакунку wordpress, керування плагінами WP, створення пакунків для ядра wordpress.

[^composerschema]: [github.com/composer/composer/blob/master/res/composer-schema.json](https://github.com/composer/composer/blob/master/res/composer-schema.json) – Технічна документація кожного атрибуту та параметра файлу composer.json.

[^semver]: [semver.org](http://semver.org/) – сементичні версії

[^composer-phpstorm]: [jetbrains.com/phpstorm/help/using-composer-dependency-manager.html](https://www.jetbrains.com/phpstorm/help/using-composer-dependency-manager.html) – використання composer в phpstorm

[^composer-netbeans]:[blogs.oracle.com/netbeansphp/entry/composer_support](https://blogs.oracle.com/netbeansphp/entry/composer_support) – використання composer в NetBeans

[^composer-vsphp]:[devsense.com/doc/phptools/projects/composer](http://www.devsense.com/doc/phptools/projects/composer) – використання composer у PHP Tools for Visual Studio