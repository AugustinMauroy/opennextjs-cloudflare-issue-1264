'use client';
import { useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Button } from "#/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset?: () => void }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-white dark:bg-neutral-950">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-2">
              <h1 className="text-3xl font-bold">Erreur système</h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
              Une erreur système s'est produite. Réessayez ou contactez le support.
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg mb-6 text-left overflow-auto">
              <p className="font-mono text-sm text-danger-600">{error?.message}</p>
            </div>
            <div className="flex justify-center gap-3">
              <Button
                variant="brand"
                kind="solid"
                onClick={() => (reset ? reset() : window.location.reload())}
              >
                Réessayer
              </Button>
              <Button
                variant="neutral"
                kind="outlined"
                onClick={() => (window.location.href = '/')}
              >
                <HomeIcon className="size-5 mr-2" />
                Accueil
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
