# vue-mem

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Cloudflare D1 & API Refactor

This project uses Cloudflare Workers with a D1 database for persistence. The API layer has been refactored to provide consistent database access and JSON/error responses.

Key points:

- `src/api/db.ts` centralizes D1 access with a small helper:
  - `getDb(env)` returns a `D1Client` wrapping `env.D1_VUE_MEM`.
  - Methods: `first(sql, ...params)`, `all(sql, ...params)`, and `run(sql, ...params)`.
  - Response helpers: `json(env, data, status)` and `httpError(env, message, status)`.
- All handlers in `src/api/**` now use these helpers for consistency.

#### Migrations

Run schema migrations against your D1 database using Wrangler. Replace the database name or id if yours differs from `wrangler.jsonc`.

```powershell
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/companies.sql
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/members.sql
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/rewards.sql
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/points.sql
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/redemptions.sql
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/getPendingRedemptions.sql
```

For local development with a D1 preview database:

```powershell
npx wrangler d1 execute d1-vue-mem --file=./migrations/companies.sql
npx wrangler d1 execute d1-vue-mem --file=./migrations/members.sql
```

#### Dev and Deploy

- Wrangler config binds the database in `wrangler.jsonc`:

```jsonc
{
  "main": "src/api/index.ts",
  "d1_databases": [{ "binding": "D1_VUE_MEM", "database_name": "d1-vue-mem" }],
}
```

- Start the worker (Preview):

```powershell
npx wrangler dev
```

- Build the Vue app (served as static assets by Workers):

```powershell
npm run build
```

- Publish:

```powershell
npx wrangler deploy
```

### Build command on Cloudflare worker

```sh
rm -rf node_modules && rm package-lock.json && npm install && npm run build
```

### Cloudflare API

```json
./wrangler.jsonc
{
    //
    main: "main": "src/worker.ts",
}
```

### Wrangle CLI

```sh
npx wrangler d1 execute d1-vue-mem --remote --file=./migrations/members.sql
```

### Hidden route

```
To showcase the usage of indexed DB indexing: http://localhost:5173/members/recent
```
