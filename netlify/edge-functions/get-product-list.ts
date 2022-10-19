import type { Context } from "https://edge.netlify.com";

interface ShiftProduct {
  id: string,
  type: string,
  attributes:  {
    canonical_path: string
    public_primary_asset_file_url: string
    reference: string
    title: string
  },
  relationships: any
}

export interface Product {
  id: string
  canonical_path: string
  public_primary_asset_file_url: string
  reference: string
  title: string
}

/**
 * Flattens API product attributes
 */
function transformProducts(products: ShiftProduct[]): Product[] {
  return (products  || []).reduce((accumulator: Product[], product: Partial<ShiftProduct>) => {
      accumulator.push({
        id: product?.id || '',
        canonical_path: product?.attributes?.canonical_path || '',
        public_primary_asset_file_url: product?.attributes?.public_primary_asset_file_url || '',
        reference: product?.attributes?.reference || '',
        title: product?.attributes?.title || '',
      })
    return accumulator
  }, [])
}

export default async (_request: Request, context: Context) => {
  try {
    const apiTenant = Deno.env.get("API_TENANT")
    const apiHost = Deno.env.get("API_HOST")
    const apiAccessToken = Deno.env.get("API_ACCESS_TOKEN")

    const response = await fetch(`${apiHost}/${apiTenant}/v2/products?fields[products]=title,reference,canonical_path,public_primary_asset_file_url`, {
      headers: {
        "Authorization" : `Basic ${btoa(`${apiTenant}:${apiAccessToken}`)}`,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'User-Agent': 'SHIFT Commerce Muf astro netlify edge demo',
      }
    })
    const body = await response.json();
    const products: ShiftProduct[] = body?.data;

    return context.json({ data: transformProducts(products) });
  } catch (error) {
    console.error({error})
    return context.json({ error: "An error occurred!" });
  }
};