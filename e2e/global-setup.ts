import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

export default async function globalSetup() {
    await initOpenNextCloudflareForDev();
    console.log("Expected to be called only once");
}
