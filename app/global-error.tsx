'use client';

import { Button } from '@/components/ui/button';
import useClientApi from '@/hooks/use-client';
import { getErrorMessage, TError } from '@/lib/utils';
import { reportError } from '@/query/api';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: TError }) {
  const message = getErrorMessage(error);

  const path = usePathname();
  const axios = useClientApi();

  useEffect(() => {
    reportError(axios, { error, path });
  }, [axios, path, error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-base font-bold">{message}</h2>
      <div className="grid grid-cols-2 items-center justify-center gap-2">
        <a className="h-9 flex-1 text-nowrap rounded-md border border-border px-2 py-1.5" href="https://discord.gg/DCX5yrRUyp" target="_blank" rel="noopener noreferrer">
          Report Error At
        </a>
        <Button className="flex-1" variant="primary" title="Refresh" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
