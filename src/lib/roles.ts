export function normalizeRoles(role: unknown): string[] {
	if (Array.isArray(role)) {
		return role.filter((r): r is string => typeof r === "string");
	}
	if (typeof role === "string") {
		return [role];
	}
	return [];
}

export function hasRole(role: unknown, expected: string): boolean {
	return normalizeRoles(role).includes(expected);
}
