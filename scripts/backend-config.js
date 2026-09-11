/**
 * Bridge authored and cached configuration during the Ubuntu backend migration.
 * Remove this bridge once DA configuration and existing browser caches are updated.
 * Catalog Service endpoints and credentials remain managed by authored config.
 */
export default function migrateCommerceBackend(config) {
  Object.values(config.public || {}).forEach((store) => {
    const endpoint = store['commerce-core-endpoint'];
    if (endpoint !== 'https://sandbox1.cqsvr.com/graphql'
      && endpoint !== 'https://sandbox1.quetta-app.com/graphql') return;

    store['commerce-core-endpoint'] = 'https://sandbox1.quetta-app.com/graphql';
    if (store.analytics) {
      store.analytics['store-url'] = 'https://sandbox1.quetta-app.com/';
      store.analytics['base-currency-code'] = 'MYR';
    }
  });
  return config;
}
