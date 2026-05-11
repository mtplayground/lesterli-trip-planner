# lesterli-trip-planner

Trip Planner is a React + TypeScript single-page app bootstrapped with Vite.

## Environment

Copy `.env.example` to `.env` before starting local development or cutting a
production build:

```bash
cp .env.example .env
```

Available variables:

- `VITE_APP_TITLE`: browser-tab title and app-shell title seed

The current example file is:

```dotenv
VITE_APP_TITLE=Trip Planner
```

## Development

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 8080
```

## Build

```bash
npm run build
```

The production build currently emits a static bundle under `dist/` with:

- `dist/index.html`
- hashed JS and CSS files in `dist/assets/`
- static SVG assets such as `dist/favicon.svg` and `dist/icons.svg`

For a local sanity check of the built bundle:

```bash
npm run preview -- --host 0.0.0.0 --port 8080
```

## Static Deployment

This app is a client-side SPA. After `npm run build`, deploy the contents of
`dist/` behind any static web server and make sure unknown routes fall back to
`index.html`.

### nginx

Point nginx at the built directory and enable SPA fallback:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/lesterli-trip-planner/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Typical deployment flow:

1. Run `npm install`
2. Copy `.env.example` to `.env` and set `VITE_APP_TITLE` if needed
3. Run `npm run build`
4. Copy `dist/` to the server, for example `/var/www/lesterli-trip-planner/dist`
5. Reload nginx

### Caddy

For Caddy, serve `dist/` and rewrite missing files to `index.html`:

```caddy
example.com {
    root * /var/www/lesterli-trip-planner/dist
    encode zstd gzip
    try_files {path} /index.html
    file_server
}
```

Typical deployment flow:

1. Run `npm install`
2. Copy `.env.example` to `.env` and set `VITE_APP_TITLE` if needed
3. Run `npm run build`
4. Copy `dist/` to the server, for example `/var/www/lesterli-trip-planner/dist`
5. Reload Caddy

If you deploy behind another static host, the same rule applies: publish the
contents of `dist/` and configure SPA fallback to `index.html`.

## Project structure

- `src/components`: reusable UI building blocks
- `src/data`: static game datasets and registries
- `src/engine`: pure game logic and domain types
- `src/pages`: top-level route and screen composition
- `src/store`: client state management
