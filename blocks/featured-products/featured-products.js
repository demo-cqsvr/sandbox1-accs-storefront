import { CS_FETCH_GRAPHQL, getProductLink } from '../../scripts/commerce.js';

/*
 * Featured Products block
 * ------------------------
 * Author just lists SKUs (one per row) in da.live; this block fetches the live
 * image / title / price from the Catalog Service and renders product cards that
 * link to the PDP. No manual image/price/title authoring needed.
 */

const PRODUCTS_QUERY = `query FeaturedProducts($skus: [String!]!) {
  products(skus: $skus) {
    __typename
    sku
    name
    urlKey
    images { url label roles }
    ... on SimpleProductView {
      price { final { amount { value currency } } }
    }
    ... on ComplexProductView {
      priceRange { minimum { final { amount { value currency } } } }
    }
  }
}`;

function pickImage(images = []) {
  if (!images.length) return null;
  const byRole = (role) => images.find((i) => (i.roles || []).includes(role));
  return byRole('small_image') || byRole('thumbnail') || byRole('image') || images[0];
}

function getAmount(product) {
  return product?.price?.final?.amount
    || product?.priceRange?.minimum?.final?.amount
    || null;
}

function formatPrice(value, currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
    }).format(value);
  } catch (e) {
    return `${currency || ''} ${value}`.trim();
  }
}

function esc(str = '') {
  return str.replace(/[&<>"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
  }[c]));
}

export default async function decorate(block) {
  // 1. collect SKUs authored in da.live (one per row; commas/spaces also allowed)
  const skus = [...block.querySelectorAll(':scope > div')]
    .map((row) => row.textContent.trim())
    .flatMap((text) => text.split(/[\s,]+/))
    .map((s) => s.trim())
    .filter(Boolean);

  block.textContent = '';
  if (!skus.length) return;

  // 2. fetch live product data from Catalog Service
  let products = [];
  try {
    const res = await CS_FETCH_GRAPHQL.fetchGraphQl(PRODUCTS_QUERY, { variables: { skus } });
    products = (res?.data?.products || []).filter(Boolean);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('featured-products: could not fetch products', e);
    return;
  }

  // 3. keep the author's order; drop SKUs that were not found
  const bySku = new Map(products.map((p) => [p.sku, p]));
  const ordered = skus.map((s) => bySku.get(s)).filter(Boolean);
  if (!ordered.length) return;

  // 4. render cards
  const list = document.createElement('ul');
  ordered.forEach((product) => {
    const image = pickImage(product.images);
    const amount = getAmount(product);
    const li = document.createElement('li');
    li.innerHTML = `
      <a class="featured-products-card" href="${getProductLink(product.urlKey, product.sku)}">
        <span class="featured-products-image">${image ? `<img loading="lazy" src="${image.url}" alt="${esc(product.name)}">` : ''}</span>
        <span class="featured-products-title">${esc(product.name)}</span>
        ${amount ? `<span class="featured-products-price">${esc(formatPrice(amount.value, amount.currency))}</span>` : ''}
      </a>`;
    list.append(li);
  });
  block.append(list);
}
