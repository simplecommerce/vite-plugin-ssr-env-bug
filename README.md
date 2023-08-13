# vite-plugin-ssr-env-bug
Conditionals using import.meta.env.SSR or any other variable fails

To reproduce the issue:

1. Clone the repo.
2. Run `npm i `.
3. Run `npm dev`.
4. Open your browser and navigate to your instance.
5. You should see a log in the console with the ENV variables.
6. Go to `/imports/server.ts` and uncomment the lines with the conditional.
7. Hit refresh and you will see the error in the console.
