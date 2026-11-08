# Спецификация API-запросов и ответов от фронта к бэку

### Тестовый запрос

Request: GET http://127.0.0.1:8000/test

Response: любой JSON

## Базовые запросы

### Регистрация

Request: POST http://127.0.0.1:8000/auth/register

Request body:

```
{
    login: string,
    email: string,
    password: string,
    user_type: 1, # если создается ученик
    
    поля ниже написанны, но пока закоменчены: 
    
    specialization: list, # если создается учитель
    first_name: str,
    second_name: str,
    last_name: str
}
```

Response body:

```ts
{
    id: int
    status: "SUCCESS",
} | { // или
    status: "ERROR",
    error_message: string (может быть ошибка 409 с сообщением 'login not unique' или 'email not unique', можно просто при этом выводить нужное сообщение)
}
```

### Логин

Request: POST http://127.0.0.1:8000/auth/login

Request body:

```ts
{
    login: string,
    password: string
}
```

Response body:

```ts
{
    id: int
    status: "SUCCESS",
} | { // или
    status: "ERROR",
    error_message: string,
}
```

### Удаление пользователя

Request: POST http://127.0.0.1:8000/auth/logout

Request body:

```ts
{
    login: string,
    password: string
}
```

Response body:

```ts
{
    status: "200",
} | { // или
    status: "40*",
    error_message: string,
}
```

### Оплата занятия

Request: POST http://127.0.0.1:8000/payment

Request body:

```ts
{
    id: int
}
```

Response body:

```ts
{
    status: "200",
} | { // или
    status: "404",
    error_message: string
}
```

### Данные календаря

Request: POST http://127.0.0.1:8000/get_events_by_month

Request body:

```ts
{
    login: string,
    year: int,
    month: int
}
```

Response body:

```ts
Все в таком же формате, как и в models.py
[ много
    {
        tutor_id,
        student_id,
        date,
        price,
        is_payed,
        start_time,
        length
    }
]
```

### Создание событий

Request: POST http://127.0.0.1:8000/post_lesson

Request body:

```ts
{
    tutor_id: int
    student_email: string
    start_week_day: xx.xx.xxxx (дата понедельника первой недели, на которой булет занятие)
    repeat_for_weeks: int
    repeat_days: list [mon, tue, wed, thu, fri, sat, sun]
    price_per_hour: int
    start_time: xx:xx
    length: int (минуты)
}
```

Response body:

```ts
{
    status: "200",
    event_id: int #id первого созданного event'a
} | { // или
    status: "404",
    error_message: 'user_not_found',
} | { // или
    status: "406",
    error_message: 'invalid_data',
}
```

### Изменение события

Request: POST http://127.0.0.1:8000/put_lesson

Request body:

```ts
{{
    id: int
    type: string (data, start_time, length, price_per_hour) (что-то !одно!),
    если data, то new_data: xx.xx.xxxx,
    если start_time, то new_start_time: xx:xx,
    если length, то new_length: int,
    если price_per_hour, то new_price_per_hour: int
}
```

Response body:

```ts
{
    status: "200"
} | { // или
    status: "404",
    error_message: 'event_not_found'
} | { // или
    status: "400",
    error_message: 'invalid_data'
}
```

### Удаление события

Request: POST http://127.0.0.1:8000/delete_lesson

Request body:

```ts
{
    id: int
}
```

Response body:

```ts
{
    status: "200"
} | { // или
    status: "404",
    error_message: 'event not found'
} | { // или
    status: "409",
    error_message: 'error'
}
```

### Изменение пароля пользователя

Request: POST http://127.0.0.1:8000/change_password

Request body:

```ts
{
    "login": string,
    "new_password": string
}
```

Response body:

```ts
{
    status: "200",
} | { // или
    status: "404",
    error_message: 'user_not_found',
}
```

### Изменение email пользователя

Request: POST http://127.0.0.1:8000/change_email

Request body:

```ts
{
    "login": string,
    "new_mail": string
}
```

Response body:

```ts
{
    status: "200",
} | { // или
    status: "404",
    error_message: 'user_not_found',
}
```

### Изменение login пользователя

Request: POST http://127.0.0.1:8000/change_login

Request body:

```ts
{
    "login": string,
    "password": string,
    "new_login": string
}
```

Response body:

```ts
{
    status: "200"
} | { // или
    status: "404",
    error_message: 'user_not_found'
} | { // или
    status: "400",
    error_message: 'new login must be unique'
} | { // или
    status: "400",
    error_message: 'wrong password'
}
```

### Изменение имени пользователя

Request: POST http://127.0.0.1:8000/change_firstname

Request body:

```ts
{
    "login": string,
    "first_name": string
}
```

Response body:

```ts
{
    status: "200"
} | { // или
    status: "404",
    error_message: 'user_not_found'
}
```

### Изменение фамилии пользователя

Request: POST http://127.0.0.1:8000/change_lastname

Request body:

```ts
{
    "login": string,
    "last_name": string
}
```

Response body:

```ts
{
    status: "200"
} | { // или
    status: "404",
    error_message: 'user_not_found'
}
```

### Получение профиля

Request: POST http://127.0.0.1:8000/auth/get_profile

Request body:

```ts
{
    login: str
}
```

Response body:

```ts
{
    'login': str,
    'email': str,
    'user_type': int,
    'fist_name': str,
    'last_name': str
}
```
### Аналитика за выбранный месяц
Request: POST http://127.0.0.1:8000/analytics/selectedMonth
```ts
    Request body:
    {
      tutor_login: string,
      password: string,
      year: number,
      month: number,
    }
```

Response body:

```ts
    {
        'total_earning': total_earning,
        'lesson_price_mean': lesson_price_mean,
        'most_profitable_month': mx_month,
        'most_profitable_month_income': mx_income_per_month,
        'least_profitable_month': mn_month,
        'least_profitable_month_income': mn_income_per_month,
        'most_profitable_student': mx_student,
        'most_profitable_student_income': mx_student_income,
        'least_profitable_student': mn_student,
        'least_profitable_student_income': mn_student_income
    }
```

### Получение урока по id
Request: POST http://127.0.0.1:8000/auth/craete_message

Request body:

```ts
{
  "id": int
}
```

Response body:

```ts
{
   status: "200",
   data: dict # как в бд кроме homework_files
} | { // или
    status: "404" # Урок не найден
}
```
### Предсказание дохода (линейная регрессия)
Request: POST http://127.0.0.1:8000/analytics/linear_regression

Request body:

```ts
{
    login: string,
    year: int,
    month: int
}
```

Response body:

```ts
{
   status: "200",
   data: {
        "current_month_income": int,
        "next_month_income": float,
        "following_month_income": float
    }
} | { // или
    status: "404"
}
```
*To be continued...*