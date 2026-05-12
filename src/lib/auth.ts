import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin, testUtils } from "better-auth/plugins";
import { prisma } from "#/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: "sqlite" }),
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/",
	emailAndPassword: { enabled: true },
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	plugins: [
		adminPlugin(),
		testUtils(),
	],
});
