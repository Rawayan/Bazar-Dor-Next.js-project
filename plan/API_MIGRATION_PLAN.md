# BazarDor API Replacement Plan — `openapi.programming-hero.com/api/bazardor`

> Status: PLAN ONLY — do not implement yet.
> Goal: replace existing API (`api.api-store.workers.dev/api/bazardor` + fallback `api.abcz.workers.dev/api/bazardor`) with the new API (`https://openapi.programming-hero.com/api/bazardor`).

Note on `apidoc.md`: no `apidoc.md` file exists in the repo. Current API was reconstructed from `services/*`, `types/*`, `lib/constants.ts`, and page usage (see §1).

---

## 1. Current API (as implemented today)

Base URLs (`lib/constants.ts:6-11`):

- Primary: `https://api.api-store.workers.dev/api/bazardor` (or `NEXT_PUBLIC_API_BASE_URL` override)
- Fallback: `https://api.abcz.workers.dev/api/bazardor`

Transport (`services/api.ts:1-47`):

- `apiFetch(endpoint)` tries primary, on failure retries same `endpoint` on fallback. `cache: no-store`, `Accept: application/json`.

Endpoints in use:

| Function | File | Request | Response handling |
|---|---|---|---|
| `getCategories()` | `services/categories.ts:4-6` | `GET /categories` | expects `Category[]` directly |
| `getCategory(slug)` | `services/categories.ts:8-10` | `GET /categories/${slug}` | expects single `Category` (currently **unused** in UI — grep shows no callers) |
| `getProducts()` | `services/products.ts:128-133` | `GET /products` | `normalizeProductList()` accepts bare array OR `{products\|items\|results\|data}` wrappers |
| `getProduct(slug)` | `services/products.ts:138-155` | none (client-side) — calls `getProducts()` then `.find(p.slug === slug)` | throws if not found → `app/product/[slug]/page.tsx:74-77` maps to `notFound()` |
| `getProductsByCategory(cat)` | `services/products.ts:216-240` | none (client-side) — calls `getProducts()` then local filter with `CATEGORY_ALIASES` | used by `app/category/[category]/page.tsx:65` |
| `getDivisions()` | `services/divisions.ts:7-29` | none (derived) — calls `getProducts()`, collects `market.division \| market.district \| market.location` | deduplicated + `bn-BD` sorted |

Current types:

- `types/category.ts:1-7`: `{ id: number|string; name: string; slug: string; icon?: string; description?: string }`
- `types/product.ts:1-33`: `Product { id, name, slug, category, categoryName?, unit, description?, image?, emoji?, price?, change?, yesterday?, lastWeek?, lastMonth?, markets?: ProductMarket[], prices?: ProductPrice[] }`, `ProductMarket { market, division?, district?, location?, min, max }`
- `services/products.ts:4-30` (`ApiProduct`): `{ id, slug, nameBn|name, category, categoryNameBn, unit, image, description?, today, yesterday, lastWeek, lastMonth, change?: {dir: up|down|flat, pct}, markets?: [{market, district?, division?, location?, min, max}] }`
- Normalization (`services/products.ts:44-84`): `name = nameBn||name`, `category = categoryNameBn||category`, `emoji = image||"🛒"`, `price = today`, `change` signed from `dir+pct`, markets map `division/district = division||district`.

UI coupling:

- `components/home/ProductSections.tsx:5,26` → `getProducts()`
- `app/category/[category]/page.tsx:7,65` → `getProductsByCategory()`; hardcoded `categoryNames` map only covers `chal,dal,tel,mach,mangsho,shobji` (stale — see §3)
- `app/product/[slug]/page.tsx:4,74` → `getProduct(slug)`; renders `product.markets[].division||district||location`
- `lib/product-data.ts` helpers (`getProductPrice`, `getProductChange`, etc.) already tolerate variant field names — no change needed.

---

## 2. New API (given + live-verified 2026-10-10)

Base: `https://openapi.programming-hero.com/api/bazardor` (user pasted `http://…`; verified `https://…` works — use HTTPS).

Namespace response supplied by user:

```json
{
  "datasets": {
    "categories": {
      "count": 8,
      "list": ".../categories",
      "item": ".../categories/chal",
      "filterExample": ".../categories?slug=chal",
      "filterableFields": ["id","slug","nameBn","icon"]
    },
    "products": {
      "count": 33,
      "list": ".../products",
      "item": ".../products/1",
      "filterExample": ".../products?slug=sorno-machi-chal",
      "filterableFields": ["id","slug","nameBn","category","categoryNameBn","categoryIcon","unit","image","today","yesterday","lastWeek","lastMonth"]
    }
  },
  "namespace": "bazardor"
}
```

Live shapes (verified via fetch):

