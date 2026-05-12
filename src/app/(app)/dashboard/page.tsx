"use client";
import { authClient } from "#/lib/auth-client";

export default function AppDashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Placeholder: Authenticated user dashboard</p>
      <pre className="bg-gray-100 p-4 rounded mt-4">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
