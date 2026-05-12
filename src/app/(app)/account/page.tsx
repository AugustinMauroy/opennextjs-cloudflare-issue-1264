"use client";

import { useEffect, useState } from "react";
import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Avatar } from "#/components/ui/avatar";
import { SimpleDialog } from "#/components/ui/simple-dialog";

export default function AccountPage() {
  const { data: session, refetch } = authClient.useSession();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [unlinkDialog, setUnlinkDialog] = useState<{ open: boolean; providerId?: string }>({ open: false });
  const [revokeSessionDialog, setRevokeSessionDialog] = useState<{ open: boolean; token?: string }>({ open: false });
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const a = await authClient.listAccounts();
        setAccounts("data" in a && Array.isArray(a.data) ? a.data : []);
      } catch (e) {
        console.error(e);
      }
      try {
        const s = await authClient.listSessions();
        setSessions("data" in s && Array.isArray(s.data) ? s.data : []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleUnlink = async () => {
    const providerId = unlinkDialog.providerId;
    if (!providerId) return;

    if (accounts.length <= 1) {
      console.warn("Cannot unlink last account");
      return;
    }
    setLoading(true);
    try {
      await authClient.unlinkAccount({ providerId });
      const a = await authClient.listAccounts();
      setAccounts("data" in a && Array.isArray(a.data) ? a.data : []);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setUnlinkDialog({ open: false });
    }
  };

  const handleRevoke = async () => {
    const token = revokeSessionDialog.token;
    setLoading(true);
    try {
      if (token) {
        await authClient.revokeSession({ token });
      } else {
        await authClient.revokeOtherSessions();
      }
      const s = await authClient.listSessions();
      setSessions("data" in s && Array.isArray(s.data) ? s.data : []);
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRevokeSessionDialog({ open: false });
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await authClient.deleteUser();
      // after deletion, user will be signed out server-side
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setDeleteAccountDialog(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="p-6 max-w-md">
        <h2 className="text-lg font-semibold">Accès réservé</h2>
        <p className="mt-2 text-neutral-600">Vous devez être connecté pour gérer votre compte.</p>
        <a href="/auth" className="mt-4 inline-block text-brand-600 hover:text-brand-700 underline">
          Aller à la connexion
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Avatar
          name={session.user?.name || session.user?.email || ""}
          size="lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{session.user?.name || "Mon compte"}</h1>
          <p className="text-neutral-600">{session.user?.email}</p>
        </div>
      </div>

      {/* Comptes liés */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Comptes liés</h2>
        {accounts.length > 0 ? (
          <div className="space-y-2">
            {accounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between border border-neutral-200 rounded-lg p-4 dark:border-neutral-800">
                <div>
                  <div className="font-medium capitalize">{a.providerId}</div>
                  <div className="text-sm text-neutral-600">{a.accountId}</div>
                </div>
                <Button
                  variant="danger"
                  kind="outlined"
                  size="sm"
                  disabled={accounts.length <= 1 || loading}
                  onClick={() => setUnlinkDialog({ open: true, providerId: a.providerId })}
                >
                  Délier
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-600">Aucun compte lié</p>
        )}
        <Button
          variant="brand"
          kind="outlined"
          size="sm"
          className="mt-4"
          onClick={() => authClient.linkSocial({ provider: "github" })}
        >
          Lier GitHub
        </Button>
      </section>

      {/* Sessions */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Sessions actives</h2>
        {sessions.length > 0 ? (
          <div className="space-y-2">
            {sessions.map((s) => (
              <div key={s.token} className="flex items-center justify-between border border-neutral-200 rounded-lg p-4 dark:border-neutral-800">
                <div>
                  <div className="text-sm">{s.userAgent || "Unknown device"}</div>
                  <div className="text-xs text-neutral-600">
                    {new Date(s.createdAt).toLocaleString("fr-FR")}
                  </div>
                </div>
                <Button
                  variant="danger"
                  kind="outlined"
                  size="sm"
                  disabled={loading}
                  onClick={() => setRevokeSessionDialog({ open: true, token: s.token })}
                >
                  Révoquer
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-600">Aucune session active</p>
        )}

        <div className="flex gap-3 mt-4">
          <Button
            variant="neutral"
            kind="outlined"
            size="sm"
            disabled={loading}
            onClick={() => setRevokeSessionDialog({ open: true, token: undefined })}
          >
            Révoquer autres sessions
          </Button>
          <Button
            variant="danger"
            kind="outlined"
            size="sm"
            disabled={loading}
            onClick={() => authClient.revokeSessions()}
          >
            Révoquer toutes les sessions
          </Button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <h2 className="text-lg font-semibold mb-4 text-danger-600">Zone de danger</h2>
        <p className="text-sm text-neutral-600 mb-4">
          Supprimer votre compte est une action irréversible. Toutes vos données seront perdues.
        </p>
        <Button
          variant="danger"
          kind="solid"
          disabled={loading}
          onClick={() => setDeleteAccountDialog(true)}
        >
          Supprimer mon compte
        </Button>
      </section>

      {/* Dialogs de confirmation */}
      <SimpleDialog
        open={unlinkDialog.open}
        onOpenChange={(open) => setUnlinkDialog({ ...unlinkDialog, open })}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirmer la déliaison</h3>
          <p className="text-neutral-600">
            Êtes-vous sûr de vouloir délier ce compte {unlinkDialog.providerId}? 
            Vous pourrez toujours le relier ultérieurement.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="neutral"
              kind="outlined"
              onClick={() => setUnlinkDialog({ open: false })}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              kind="solid"
              disabled={loading}
              onClick={handleUnlink}
            >
              Délier
            </Button>
          </div>
        </div>
      </SimpleDialog>

      <SimpleDialog
        open={revokeSessionDialog.open}
        onOpenChange={(open) => setRevokeSessionDialog({ ...revokeSessionDialog, open })}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Révoquer une session</h3>
          <p className="text-neutral-600">
            {revokeSessionDialog.token 
              ? "Êtes-vous sûr de vouloir révoquer cette session? Vous devrez vous reconnecter sur cet appareil."
              : "Êtes-vous sûr de vouloir révoquer toutes les autres sessions? Seule votre session actuelle restera active."}
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="neutral"
              kind="outlined"
              onClick={() => setRevokeSessionDialog({ open: false })}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              kind="solid"
              disabled={loading}
              onClick={handleRevoke}
            >
              Révoquer
            </Button>
          </div>
        </div>
      </SimpleDialog>

      <SimpleDialog
        open={deleteAccountDialog}
        onOpenChange={setDeleteAccountDialog}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-danger-600">Supprimer votre compte</h3>
          <p className="text-neutral-600">
            Cette action est irréversible. Tapez votre email pour confirmer la suppression.
          </p>
          <p className="font-mono text-sm bg-neutral-100 p-2 rounded dark:bg-neutral-800">
            {session.user?.email}
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="neutral"
              kind="outlined"
              onClick={() => setDeleteAccountDialog(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              kind="solid"
              disabled={loading}
              onClick={handleDeleteAccount}
            >
              Supprimer définitivement
            </Button>
          </div>
        </div>
      </SimpleDialog>
    </div>
  );
}
