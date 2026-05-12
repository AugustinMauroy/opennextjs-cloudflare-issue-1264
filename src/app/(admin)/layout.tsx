import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "#/lib/auth";
import { hasRole } from "#/lib/roles";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }

  if (!hasRole((session.user as { role?: string | string[] }).role, "admin")) {
    redirect("/dashboard");
  }

  return (
    <div>
      <nav>
        <h2>Admin Navigation</h2>
        {/* Placeholder navigation */}
      </nav>
      <main>{children}</main>
    </div>
  );
}
