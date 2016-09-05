# market.Knowledge
## Введение
market.Knowledge - веб-ресурс, целью которого является предоставление информации об имеющихся задачах компании, которые пользователи могут выполнять во внерабочее время за дополнительную плату.

## Логика

### Пользователи
Пользователи делятся по статусу на сотрудников компании и партнеров. Таким образом администратор может создавать как разные задания для разных типов пользователей, так и общие задания.

### Задания
**Задания предоставляются в виде карточек, которые отображают следующую информацию.**

1. *Название задания.*
 
2. *Сумма вознаграждения.*

3. *Краткое описание.*

4. *Дедлайн.*

5. *Элемент "мне нравится".*  
Нажатие по эементу "мне нравится" является изъявлением желания пользователя взяться за это задание и его имя будет отображено администратору при выборе исполнителя.

6. *Полное описание, отображающееся в модальном окне при клике по карточке.*

### Модули
**Веб-ресурс реализует следующие модули.**

1. *Модуль демонстрации заданий.*  
Отображает текущие задания сортируя их по месцам. Администратору доступна и возможность поквартального просмотра заданий с выводом общей стоимости заданий за квартал.

2. *Модуль создания заданий.*  
Форма создания карточек.

3. *Модуль просмотра и создания инвайтов.*  
Вывод списка уже созданных инвайтов с разделением по статусу "администратор", "сотрудник", "партнер".
Модуль создания новых инвайтов необходимого статуса в необходимом количестве

4. *Модуль администрирования заданий.*  
 * Вывод списка заданий разбитых по вкладкам "без ответа", "выданные", "выполненные".
 * Редактирование информации уже созданных заданий.
 * Удаление зданий.
 * Выдача заданий пользователем.
 * Просмотр и перевод при необходимости задания "выполненное" в статус "выданное"

5. *Модуль просмотра своих заданий.*  
Просмотр своих заданий, разбитых по вкладкам "без ответа", "выданные", "выполненные"
ВОзможность убрать свою отметку "мне нравится"
Возможность отметить задание как выполненное.

## Стек технологий

**Программная платформа**
Node.js (4.5.0)

**СУБД**
MongoDB

**Шаблонизатор**
Jade

**Используемые бэкенд фреймворки**
- express
- socket.io
- mongoose
- connect-mongo
- express-session
- cookie-parser
- body-parser

**Фронтенд фреймворки**
- bootstrap (3.3.6)
- jquery
- jquery-ui
- bootstrap-material-design
- bootstrap-dateTimepicker

*БД данного проекта уже заполнена в качестве демонстрации. При желании ее можно очистить.*
