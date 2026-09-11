// Current Commerce category tree. Paths are Catalog Service categoryPath values.
export const categories = [
  {
    id: 3,
    name: 'Aeon Fresh',
    path: 'aeon-fresh',
    parentId: 2,
  },
  {
    id: 4,
    name: 'Ready To Eat',
    path: 'aeon-fresh/ready-to-eat',
    parentId: 3,
  },
  {
    id: 5,
    name: 'Household',
    path: 'aeon-fresh/household',
    parentId: 3,
  },
  {
    id: 6,
    name: 'Grocery',
    path: 'aeon-fresh/grocery',
    parentId: 3,
  },
  {
    id: 7,
    name: 'myAEON2go',
    path: 'myaeon-importer-v1-root-2',
    parentId: 2,
  },
  {
    id: 8,
    name: 'Baby & Kids',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-baby-kids',
    parentId: 7,
  },
  {
    id: 9,
    name: 'Beverages',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-beverages',
    parentId: 7,
  },
  {
    id: 10,
    name: 'Snacks',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-snacks',
    parentId: 7,
  },
  {
    id: 11,
    name: 'Grocery',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-grocery',
    parentId: 7,
  },
  {
    id: 12,
    name: 'Personal Care',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-personal-care',
    parentId: 7,
  },
  {
    id: 13,
    name: 'Household',
    path: 'myaeon-importer-v1-root-2/myaeon-importer-v1-household',
    parentId: 7,
  },
];

export function getCategoryLink(path = 'all') {
  return `/search?category=${encodeURIComponent(path)}`;
}

export function getCatalogProductLink(sku) {
  return `/products/default?sku=${encodeURIComponent(sku)}`;
}
