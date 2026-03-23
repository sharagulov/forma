# Архитектура: FORMA Architects (портфолио-сайт)

Источник: `specs/tz.md` (симлинк на `tz_forma.md`).

---

## 1. Стек

| Слой | Технология | Примечание |
|------|------------|------------|
| **Фреймворк** | Next.js 15 (App Router, RSC) | SSR/SSG, оптимизация изображений |
| **Язык** | TypeScript 5.x | Строгая типизация |
| **Стили** | Tailwind CSS 4.x + CSS custom properties | Дизайн-токены, темы |
| **Анимации** | GSAP 3.x (ScrollTrigger; SplitText при необходимости) + Lenis | Scroll, hero-текст, горизонтальный скролл ленты |
| **Изображения** | `next/image`, форматы WebP/AVIF | Lazy loading, responsive |
| **Шрифты** | `next/font` (Google: Playfair Display) + Fontshare (General Sans) | См. ТЗ §4.2 |
| **Сборка** | Next.js (Turbopack по умолчанию в dev при поддержке) | `next build` |
| **Деплой** | Vercel (альтернатива: Cloudflare Pages) | Edge/CDN |
| **Бэкенд** | Нет отдельного сервиса в ТЗ | Статический контент; опционально Route Handlers для формы (см. допущения) |
| **БД / ORM** | Не требуется | Данные проектов — модуль `src/data/` (TS/JSON) |
| **Тесты** | Рекомендуется: Vitest или Jest + Testing Library для утилит/хуков; Playwright — опционально для smoke | В ТЗ не зафиксировано — на усмотрение пайплайна |

**Альтернатива из ТЗ (не основная ветка):** Vite 6 + Vanilla/Astro, без Next — только если явно отказаться от Next.js.

---

## 2. API-контракты

В ТЗ **нет** обязательного REST/GraphQL backend. Ниже — целевые контракты для **опциональной** интеграции контактной формы (одно из допущений реализации).

### 2.1. Опция A — без сервера (MVP)

- Форма: валидация на клиенте (HTML5 + JS), отправка через `mailto:` или ссылка на внешний сервис (без собственного API).
- **HTTP API приложения:** не используется.

### 2.2. Опция B — Next.js Route Handler `POST /api/contact`

| Поле | Тип | Обязательность |
|------|-----|----------------|
| `name` | string | да |
| `email` | string (email) | да |
| `message` | string | да |

**Успех (пример):** `200` / `201`, JSON `{ "ok": true }`.

**Ошибки (пример):**

| Код | Условие | Тело (пример) |
|-----|---------|----------------|
| `400` | Невалидные поля | `{ "ok": false, "error": "validation", "details": [...] }` |
| `405` | Не POST | `{ "ok": false, "error": "method_not_allowed" }` |
| `500` | Сбой провайдера email / конфигурации | `{ "ok": false, "error": "server" }` |

Реализация: Resend / SendGrid / Nodemailer и т.д. — не зафиксировано в ТЗ.

### 2.3. Опция C — сторонняя форма (Formspree, Getform, и т.д.)

- Клиент отправляет на URL провайдера (часто `POST` с полями по их документации).
- Собственные эндпоинты Next.js не обязательны.

### 2.4. Карта (Mapbox)

- При интерактивной карте: использование **публичного** токена Mapbox на клиенте (`NEXT_PUBLIC_*`) — не HTTP API проекта, а SDK Mapbox GL JS.
- Ошибки — по документации Mapbox; fallback: статичное изображение карты без API.

---

## 3. Компоненты UI и маршрутизация

### 3.1. Маршруты (App Router)

| Путь | Страница | Содержание (кратко) |
|------|----------|---------------------|
| `/` | Главная | Hero, избранные проекты (3), о студии, горизонтальная лента фото, контакт-блок, footer |
| `/projects` | Портфолио | Сетка 6 проектов, фильтр Residential / Public / Interior, masonry-подобная раскладка |
| `/projects/[slug]` | Деталь проекта | Hero, метаданные, текст, галерея + lightbox, prev/next |
| `/about` | О студии | Команда, философия, timeline 2019–2026, награды |
| `/contact` | Контакты | Форма (имя, email, сообщение), адрес, телефон, карта/координаты |

**Служебные:** `sitemap.xml`, `robots.txt` (через `app/` или `public/` — по соглашению Next 15).

### 3.2. Ключевые компоненты (по ТЗ §13 + доработки)

**Layout:** `Navigation`, `Footer`, `ThemeToggle`, `CustomCursor`, (опционально обёртка для Lenis / smooth scroll).

**Главная:** `Hero`, `FeaturedProjects`, блок «О студии» / цифры, `PhotoStrip` (горизонтальный скролл), контакт-секция.

