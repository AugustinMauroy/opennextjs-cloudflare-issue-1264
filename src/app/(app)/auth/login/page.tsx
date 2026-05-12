"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { StatusChip } from "#/components/ui/status-chip";

function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) throw error;
      
      // Get redirect URL from query params or use dashboard as default
      const nextUrl = searchParams.get("next") || "/dashboard";
      setMessage({ type: "success", text: "Connexion réussie." });
      setEmail("");
      setPassword("");
      
      // Use router.replace for guaranteed redirect
      router.replace(nextUrl);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err?.message || "Erreur lors de la connexion" });
      setLoading(false);
    }
  };

  return (
      <div className="p-6 max-w-md">
        <h1 className="text-2xl font-bold">Se connecter</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Si possible utilisez SSO (recommandé).
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            required
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="brand"
            kind="solid"
            className="w-full mt-2"
            disabled={loading}
            type="submit"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        {message && (
          <div className="mt-4">
            <StatusChip
              status={message.type === "success" ? "success" : "danger"}
              label={message.text}
            />
          </div>
        )}

        <p className="text-sm text-neutral-600 text-center mt-6">
          Pas encore de compte?{" "}
          <a href="/auth/register" className="text-brand-600 hover:text-brand-700 underline">
            S'inscrire
          </a>
        </p>
      </div>
  );
}

export default function LoginPage() {
  // idk what next do here ...
  return (
    <Suspense fallback={<div className="p-6">Chargement...</div>}>
      <LoginPageClient />
    </Suspense>
  );
}
