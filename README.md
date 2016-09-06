# market.Knowledge
[Некоторые криншоты сайта можно увидеть здесь.] (https://github.com/silenceSunn/market.Knowledge/blob/master/screenshoots.md)
## Введение
market.Knowledge - веб-ресурс, целью которого является предоставление информации об имеющихся задачах компании, которые пользователи могут выполнять во внерабочее время за дополнительную плату.

## Описание
* Данный веб-ресурс является закрытым - при регистрации пользователю необходимо указать инвайт. Каждый инвайт имеет статус "адмнистратор", "пользователь", "партнер", на основании которого пользователь получает статус при регистрации.  
* Различие статусов различается тем. что список заданий для партнеров и пользователей отличается, но одно и то же задание может принадлежать как одному из списков, так и обеим. Администратор соответственно видит все задания и имеет доступ к панели администрирования, созданию инвайтов и так далее.    
* Администратор выдает задания, выбирая из списка откликнувшихся пользователей. При выдаче задания, оно перестает отображаться в общих списках и переходит в статус "выданные задания". После выполнения задания пользователь отмечает его как "выполненные задания" и администратор решает, принять его или сделать замечания и перевести в статус "выданные задания".  
* Все понравившиеся пользователям задания находятся в панели "взятые задания" в списке "без ответа". Это значит, что это задание еще никому не было выдано, и он может от него еще отказаться.  
* В списке "выданные задания" находятся выданные лично пользователю задания, оттуда они могут только перейти в раздел "выполненные".  
* В списке "выполненные задания" находятся выполненные пользователем задания.  
* Панель администрирования схожа с панелью "взятые задания" пользователя, за исключением того, что список "без ответа" и "выполненные задания" отображает всех пользователей, а вместо "выданные задания" отображается список всех заданий с  возможностью их выдачи пользователю, редактирования и удаления.

## Логика

#### Задания
**Задания предоставляются в виде карточек, которые отображают следующую информацию.**

1. *Название задания.*
 
2. *Сумма вознаграждения.*

3. *Краткое описание.*

4. *Дедлайн.*

5. *Элемент "мне нравится".*  
Нажатие по эементу "мне нравится" является изъявлением желания пользователя взяться за это задание и его имя будет отображено администратору при выборе исполнителя.

6. *Полное описание, отображающееся в модальном окне при клике по карточке.*

#### Модули
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

**Используемые бэкенд фреймворки помимо встроенных в node.js**
- [express] (https://github.com/expressjs/express)
- [socket.io] (https://github.com/socketio/socket.io)
- [mongoose] (https://github.com/Automattic/mongoose)
- [connect-mongo] (https://github.com/jdesboeufs/connect-mongo)
- [express-session] (https://github.com/expressjs/session)
- [cookie-parser] (https://github.com/expressjs/cookie-parser)
- [body-parser] (https://github.com/expressjs/body-parser)

**Используемые фронтенд фреймворки**
- [bootstrap (3.3.6)] (https://github.com/twbs/bootstrap)
- [jquery] (https://github.com/jquery/jquery)
- [jquery-ui] (https://github.com/jquery/jquery-ui)
- [bootstrap-material-design] (https://github.com/FezVrasta/bootstrap-material-design)
- [bootstrap-dateTimepicker] (https://github.com/Eonasdan/bootstrap-datetimepicker)

##Особенности
* Style-guide material design
* Хранение паролей пользователей в виде хэша sha-256.
* Сохранение всех сессий в бд с целью упрощения динамической масштабируемости при необходимости.

*БД данного проекта уже заполнена в качестве демонстрации. При желании ее можно очистить.*

## Запуск  
**Для запуска проекта должна быть установлена Node.js**

#### Первый способ (только для win).
* [Готовый к запуску проект пожно скачать отсюда.] (https://drive.google.com/open?id=0B54vyW8OQxAeNzBtQnRZMXJ1SFU)
* Для запуска достаточно запустить .bat  

#### Второй способ.  
* В папке СУБД mongoDB создать mongodb.config c прописанным путем до bd в проекте, **например**   `dbpath=E:\MarketOfKnowledgeFinal/MK_server/db`  
* Запуск в папке СУБД mongoDB  
`mongod.exe --config mongodb.config`  
( `mongo.exe` )  
* Затем запуск market.Knowledge  
`node index.js`  
