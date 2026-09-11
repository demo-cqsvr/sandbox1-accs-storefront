import { CS_FETCH_GRAPHQL, getProductLink } from '../../scripts/commerce.js';

const PRODUCT_QUERY = `query FeaturedProducts($phrase: String!, $pageSize: Int!) {
  productSearch(phrase: $phrase, page_size: $pageSize) {
    items {
      productView {
        sku
        name
        urlKey
        images(roles: ["small_image"]) { url }
        ... on SimpleProductView {
          price { final { amount { value currency } } }
        }
      }
    }
  }
}`;

function formatPrice(amount) {
  if (!amount || amount.value == null) return '';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: amount.currency || 'USD',
    }).format(amount.value);
  } catch (e) {
    return `${amount.value}`;
  }
}

function optimizedSrc(url, width = 300) {
  if (!url) return '';
  // ACCS media CDN supports ?width=; never send height (height=NaN returns a 1x1 image)
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}width=${width}`;
}

function renderCard(product) {
  const pv = product.productView;
  const li = document.createElement('li');
  li.className = 'featured-products-card';

  const link = document.createElement('a');
  link.className = 'featured-products-card-link';
  link.href = getProductLink(pv.urlKey || pv.sku, pv.sku);

  const imgUrl = pv.images?.[0]?.url;
  if (imgUrl) {
    const img = document.createElement('img');
    img.className = 'featured-products-card-image';
    img.src = optimizedSrc(imgUrl);
    img.alt = pv.name || pv.sku;
    img.loading = 'lazy';
    link.append(img);
  }

  const name = document.createElement('h3');
  name.className = 'featured-products-card-name';
  name.textContent = pv.name || pv.sku;
  link.append(name);

  const priceText = formatPrice(pv.price?.final?.amount);
  if (priceText) {
    const price = document.createElement('div');
    price.className = 'featured-products-card-price';
    price.textContent = priceText;
    link.append(price);
  }

  li.append(link);
  return li;
}

/**
 * Featured products carousel — fetches products from Catalog Service and renders
 * a horizontal, scrollable row of product cards linking to their PDPs.
 * @param {Element} block
 */
export default async function decorate(block) {
  const heading = (block.textContent || '').trim() || 'Featured products';
  block.textContent = '';

  const header = document.createElement('div');
  header.className = 'featured-products-header';
  const title = document.createElement('h2');
  title.textContent = heading;
  header.append(title);

  const controls = document.createElement('div');
  controls.className = 'featured-products-controls';
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'featured-products-prev';
  prev.setAttribute('aria-label', 'Previous products');
  prev.innerHTML = '<span aria-hidden="true">&#8249;</span>';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'featured-products-next';
  next.setAttribute('aria-label', 'Next products');
  next.innerHTML = '<span aria-hidden="true">&#8250;</span>';
  controls.append(prev, next);
  header.append(controls);
  block.append(header);

  const track = document.createElement('ul');
  track.className = 'featured-products-track';
  block.append(track);

  const scrollByCards = (dir) => {
    const card = track.querySelector('.featured-products-card');
    const amount = card ? card.offsetWidth + 20 : 240;
    track.scrollBy({ left: dir * amount * 2, behavior: 'smooth' });
  };
  prev.addEventListener('click', () => scrollByCards(-1));
  next.addEventListener('click', () => scrollByCards(1));

  try {
    const res = await CS_FETCH_GRAPHQL.fetchGraphQl(PRODUCT_QUERY, {
      variables: { phrase: '', pageSize: 16 },
    });
    const items = res?.data?.productSearch?.items || [];
    items
      .filter((it) => it.productView?.images?.[0]?.url)
      .forEach((product) => track.append(renderCard(product)));
    if (!track.children.length) {
      block.remove();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('featured-products: failed to load products', e);
    block.remove();
  }
}