- `GET /categories` → bare array, 8 items: `{ "id":"chal", "slug":"chal", "nameBn":"চাল", "icon":"🍚" }`. Full slug set: `chal, dal, tel, sobji, mach, mangsho, dim-dui, mosla`.
- `GET /categories/chal` → single object (not array).
- `GET /categories?slug=chal` → array with 1 element (filter works, returns array).
- `GET /products` → bare array, 33 items.
- `GET /products/1` → single object **by numeric `id`** (not slug).
- `GET /products?slug=sorno-machi-chal` → array with 1 element (filter works, returns array).
- Product item shape: `{ id:number, slug, nameBn, category:<slug>, categoryNameBn, categoryIcon, unit, image(emoji), today, yesterday, lastWeek, lastMonth, change:{dir,pct}, markets:[{market, division, min, max}] }` — `markets[].division` is a Bengali division name (ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা, সিলেট); no `district`/`location` fields.

---

## 3. Diff / Breaking changes

1. **Base URL + fallback**: old dual-host with `NEXT_PUBLIC_API_BASE_URL` override → single new host. Decide: keep env override + drop `API_FALLBACK_URL`, or keep fallback chain (new primary → old as fallback during transition).
2. **Category field rename**: new uses `nameBn`; app type + UI expect `name`. Needs `nameBn → name` mapping. New has **no** `description`. `id` is now string slug (`"chal"`), previously assumed `number|string` — type still holds.
3. **Category slug set changed**: new = `chal, dal, tel, sobji, mach, mangsho, dim-dui, mosla`. Old UI map uses `shobji` (extra `h`) and lacks `sobji, dim-dui, mosla`. `services/products.ts:171-208` `CATEGORY_ALIASES` covers `chal/rice, dal, tel/oil, mach/fish, mangsho/meat, shobji/sobji/vegetables` but **lacks `dim-dui` (ডিম-দুধ) and `mosla` (মসলা)** — those categories would return empty today if filtered locally.
4. **Product new field `categoryIcon`** (e.g. `"🍚"`) — no current type field; optionally adopt.
5. **`markets[]` simplified**: new has only `{market, division, min, max}`; normalizer's `district/location` fallbacks become dead code but harmless. `getDivisions()` collecting `district/location` will just find nothing — still works via `division`.
6. **Item-by-id vs item-by-slug**: new `GET /products/:id` takes numeric id, but app routes by `slug` (`/product/[slug]`). Cannot directly use item endpoint for detail page unless we (a) keep client-side find, or (b) use `GET /products?slug=<slug>` server filter.
7. **Filtering now server-supported**: `?slug=`, plus all `filterableFields` (e.g. `?category=chal`). Current code deliberately filters client-side ("avoid depending on API's category query format" comment). New API makes server filtering viable — opportunity to cut list-fetch on category/detail pages.
8. **`change.pct` sign inconsistency**: observed `{"dir":"down","pct":-2.9}` (negative pct with dir) vs `{"dir":"up","pct":2.1}`. Current `normalizeProduct` (`services/products.ts:44-54`) does `down → -abs(pct)`, `up → +abs(pct)` — already safe against this. Keep.
9. **Counts**: categories 8, products 33 — small enough that keeping full-list fetch as fallback remains cheap.
10. **`unit` values**: `kg, litre, dozen, piece` (was defaulted to `"কেজি"` when missing — keep default).

---

## 4. Migration plan (no code yet)

### Step 0 — Decisions needed (user confirms before implement)

- [ ] D1: base URL = `https://openapi.programming-hero.com/api/bazardor` hardcoded, or keep `NEXT_PUBLIC_API_BASE_URL` env override with new default?
- [ ] D2: delete `API_FALLBACK_URL` entirely, or retain old hosts as temporary fallback during rollout?
- [ ] D3: category pages — switch `getProductsByCategory` to server query `GET /products?category=<slug>` (faster, fewer bytes) with client-filter fallback, or keep pure client filter?
- [ ] D4: detail page — switch `getProduct(slug)` to `GET /products?slug=<slug>` with client-find fallback, or keep pure client find? (Item-by-id `/products/1` not usable from slug routes without extra lookup.)

### Step 1 — `lib/constants.ts`

- Change `API_BASE_URL` default to `https://openapi.programming-hero.com/api/bazardor`.
- Per D2: remove `API_FALLBACK_URL` (and simplify `services/api.ts`), or repoint fallback.
- Add `NEXT_PUBLIC_API_BASE_URL` to `.env.example` (currently missing — only auth vars present).

### Step 2 — `services/api.ts`

- If fallback removed: drop `requestFromBase` dual-try, keep single-base `apiFetch` with same error shape (`API request failed (status)`).
- Add query-param helper (e.g. `apiFetch('/products?slug='+encodeURIComponent(slug))` or a `buildQuery` util) — call sites pass encoded params.

### Step 3 — `types/category.ts`

