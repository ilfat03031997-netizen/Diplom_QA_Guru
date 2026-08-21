# 🧪 Дипломная работа QA.GURU | JS + Playwright

[![CI](https://github.com/ilfat03031997-netizen/Diplom_QA_Guru/actions/workflows/main.yml/badge.svg)](https://github.com/ilfat03031997-netizen/Diplom_QA_Guru/actions/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40+-green.svg)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-2.24+-orange.svg)](https://allurereport.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-yellow.svg)](https://developer.mozilla.org/ru/docs/Web/JavaScript)

> Автоматизация тестирования UI и API с интеграцией в CI/CD, отчётами в Allure TestOps и уведомлениями в Telegram.

---

## 📋 Содержание
- [Описание](#описание)
- [Технологический стек](#технологический-стек)
- [Структура проекта](#структура-проекта)
- [Запуск тестов](#запуск-тестов)
- [Запуск в CI/CD](#запуск-в-cicd)
- [Отчетность](#отчетность)
- [Уведомления](#уведомления)

---

## 📖 Описание

Дипломный проект, выполненный в рамках курса по автоматизации тестирования на **JavaScript + Playwright**. Проект включает:

- **UI тесты** — функциональные автотесты для приложения [realworld.qa.guru](https://realworld.qa.guru/)
- **API тесты** — функциональные автотесты для сервиса [apichallenges.eviltester.com](https://apichallenges.eviltester.com/gui/challenges)

### Применённые паттерны
- **Page Object Model** — для UI тестов
- **Service Object Model** — для API тестов
- **Builder Pattern** — для генерации тестовых данных
- **Fixtures** — для переиспользования настроек
- **Facade** — агрегация Page Objects и сервисов

---

## 🛠 Технологический стек

| Категория          | Технологии |
|--------------------|------------|
| **Фреймворк**      | Playwright (JavaScript) |
| **Архитектура**    | Page Object Model, Builder Pattern, Custom Fixtures |
| **Отчетность**     | Allure Report, Allure TestOps, HTML Report Playwright |
| **CI/CD**          | GitHub Actions |
| **Уведомления**    | Allure Notifications (Telegram) |
| **Линтинг**        | ESLint, Prettier |

---

## 📁 Структура проекта
```
Diplom_QA_Guru/
├── .github/
│ └── workflows/
│ └── main.yml # Конфигурация CI/CD
├── notification/ # Настройка уведомлений (Telegram)
├── src/
│ ├── helpers/
│ │ ├── builders/ # Builder Pattern (генерация данных)
│ │ ├── fixtures/ # Кастомные фикстуры Playwright
│ │ └── parsers/ # Парсеры для обработки данных
│ ├── pages/ # Page Objects для UI-тестов
│ │ ├── Authorization.page.js
│ │ ├── EditArticle.page.js
│ │ ├── EditUser.page.js
│ │ ├── LikeArticle.page.js
│ │ ├── Main.page.js
│ │ ├── NewComment.page.js
│ │ ├── PostArticle.page.js
│ │ ├── Register.page.js
│ │ └── Yourfeed.page.js
│ └── services/ # API-клиенты и обертки
│ ├── api.js
│ ├── challenger.service.js
│ ├── challenges.service.js
│ ├── heartbeat.service.js
│ ├── index.js
│ ├── secret.token.service.js
│ ├── todo.service.js
│ └── todos.service.js
├── tests/
│ ├── api.spec.js # API-тесты
│ └── ui.spec.js # UI-тесты
├── .env.example # Пример переменных окружения
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

---

## 🚀 Запуск тестов

### 1️⃣ Предварительные требования
- **Node.js** >= 20.x ([скачать](https://nodejs.org/))
- **npm** >= 10.x (входит в Node.js)
- **Git** ([скачать](https://git-scm.com/))

### 2️⃣ Установка
```bash
# Клонирование репозитория
git clone https://github.com/ilfat03031997-netizen/Diplom_QA_Guru.git
cd Diplom_QA_Guru

# Установка зависимостей
npm install

# Установка браузеров Playwright
npx playwright install --with-deps
```





### 3️⃣ Настройка переменных окружения
```bash
#Скопируйте файл примера и заполните своими данными:

cp .env.example .env


#Откройте .env и укажите URL-адреса:

BACK_URL=https://realworld.qa.guru
BACK_URL_API=https://apichallenges.eviltester.com

#Для интеграции с Allure TestOps и Telegram укажите:

ALLURE_TOKEN=ваш_токен
ALLURE_PROJECT_ID=5342
TELEGRAM_CHAT_ID=ваш_chat_id
TELEGRAM_BOT_TOKEN=ваш_токен_бота

```
4️⃣ Запуск тестов
```bash
Команда	                     Описание                     
npm t	             Запуск всех тестов (UI + API)       
npm test	         Запуск всех тестов (UI + API)       
npm run ui	       Запуск тестов в интерактивном UI-режиме Playwright
npm run report	   Открыть HTML-отчёт Playwright в браузере
npm run allureG	   Сгенерировать Allure-отчёт из результатов (allure-results)
npm run allureO	   Открыть сгенерированный Allure-отчёт в браузере
npm run codegen	   Запустить генератор кода Playwright (record & generate)
npm run lint	     Проверить код с помощью ESLint
```
5️⃣ Просмотр отчетов
```bash
Команда	                     Описание
npm run report	    Открыть HTML-отчет Playwright
npm run allureG	    Сгенерировать отчет Allure
npm run allureO	    Открыть Allure в браузере
```

🔄 Запуск в CI/CD
```bash
GitHub Actions
Тесты автоматически запускаются при каждом push в ветку main.
Статус сборки можно посмотреть здесь: https://github.com/ilfat03031997-netizen/Diplom_QA_Guru/actions
```


📊 Отчетность
Для визуализации результатов используется Allure.

Allure TestOps
Результаты тестов автоматически загружаются в Allure TestOps.
👉 Проект в Allure TestOps  https://allure.qa.guru/project/5342/launches

<img width="1896" height="852" alt="image" src="https://github.com/user-attachments/assets/02ed06c5-e838-4c19-bb71-8de8182d1ce9" />

https://allure.qa.guru/jobrun/55129

<img width="1917" height="881" alt="image" src="https://github.com/user-attachments/assets/3c710d5b-bf42-46f0-aeb2-521cf036201f" />

📨 Уведомления
После каждого прогона тестов бот отправляет сводку в Telegram-чат.

<img width="715" height="786" alt="image" src="https://github.com/user-attachments/assets/b3958b2f-5e3e-4ff2-97aa-96f265dacdcd" />




📝 Примечания
Все конфигурационные файлы (.prettierrc, eslint.config.mjs, playwright.config.js) уже настроены.

Для локального запуска убедитесь, что переменные окружения заполнены корректно.

При возникновении проблем проверьте версии Node.js и браузеров.
