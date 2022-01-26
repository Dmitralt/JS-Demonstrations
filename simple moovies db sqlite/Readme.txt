Для взаимодействия с Таблицами некоторым запросам необходимы дополнительные данные.

"Параметры задаваемые"- принимает строку(имя, ID, название)
"JSON" в некоторых запросах должен содержать json объект.


######################################################################
ПОЛЬЗОВАТЕЛИ


Если БД была удалена, то при первом запуске появиться запись о суперюзере
{
        "id": 777,
        "username": "superuser",
        "password": "password"
}
(В самой БД пароли храняться в закодированом виде)



-Для создания нового юзера следует в Поле json задать структуру по образцу ниже
{"username":"superuser","password":"password"}
и нажать
Create_User
-Для вывода списка ВСЕХ пользователей необходимо нажать кнопку
Get_users
-Для отображения конкретного пользователя, необходимо в поле "Параметры задаваемые" указать его ID без лишних символов и нажать кнопку
SHOW_user
-Для отображения Юзера под которым мы залогинены необходимо нажать 
Show LOGIN INFO
-Для выхода из-под текущего пользователя необходимо нажать
LOG OUT
-Для удаления пользователя необходимо задать его id в поле "Параметры задаваемые"без лишних символов и нажать 
Delate_user
-Для редактирования имени и\или пароля необходимо задать его id в поле "Параметры задаваемые" а в Поле json задать структуру по образцу ниже
{"username":"superuser","password":"password"}
указав одно или оба поля и нажать кнопку
Update_user

######################################################################
ЗАПИСИ О ФИЛЬМАХ

Записи о фильмах состоят из полей 
id- задаеться самой БД
Title -Имя картины
Release_Year - год создания
Format- формат картины принимающий 1 из 3-х значений -'VHS', 'DVD','Blu-Ray'
Stars - перечень актёров в формате массива строк



-Для создания новой записи о фильме следует в Поле json задать структуру по образцу ниже

{
"Title": "Titlename",
"Release_Year": 2000,
"Format": "DVD",
"Stars": ["Actor Actor","Actor Actor"]}

и нажать
Create_moovie
-Для получения перечня всех фильмов в порядке ID, следует нажать
Show All moovies
-Для получения перечня всех фильмов в порядке алфавита, следует нажать
Show All moovies by Name
-Для получения фильма по ID необходимо в поле "Параметры задаваемые" указать его ID без лишних символов и нажать кнопку
SHOW_moovie_by_id
-Для получения всех картин с определенным актёром следует указать его имя в поле "Параметры задаваемые" и нажать кнопку
SHOW_moovie_by_actor
-Для получения картин с конкретным названием следует задать название в поле "Параметры задаваемые" и нажать кнопку
SHOW_moovie_by_title
-Для удаления записи необходимо задать её id в поле "Параметры задаваемые"без лишних символов и нажать 
Delate_moovie
-Для редактирования полей записи  задать её id в поле "Параметры задаваемые" а в Поле json задать структуру по образцу ниже
{
"Title": "Titlename",
"Release_Year": 2000,
"Format": "DVD",
"Stars": ["test2","test1"]}
указав одно или несколько полей и нажать кнопку
Update_moovie


-Для загрузки фильмов из текстового файла необходимо создать текстовый файл образца 

Title: Blazing Saddles
Release Year: 1974
Format: VHS
Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn

Title: Casablanca
Release Year: 1942
Format: DVD
Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre


Далее в поле "Загрузка Фильмов из файла"
необходимо нафжать "выберите файл", указать нужный файл и после нажать Upload

######################################################################
Запросы

Для работы с Сервером, вместо браузера можно использовать insomnia,Postman и т.д. что передает Запросы.
Список всех используемых запросов

Для доступа к большинству из них предварительно необходимо выполнить запрос регистрации



http://localhost:3000/login.html  		GET
получить Страницу для регистрации

http://localhost:3000/index.html 		GET
Получить главную страницу

http://localhost:3000/login			POST		{"username":"superuser","password":"password"}
Зарегестрироваться, если пользователь есть в БД

http://localhost:3000/login			GET
Получить Данные про текущего пользователя

http://localhost:3000/logoff			POST
выйти из учетной записи

http://localhost:3000/users			POST		{"username":"superuser","password":"password"}
создать пользователя


http://localhost:3000/users			GET
получить список всех пользователей

http://localhost:3000/users/:id			GET
получить пользователя по ID

http://localhost:3000/users/:id			PUT		{"username":"superuser","password":"password"}
изменить поля у пользователя

http://localhost:3000/users/:id			DELETE
Удалить пользователя



http://localhost:3000/moovies			POST		{"Title": "Titlename","Release_Year": 2000,"Format": "DVD","Stars": ["Actor Actor","Actor Actor"]}
Создать запись о фильме

http://localhost:3000/moovies			GET
Получить список фильмов

http://localhost:3000/moovies?Title=x		GET
Получить запись по ID

http://localhost:3000/moovies?Actor=x		GET
получить список фильмов с Актером X

http://localhost:3000/moovies?sortby=Title	GET
выдать все фильмы по алфавиту

http://localhost:3000/moovies/:id		GET
Получить фильм по ID

http://localhost:3000/moovies/:id		DELETE
удалить фильм с указаным ID

http://localhost:3000/moovies_deleteall		DELETE
удалить все фильмы из таблицы

http://localhost:3000/moovies/:id		PUT		{"Title": "Titlename","Release_Year": 2000,"Format": "DVD","Stars": ["Actor Actor","Actor Actor"]}
изменить поля у записи фильма

http://localhost:3000/downloadlist		POST		Upload   (file= "moovieslist.txt") 
Загрузить список фильмов





