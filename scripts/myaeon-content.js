import { getCatalogProductLink, getCategoryLink } from './catalog-routes.js';

// Curated public reference content. See images/myaeon/SOURCES.md.
export const homeContent = {
  brand: {
    name: 'myAEON2go',
    image: '/images/myaeon/logo.png',
    width: 304,
    height: 78,
  },
  announcement: {
    text: 'Fresh picks and everyday essentials, delivered to your door.',
    label: 'Shop payday deals',
    href: '/search?q=payday',
  },
  promotions: [
    {
      title: 'Mid-Autumn Festival',
      image: '/images/myaeon/promotions-1.webp',
      href: '/search?q=Mid-Autumn%20Festival',
      width: 1600,
      height: 457,
    },
    {
      title: 'Shop and Win',
      image: '/images/myaeon/promotions-2.webp',
      href: '/search?q=Shop%20and%20Win',
      width: 1300,
      height: 400,
    },
    {
      title: 'Daily Recipes',
      image: '/images/myaeon/promotions-3.webp',
      href: '/search?q=Recipes',
      width: 1600,
      height: 450,
    },
  ],
  products: [
    {
      name: 'Japanese Cheese Cake',
      image: '/images/myaeon/products-1.webp',
      priceText: 'MYR 19.90',
      href: getCatalogProductLink('aeon-cheesecake'),
      width: 240,
      height: 300,
    },
    {
      name: 'Salmon & California Roll Set',
      image: '/images/myaeon/products-2.webp',
      priceText: 'MYR 18.90',
      href: getCatalogProductLink('aeon-salmon-california-roll'),
      width: 240,
      height: 300,
    },
    {
      name: 'Sunlight Dishwash Liquid Lemon',
      image: '/images/myaeon/products-3.webp',
      priceText: 'MYR 4.60',
      href: getCatalogProductLink('aeon-sunlight-dishwash-lemon'),
      width: 240,
      height: 300,
    },
    {
      name: 'TOP Liquid Detergent Brilliant Clean',
      image: '/images/myaeon/products-4.webp',
      priceText: 'MYR 17.90',
      href: getCatalogProductLink('aeon-top-liquid-detergent-brilliant-clean'),
      width: 240,
      height: 300,
    },
    {
      name: 'Naturel Pure Olive Oil',
      image: '/images/myaeon/products-5.webp',
      priceText: 'MYR 36.99',
      href: getCatalogProductLink('aeon-naturel-olive-oil'),
      width: 240,
      height: 300,
    },
    {
      name: 'Milo Activ-Go Plus',
      image: '/images/myaeon/products-6.webp',
      priceText: 'MYR 841.00',
      href: getCatalogProductLink('AEONMY-6308'),
      width: 240,
      height: 300,
    },
    {
      name: 'Milo Activ-Go Soft Pack',
      image: '/images/myaeon/products-7.webp',
      priceText: 'MYR 1,197.00',
      href: getCatalogProductLink('AEONMY-6316'),
      width: 240,
      height: 300,
    },
    {
      name: 'Milo Activ-Go Refill Pack',
      image: '/images/myaeon/products-8.webp',
      priceText: 'MYR 341.00',
      href: getCatalogProductLink('AEONMY-8513'),
      width: 240,
      height: 300,
    },
    {
      name: 'Dutch Lady UHT Pure Farm Full Cream Milk',
      image: '/images/myaeon/products-9.webp',
      priceText: 'MYR 562.00',
      href: getCatalogProductLink('AEONMY-5519'),
      width: 240,
      height: 300,
    },
    {
      name: 'Milo UHT',
      image: '/images/myaeon/products-10.webp',
      priceText: 'MYR 276.00',
      href: getCatalogProductLink('AEONMY-49558'),
      width: 240,
      height: 300,
    },
    {
      name: 'Milo Activ-Go Softpack',
      image: '/images/myaeon/products-11.webp',
      priceText: 'MYR 1,197.00',
      href: getCatalogProductLink('AEONMY-12036'),
      width: 240,
      height: 300,
    },
    {
      name: 'Spritzer Sparkling Mineral Water',
      image: '/images/myaeon/products-12.webp',
      priceText: 'MYR 110.00',
      href: getCatalogProductLink('AEONMY-958'),
      width: 240,
      height: 300,
    },
  ],
  categories: [
    {
      name: 'Aeon Fresh',
      href: getCategoryLink('aeon-fresh'),
    },
    {
      name: 'Ready To Eat',
      href: getCategoryLink('aeon-fresh/ready-to-eat'),
    },
    {
      name: 'Baby & Kids',
      href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-baby-kids'),
    },
    {
      name: 'Household',
      href: getCategoryLink('aeon-fresh/household'),
    },
    {
      name: 'myAEON2go',
      href: getCategoryLink('myaeon-importer-v1-root-2'),
    },
    {
      name: 'Beverages',
      href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-beverages'),
    },
    {
      name: 'Grocery',
      href: getCategoryLink('aeon-fresh/grocery'),
    },
    {
      name: 'Snacks',
      href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-snacks'),
    },
  ],
  offers: [
    {
      title: 'Payday Deals',
      image: '/images/myaeon/offers-1.webp',
      href: '/search?q=Payday%20Deals',
      width: 750,
      height: 100,
    },
    {
      title: 'Merdeka Sales',
      image: '/images/myaeon/offers-2.webp',
      href: '/search?q=Merdeka%20Sales',
      width: 716,
      height: 424,
    },
  ],
  navigation: [
    { name: 'All Products', href: getCategoryLink() },
    {
      name: 'Aeon Fresh',
      href: getCategoryLink('aeon-fresh'),
      children: [
        {
          name: 'Aeon Fresh',
          href: getCategoryLink('aeon-fresh'),
        },
        {
          name: 'Ready To Eat',
          href: getCategoryLink('aeon-fresh/ready-to-eat'),
        },
        {
          name: 'Household',
          href: getCategoryLink('aeon-fresh/household'),
        },
        {
          name: 'Grocery',
          href: getCategoryLink('aeon-fresh/grocery'),
        },
      ],
    },
    {
      name: 'myAEON2go',
      href: getCategoryLink('myaeon-importer-v1-root-2'),
      children: [
        {
          name: 'myAEON2go',
          href: getCategoryLink('myaeon-importer-v1-root-2'),
        },
        {
          name: 'Baby & Kids',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-baby-kids'),
        },
        {
          name: 'Beverages',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-beverages'),
        },
        {
          name: 'Snacks',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-snacks'),
        },
        {
          name: 'Grocery',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-grocery'),
        },
        {
          name: 'Personal Care',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-personal-care'),
        },
        {
          name: 'Household',
          href: getCategoryLink('myaeon-importer-v1-root-2/myaeon-importer-v1-household'),
        },
      ],
    },
  ],
};
