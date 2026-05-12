import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";
import { PrismaClient } from "#/generated/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const getPrisma = cache(async () => {
	const { env } = await getCloudflareContext({ async: true });
	const adapter = new PrismaD1(env.DB);

	return new PrismaClient({
		adapter,
		log:
			process.env.NEXTJS_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});
});

const getPrismaSync = cache(() => {
	const { env } = getCloudflareContext({ async: false });
	const adapter = new PrismaD1(env.DB);
	return new PrismaClient({
		adapter,
		log:
			process.env.NEXTJS_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});
});

export const prisma = await getPrisma();
export const prismaSync = getPrismaSync();