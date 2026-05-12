import Link from "next/link";
import { HomeIcon } from '@heroicons/react/24/outline';
import { Button } from "#/components/ui/button";
import type { FC } from "react";

const NotFoundPage: FC = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-4">
        <h1 className="text-5xl font-bold text-brand-600 mb-2">404</h1>
      </div>
      <h2 className="text-2xl font-bold mb-2">Page non trouvée</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-lg">
        Nous n'avons pas trouvé la page que vous recherchez.
      </p>
      <Button
        variant="brand"
        kind="solid"
        asChild
      >
        <Link href="/">
          <HomeIcon className="size-5 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;