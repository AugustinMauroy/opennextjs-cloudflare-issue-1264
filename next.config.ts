import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
import type { NextConfig } from "next";

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
initOpenNextCloudflareForDev();

export default {
	serverExternalPackages: ["@prisma/client", "./src/generated"],
	typescript: {
		ignoreBuildErrors: true,
	},
} as NextConfig;

