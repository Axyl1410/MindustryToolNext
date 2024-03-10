'use client';

import {
  ArrowUpTrayIcon,
  Bars3Icon,
  BellIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  HomeIcon,
  MapIcon,
  ServerStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { HTMLAttributes, ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoginButton from '@/components/button/login-button';
import LogoutButton from '@/components/button/logout-button';
import OutsideWrapper from '@/components/common/outside-wrapper';
import ProtectedElement from '@/layout/protected-element';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeSwitcher } from '../../components/theme/theme-switcher';
import UserAvatar from '@/components/user/user-avatar';
import { UserRole } from '@/constant/enum';
import UserRoleCard from '@/components/user/user-role';
import { cn } from '@/lib/utils';
import env from '@/constant/env';
import { useI18n } from '@/locales/client';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NavigationBar() {
  const t = useI18n();

  const paths: Path[] = [
    {
      path: '/', //
      name: t('home'),
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      path: '/schematics', //
      name: t('schematic'),
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
    },
    {
      path: '/maps',
      name: t('map'),
      icon: <MapIcon className="h-6 w-6" />,
    },
    {
      path: '/posts', //
      name: t('post'),
      icon: <BookOpenIcon className="h-6 w-6" />,
    },
    {
      path: '/servers', //
      name: t('server'),
      icon: <ServerStackIcon className="h-6 w-6" />,
    },
    {
      path: '/logic', //
      name: t('logic'),
      icon: <CommandLineIcon className="h-6 w-6" />,
    },
    {
      path: '/upload', //
      name: t('upload'),
      icon: <ArrowUpTrayIcon className="h-6 w-6" />,
    },
    {
      path: '/admin', //
      name: t('admin'),
      roles: ['ADMIN'],
      icon: <UserCircleIcon className="h-6 w-6" />,
    },
  ];

  const pathName = usePathname();
  const route = pathName.split('/').filter((item) => item)[1];

  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const showSidebar = () => setSidebarVisibility(true);

  const hideSidebar = () => setSidebarVisibility(false);

  return (
    <div className="flex h-nav w-full items-center justify-between bg-button p-1 text-white shadow-lg">
      <Button
        title=""
        type="button"
        variant="link"
        size="icon"
        onFocus={showSidebar}
        onClick={showSidebar}
        onMouseEnter={showSidebar}
      >
        <Bars3Icon className="h-8 w-8 text-white" />
      </Button>
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-50 h-screen bg-transparent text-foreground',
          {
            'visible backdrop-blur-sm': isSidebarVisible,
          },
        )}
      >
        <OutsideWrapper
          className={cn(
            'pointer-events-auto fixed bottom-0 top-0 flex min-w-[250px] translate-x-[-100%] flex-col justify-between bg-background transition-transform duration-300',
            {
              'translate-x-0': isSidebarVisible,
            },
          )}
          onClickOutside={hideSidebar}
        >
          <div
            className="flex h-full flex-col overflow-y-auto"
            onMouseLeave={hideSidebar} //
            onMouseEnter={showSidebar}
          >
            <div className="flex h-full flex-col justify-between p-2">
              <div className="flex flex-col gap-4">
                <span className="flex flex-col gap-2">
                  <span className="flex items-center justify-start gap-2 rounded-sm bg-card p-2">
                    <span className="text-xl font-medium">MindustryTool</span>
                  </span>
                  <span className="rounded-sm bg-card p-2 text-xs">
                    {env.webVersion}
                  </span>
                </span>
                <section className="grid gap-2 text-sm">
                  {paths.map((item, index) => (
                    <NavItem
                      enabled={
                        item.path.slice(1) === route ||
                        (item.path === '/' && route === undefined)
                      }
                      key={index}
                      onClick={hideSidebar}
                      {...item}
                    />
                  ))}
                </section>
              </div>
              <div className="w-full">
                <UserDisplay />
              </div>
            </div>
          </div>
        </OutsideWrapper>
      </div>
      <div className="px- flex items-center justify-center">
        <Button className="aspect-square p-0" title="setting" variant="icon">
          <BellIcon className="h-6 w-6" />
        </Button>
        <ThemeSwitcher className="flex aspect-square h-full" />
        <Button className="aspect-square p-0" title="setting" variant="icon">
          <Cog6ToothIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

function UserDisplay() {
  const { data, status } = useSession();

  const t = useI18n();

  const session = data;

  if (status === 'authenticated' && session?.user) {
    return (
      <div className="flex h-16 flex-1 items-center justify-between rounded-sm bg-card p-1">
        <div className="flex items-center justify-center gap-1">
          <UserAvatar className="h-12 w-12" user={session.user} />
          <div className="grid p-1">
            <span className="capitalize">{session.user.name}</span>
            <UserRoleCard roles={session.user.roles} />
          </div>
        </div>
        <LogoutButton
          className="aspect-square h-10 w-10 p-2"
          title={t('logout')}
          variant="ghost"
        />
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <Skeleton className="flex h-16 flex-1 items-center justify-between rounded-sm bg-card p-1" />
    );
  }

  return <LoginButton className="w-full gap-1" title={t('login')} />;
}

type Path = {
  path: string;
  name: string;
  icon: ReactNode;
  enabled?: boolean;
  roles?: UserRole[];
};

type NavItemProps = Path &
  HTMLAttributes<HTMLAnchorElement> & {
    onClick: () => void;
  };

function NavItem({
  className,
  icon,
  path,
  name,
  enabled,
  roles,
  onClick,
}: NavItemProps) {
  const { data: session } = useSession();

  const render = () => (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-md px-1 py-2 font-medium opacity-80 transition-colors duration-300 hover:bg-button hover:text-background hover:opacity-100 dark:hover:text-foreground',
        className,
        {
          'bg-button text-background opacity-100 dark:text-foreground': enabled,
        },
      )}
      href={path}
      onClick={onClick}
    >
      <span className="opacity-100">{icon}</span>
      <span>{name}</span>
    </Link>
  );

  if (roles) {
    return (
      <ProtectedElement all={roles} session={session}>
        {render()}
      </ProtectedElement>
    );
  }

  return render();
}