**Projects:** `ProjectGrid`, `ProjectCard`, `ProjectFilter`, навигация к `[slug]`.

**Project detail:** мета-панель, `ProjectGallery` + lightbox, `ProjectNav` (prev/next).

**Shared:** `Loader`, `ScrollReveal`, `AnimatedText`, интеграция `prefers-reduced-motion`, skip-link.

**SEO:** метаданные в `layout` / `page`, JSON-LD Organization, canonical, OG.

---

## 4. Структура папок (предложение)

Соответствует ТЗ §13 с уточнениями под App Router и данные.

```text
forma/
├── public/
│   ├── images/
│   │   ├── projects/{slug}/       # 4–8 изображений на проект
│   │   ├── team/
│   │   └── hero/
│   ├── favicon.ico
│   └── og-image.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/contact/route.ts   # только если выбрана опция B
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── projects/
│   │   └── shared/
│   ├── data/
│   │   └── projects.ts            # массив проектов + типы
│   ├── hooks/
│   ├── lib/
│   │   ├── gsap.ts
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

---

## 5. Переменные окружения

Значения **не** хранить в репозитории; описать в **`.env.example`** (создать при появлении интеграций):

| Имя | Назначение |
|-----|------------|
| `NEXT_PUBLIC_SITE_URL` | Канонический базовый URL (OG, sitemap, JSON-LD) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Опционально, для интерактивной карты Mapbox |
| `CONTACT_EMAIL_TO` / `RESEND_API_KEY` / аналог | Если реализован серверный endpoint отправки почты |

---

## 6. Список задач (backlog)

Зависимости: сначала каркас и данные, затем страницы и полировка.

1. **Инициализация:** Next.js 15, TypeScript, Tailwind 4, ESLint, структура `src/app`, `.env.example`.
2. **Дизайн-токены:** CSS variables (палитра §4.1), шрифты, контейнер и отступы, тёмная/светлая тема + `localStorage` + `prefers-color-scheme`.
3. **Данные:** `projects.ts` — 6 проектов с slug, категориями, метаданными, путями к изображениям; контент на английском.
4. **Layout:** навигация (скрытие при скролле вниз), footer, theme toggle, skip-link, семантическая разметка.
5. **Главная:** hero (видео/фото), featured 3, about preview, photo strip, контакт-блок; GSAP/Lenis/loader по ТЗ §5.
6. **Страница Projects:** фильтр, сетка, карточки с hover.
7. **Страница Project Detail:** hero, сайдбар метаданных, галерея + lightbox, prev/next.
8. **About:** команда, текст, timeline, награды.
9. **Contact:** форма + карта (статика или Mapbox); выбрать опцию A/B/C для отправки формы и реализовать.
10. **SEO:** metadata API, OG, JSON-LD Organization, sitemap, robots, alt на изображениях.
11. **A11y и motion:** фокус, контраст, `prefers-reduced-motion` отключает анимации.
12. **Производительность:** размер бандла, lazy images, динамический импорт тяжёлых частей GSAP при необходимости; проверка целей §6.3.
13. **Тесты (опционально):** утилиты, критичные хуки; e2e smoke основных маршрутов.
14. **Деплой:** Vercel, финальный QA по чеклисту §14.

---

## 7. Допущения

1. **Форма контактов:** ТЗ не фиксирует backend; по умолчанию допускается клиентская отправка или внешний сервис. Серверный `POST /api/contact` — опциональное расширение; контракт выше в §2.2.
2. **Карта:** «Mapbox или статичная» — при отсутствии токена использовать статичное изображение или embed без ключа.
3. **Видео в hero:** если используется видео — источник и оптимизация (poster, формат) на усмотрение реализации; fallback — полноэкранное фото из ТЗ.
4. **Page Transitions:** View Transitions API vs GSAP — выбрать одну стратегию, совместимую с Next App Router и reduced-motion.
5. **GSAP SplitText:** может быть платным/отдельным плагином; допустима замена на CSS/`@keyframes` для посимвольной/пословной анимации, если лицензия не подходит.
6. **Язык контента:** английский основной; русская версия в ТЗ опциональна — в рамках первой итерации не закладывается i18n-маршрутизация без отдельного ТЗ.

---

## 8. Риски и нефункциональные требования

- Целевые метрики Core Web Vitals и Lighthouse 95+ (§6.3) — учитывать при подключении GSAP/Lenis (динамический импорт, отключение при reduced-motion).
- Кастомный курсор — на touch-устройствах не навязывать; оставить стандартный указатель.
- Изображения: минимальная ширина для hero 1600px (§8.3); единая цветовая температура.