- Add `nameBn?: string` (raw API field) while keeping `name: string` (UI field); document that service layer maps `nameBn → name`. Optionally add a `RawCategory` type for the wire shape.

### Step 4 — `services/categories.ts`

- `getCategories()`: fetch `GET /categories`, map each `{id, slug, nameBn, icon}` → `{id, slug, name: nameBn, icon}`. Handle both array and possible `{data|items|results}` wrappers defensively (as products already does).
- `getCategory(slug)`: keep `GET /categories/${slug}` but normalize single-object response the same way; tolerate array-wrapped single (`?slug=` style) just in case.
- Add optional `getCategoryBySlugViaFilter(slug)` only if needed for consistency — probably unnecessary.

### Step 5 — `types/product.ts` + `services/products.ts`

- Extend `ApiProduct` with `categoryIcon?: string` (and keep everything else — wire shape is otherwise identical).
- `normalizeProduct()`: map `categoryIcon` through (new optional `Product.categoryIcon?`); keep `emoji = image`; keep `price = today`, signed `change`, markets mapping (division-only now; keep `district/location` passthroughs for backward compat, they’ll just be `undefined`).
- `normalizeProductList()`: add unwrapping for filter responses (already handles bare array + wrappers — verify `GET /products?slug=` array shape passes through; it does).
- `getProducts()`: unchanged endpoint (`GET /products`) — only base URL changes.
- `getProduct(slug)`: per D4 — preferred: try `GET /products?slug=<slug>` → take `[0]` → normalize; on empty/error fall back to full-list find (current behavior). Keeps detail page working even if filter is flaky.
- `getProductsByCategory(cat)`: per D3 — preferred: try `GET /products?category=<slug>` → normalize list; on empty/error fall back to current alias-based client filter. **Add missing aliases**: `dim-dui: [ডিম-দুধ, dim-dui, dim, dudh, doodh, egg, milk, dairy]`, `mosla: [মসলা, mosla, moshla, spice, spices]`; fix `sobji/shobji` duplication (new canonical is `sobji`).
- Keep `CATEGORY_ALIASES` (not delete) as offline/fallback path.

### Step 6 — `services/divisions.ts`

- No logic change needed (reads `markets[].division`). Optional: drop `district/location` collection or keep as harmless fallback. Verify sorted output still Bengali-correct with only 6 divisions.

### Step 7 — `app/category/[category]/page.tsx`

- Update `categoryNames` map to the new 8 slugs: `{ chal:চাল, dal:ডাল, tel:তেল, sobji:সবজি, mach:মাছ, mangsho:মাংস, dim-dui:ডিম-দুধ, mosla:মসলা }`. Keep `shobji → সবজি` as legacy alias redirect/normalize (old links/bookmarks), i.e. map `shobji` to `sobji` data.
- No other UI change (still consumes `Product[]`).

### Step 8 — Verification (after implement)

- [ ] `GET /categories` renders 8 categories; `nameBn → name` shows Bengali names, icons intact.
- [ ] `GET /products` renders 33 products; home risers/fallers sections populate.
- [ ] `/category/sobji`, `/category/dim-dui`, `/category/mosla` each return correct counts (regression: old `shobji` spelling still resolves).
- [ ] `/product/<any-slug>` loads via filter path and via fallback path (temporarily break filter to test fallback, or unit-test both).
- [ ] `/products/1` id-shape sanity: `today/yesterday/lastWeek/lastMonth/change/markets` render on detail page incl. min/max/avg table.
- [ ] Network tab: category/detail pages issue ≤2 requests; no double-fetch of full list when server filter succeeds.
- [ ] Error paths: API down → existing Bengali error states + retry buttons still show.
- [ ] `npm run lint` / `tsc --noEmit` (as available) clean; no `any` leaks in new mappers.

### Out of scope (explicitly not doing)

- Auth, styling, new pages, pagination/search beyond `filterableFields`, caching strategy changes (`no-store` stays), `lib/product-data.ts` changes.

---

## 5. File-by-file touch list (for the implement step)

| # | File | Change |
|---|---|---|
| 1 | `lib/constants.ts` | new default base URL; fallback decision; |
| 2 | `services/api.ts` | simplify fallback and/or add query support |
| 3 | `types/category.ts` | add `nameBn?` / raw type |
| 4 | `services/categories.ts` | normalize `nameBn→name` |
| 5 | `types/product.ts` | add `categoryIcon?` |
| 6 | `services/products.ts` | wire `categoryIcon`, server-filter paths, alias additions |
| 7 | `services/divisions.ts` | optional cleanup only |
| 8 | `app/category/[category]/page.tsx` | refresh `categoryNames` + `shobji` alias |
| 9 | `.env.example` | document `NEXT_PUBLIC_API_BASE_URL` |

No changes needed: `app/product/[slug]/page.tsx`, `components/home/ProductSections.tsx`, `lib/product-data.ts` (consume already-normalized `Product`).
