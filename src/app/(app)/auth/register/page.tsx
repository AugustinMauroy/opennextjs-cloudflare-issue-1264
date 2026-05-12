"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { StatusChip } from "#/components/ui/status-chip";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (error) throw error;
      setMessage({ type: "success", text: "Inscription réussie. Vérifiez votre e-mail si besoin." });
      setEmail("");
      setPassword("");
      setName("");
      
      // Redirect to dashboard using router.replace
      router.replace("/dashboard");
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err?.message || "Erreur lors de l'inscription" });
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">S'inscrire</h1>
      <p className="text-sm text-neutral-600 mt-1">
        Méthode secondaire — nous recommandons SSO.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          label="Nom"
          required
          placeholder="Votre nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          helperText="Minimum 8 caractères"
        />

        <Button
          variant="brand"
          kind="solid"
          className="w-full mt-2"
          disabled={loading}
          type="submit"
        >
          {loading ? "Inscription..." : "S'inscrire"}
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
        Déjà un compte?{" "}
        <a href="/auth/login" className="text-brand-600 hover:text-brand-700 underline">
          Se connecter
        </a>
      </p>
    </div>
  );
}
