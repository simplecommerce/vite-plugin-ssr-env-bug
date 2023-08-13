import React from "react";

import "../imports/client";
import { PageContextProvider } from "./usePageContext";

export { render };

/**
 *
 * @param pageContext
 */
async function render (pageContext) {
	const { Page, pageProps } = pageContext;

	console.log("default client render called", Page);

	const ProvidedApp = (
		<PageContextProvider pageContext={pageContext}>
			<Page {...pageProps} />
		</PageContextProvider>
	);

	hydrateRoot(document.getElementById("app"), ProvidedApp);

}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
