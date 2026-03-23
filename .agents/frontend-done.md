# Frontend — FORMA (done)

## Корень проекта

Все пути: `/Users/pavelsharagulov/Dev/Projects/portwebsites/forma` (только эта директория).

## Сделано

- **Layout:** `src/app/layout.tsx` — Playfair (next/font), Fontshare General Sans, `MotionShell` (тема, Lenis, loader, курсор), `Navigation`, `Footer`, `OrganizationJsonLd`, метаданные и Open Graph.
- **Страницы:** `/` (Hero, Featured, About preview, PhotoStrip, Contact section), `/projects` (`ProjectsView`), `/projects/[slug]` (hero, текст, сайдбар метаданных, `ProjectGallery`, prev/next), `/about` (команда, milestones, награды), `/contact` (`ContactForm`, карта Mapbox static при `NEXT_PUBLIC_MAPBOX_TOKEN`, иначе ссылка OSM).
- **SEO:** `src/app/sitemap.ts`, `src/app/robots.ts`.
- **Данные:** `src/data/projects.ts` — 6 проектов, Unsplash.

## Команды

```bash
npm run dev
npm run build   # успешно после правок
npm run lint    # без ошибок
```

## Известные ограничения

- Команда в About: 4 человека в вёрстке (ТЗ допускает 4–6).
- E2E и unit-тесты не добавлены в репозиторий (см. `tests-plan.md`).
