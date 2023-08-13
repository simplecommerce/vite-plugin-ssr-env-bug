import React from "react";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";

import "../imports/server";
import { PageContextProvider } from "./usePageContext";

export const passToClient = ["pageProps", "urlPathname"];

export { render };

/**
 *
 * @param pageContext
 */
async function render (pageContext) {
	const { Page, pageProps, urlPathname, headers } = pageContext;

	// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
	if (!Page) throw new Error("My render() hook expects pageContext.Page to be defined");

	const app = (
		<PageContextProvider pageContext={pageContext}>
			<Page {...pageProps} />
		</PageContextProvider>
	);

	const stream = await renderToStringWithData(app);

  	// Append the preloaded state to head to send to client
	const documentHtml = dangerouslySkipEscape(`<!DOCTYPE html>
      <html lang="en">
	  <head>
		
	  </head>
      <body>        
        <div id="app">${stream}</div>
      </body>
    </html>`);

	return {
		documentHtml,
		pageContext: {
			// We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
			redirectTo: pageContext.url,
		},
	};
}
