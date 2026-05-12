"use client";

import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";

export default function AuthLanding() {
  const { data: session } = authClient.useSession();
  const [ssoError, setSsoError] = useState<string | null>(null);

  const handleSSO = async (provider: string) => {
    setSsoError(null);
    try {
      await authClient.signIn.social({ provider });
    } catch (e) {
      console.error(e);
      setSsoError("SSO failed. Please try again.");
    }
  };

  if (session?.user) {
    return (
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-semibold">Connecté</h2>
        <p className="mt-2 text-neutral-600">Bonjour {session.user?.name || session.user?.email}</p>
        <Button
          variant="neutral"
          kind="outlined"
          className="mt-4 w-full"
          onClick={() => authClient.signOut()}
        >
          Se déconnecter
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Connexion</h1>

      <div className="mt-6">
        <Button
          variant="brand"
          kind="solid"
          className="w-full mb-4"
          onClick={() => handleSSO("github")}
        >
          Continuer avec GitHub
        </Button>

        {ssoError && (
          <p className="mb-4 text-sm text-danger-600">{ssoError}</p>
        )}

        <p className="text-sm text-neutral-600">
          SSO est la méthode recommandée. L'usage mot de passe+email est déconseillé.
        </p>

        <div className="mt-4 flex gap-3 text-sm">
          <a href="/auth/register" className="text-brand-600 hover:text-brand-700 underline">
            S'inscrire (email)
          </a>
          <span className="text-neutral-400">·</span>
          <a href="/auth/login" className="text-brand-600 hover:text-brand-700 underline">
            Se connecter (email)
          </a>
        </div>
      </div>
    </div>
  );
}
