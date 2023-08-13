export { Page }

function Page(pageProps) {
  if (pageProps.is404) {
    return "not found"
  } else {
    // Return a UI component "Our server is having problems. Sincere apologies. Try again later."
    return "error loading page"
  }
}