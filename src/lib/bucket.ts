import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

/**
 * Returns the R2 `BUCKET` binding for the current Cloudflare context.
 * - `getBucket()` is synchronous and intended for server components / request handlers.
 * - `getBucketAsync()` is for static/ISR routes where the context must be awaited.
 */
export const bucket = cache(() => {
  const { env } = getCloudflareContext();
  return env.BUCKET;
});

export const bucketAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return env.BUCKET;
});

