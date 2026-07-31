# Заметки по разработке

Автор: [@myrron08](https://github.com/myrron08)

Тестовое задание — дашборд приходов и продуктов. Писал для портфолио и показа работодателю.  
Демо: https://tt.tex-home.cc · Код: https://github.com/myrron08/inventory-crm-dashboard

---

## С чего начинал

1. Поднял monorepo: `apps/client` (React + Vite) и `apps/server` (Express).
2. Разложил фронт по FSD — так проще не смешивать UI и запросы к API.
3. Данные на сервере держу в памяти (seed), SQL-схему вынес отдельно в `database/` — это «как должно быть в MySQL», не runtime.

## Что сам считаю основной логикой

- **Приходы:** список → клик → боковая панель → `GET /api/orders/:id`.
- **Удаление:** сначала модалка с превью продукта, потом `DELETE` — на сервере приход и все его продукты убираются из массива (аналог `ON DELETE CASCADE` в SQL).
- **Поиск:** на приходах фильтрую уже загруженный список в браузере; на продуктах — запрос на сервер с `?search=`, потому что там фильтры тяжелее.
- **Вкладки:** Socket.io, событие `tabs:count`. Ломалось, когда `CLIENT_ORIGIN` не совпадал с URL в браузере — после HTTPS пришлось явно поставить `https://tt.tex-home.cc`.

## Проблемы, которые реально решал (не из туториала)

### VPS и сеть

- Сначала был trial VPS только с IPv6 — с Mac по SSH не подключался (`No route to host`).
- Взял IPv4 у HostPro, залил проект архивом, поставил Docker.

### Docker

- Сборка падала на **husky** (`prepare` script). Починил: `ENV HUSKY=0` и `npm ci --ignore-scripts` в Dockerfile.

### Публичная ссылка без деплоя

- Пробовал LocalTunnel — нестабильно, 502, белый экран.
- Vite ругался на host → добавил `allowedHosts: true` для dev.

### Домен и SSL

- Домен `tt.tex-home.cc`, A-запись на IP сервера (Cloudflare, DNS only).
- Docker слушает `127.0.0.1:8080`, снаружи nginx на Ubuntu + Let's Encrypt.
- Certbot один раз ругался на отсутствующий ssl include — упростил конфиг в `deploy/nginx/`.
- После смены origin пересобрал/перезапустил server с `CLIENT_ORIGIN=https://tt.tex-home.cc`.

## Что добавил позже (уже после первой версии)

- Сортировка продуктов по цене на странице `/products` — чисто на клиенте, список уже пришёл с API.
- Ссылка «Заметки по разработке» в сайдбаре — на этот файл.


Redux slices: `orders`, `products`, `tabs`, плюс UI: `orderPanel`, `deleteModal`, `search`, `toast`.

## Как проверить локально

```bash
npm install
cp .env.example .env
npm run dev
```

Проверки перед push: `npm run lint && npm run typecheck && npm run test && npm run build`

