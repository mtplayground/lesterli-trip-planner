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

## PWA icon assets

The PWA manifest and Apple touch icon use PNG assets generated from the
checked-in `public/favicon.svg`.

Regenerate them with ImageMagick:

```bash
magick -background none -density 1024 public/favicon.svg -resize 192x192 -gravity center -extent 192x192 -depth 8 public/pwa-192x192.png
magick -background none -density 1024 public/favicon.svg -resize 512x512 -gravity center -extent 512x512 -depth 8 public/pwa-512x512.png
magick -size 512x512 xc:'#08060d' \( -background none -density 1024 public/favicon.svg -resize 384x384 \) -gravity center -compose over -composite -depth 8 public/pwa-512x512-maskable.png
```

The maskable icon intentionally renders the favicon at 384px on a 512px
background to preserve safe-area padding for Android adaptive icon masks.

The production build currently emits a static bundle under `dist/` with:

- `dist/index.html`
- hashed JS and CSS files in `dist/assets/`
- static SVG assets such as `dist/favicon.svg` and `dist/icons.svg`

For a local sanity check of the built bundle:

```bash
npm run preview -- --host 0.0.0.0 --port 8080
```

## PWA & Mobile Install

Trip Planner is configured as an installable Progressive Web App. To verify the
production PWA output locally:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 8080
```

Then open `http://localhost:8080` in Chrome and check DevTools:

1. **Application > Manifest** shows the `Trip Planner` manifest, standalone
   display mode, theme color `#863bff`, and 192/512/maskable icon entries.
2. **Application > Service Workers** shows the generated service worker
   registered for the page after reload.
3. **Lighthouse > Progressive Web App** completes without missing manifest,
   icon, or service-worker registration warnings.

### Install from desktop Chrome

1. Build and serve the production bundle with `npm run preview`.
2. Open `http://localhost:8080` in Chrome.
3. Select the install icon in the address bar, or choose
   **Customize and control Chrome > Save and share > Install Trip Planner**.
4. Launch Trip Planner from the installed app shortcut.

### Add to Home Screen on iOS

1. Open the deployed Trip Planner URL in Safari on iPhone or iPad.
2. Tap the **Share** button.
3. Choose **Add to Home Screen**.
4. Confirm the name `Trip Planner`, then tap **Add**.

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
