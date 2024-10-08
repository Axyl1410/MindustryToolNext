import { ReactNode } from 'react';

import ProtectedRoute from '@/layout/protected-route';
import { getSession } from '@/query/auth';

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await getSession();

  return <ProtectedRoute session={session}>{children}</ProtectedRoute>;
}
