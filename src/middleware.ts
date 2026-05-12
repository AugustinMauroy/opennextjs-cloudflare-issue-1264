import { NextResponse } from "next/server";
import { hasRole } from "#/lib/roles";
import { auth } from "#/lib/auth";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		const loginUrl = new URL("/auth", request.url);
		loginUrl.searchParams.set("next", pathname);
		return Response.redirect(loginUrl);
	}

	if (pathname.startsWith("/admin") && !hasRole(session.user?.role, "admin")) {
		return Response.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/dashboard/:path*", "/account/:path*"],
};