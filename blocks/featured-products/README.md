# Featured Products (SKU-driven)

Authoring-friendly block: the author only lists **SKUs**, and the block pulls the
live **image, title and price** from the Catalog Service and renders product cards
that link to each PDP (`/products/{urlKey}/{sku}`). No manual image/price/title.

## How to author in da.live

Insert a block named **Featured Products** and put one SKU per row:

| Featured Products |
| --- |
| AEONMY-13338 |
| aeon-cheesecake |
| aeon-salmon-california-roll |
| AEONMY-6308 |
| AEONMY-958 |

(Comma- or space-separated SKUs in a single cell also work.)

## Behaviour

- Fetches `products(skus: [...])` from the Catalog Service via `CS_FETCH_GRAPHQL`
  (endpoint/headers configured in `scripts/commerce.js` `initializeCommerce`).
- Preserves the authored order; silently skips SKUs that are not found.
- Price is formatted with the currency returned by the store
  (`Intl.NumberFormat`), so it always reflects the real Commerce data.
- Product image uses the `small_image`/`thumbnail`/`image` role.

## Notes

- Renders nothing (and logs a warning) if the fetch fails or no SKUs resolve.
- Styling is a responsive card grid (2 → 3 → 5 columns) in `featured-products.css`.
