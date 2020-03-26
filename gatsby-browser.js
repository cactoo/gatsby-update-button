export const onServiceWorkerUpdateReady = () => {
  // Set window.___swUpdated to prevent update on page navigation.
  // Overrides https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby/cache-dir/navigation.js#L64
  window.___swUpdated = false
}
