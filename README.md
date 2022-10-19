Test Astro app that uses Netlify Edge functions to query the SHIFT Platform API for product data.

## Environment Variables Required

Add SHIFT Platform API `API_ACCESS_TOKEN`, `API_HOST` and `API_TENANT` env vars to get going...

## Edge Functions

| Path | Edge Function |
|--- |---|
| /hello |/netlify/edge-functions/hello |
| /hello.json | /netlify/edge-functions/hello-json |
| /products | /netlify/edge-functions/get-product-list |
