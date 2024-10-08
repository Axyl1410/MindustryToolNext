'use client';

import { useCallback, useState } from 'react';
import React from 'react';

import { NavItems } from '@/app/[locale]/navigation-items';
import { UserDisplay } from '@/app/[locale]/user-display';
import { Button } from '@/components/ui/button';
import env from '@/constant/env';
import { cn } from '@/lib/utils';

import { MenuIcon, NotificationIcon } from '@/components/common/icons';
import OutsideWrapper from '@/components/common/outside-wrapper';

export default function NavigationBar() {
  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const showSidebar = useCallback(
    () => setSidebarVisibility(true),
    [setSidebarVisibility],
  );
  const hideSidebar = useCallback(
    () => setSidebarVisibility(false),
    [setSidebarVisibility],
  );

  return (
    <div className="flex h-nav w-full items-center justify-between bg-brand px-2 py-1 text-white shadow-lg">
      <Button
        title="Navbar"
        type="button"
        variant="link"
        size="icon"
        onFocus={showSidebar}
        onClick={showSidebar}
        onMouseEnter={showSidebar}
      >
        <MenuIcon />
      </Button>
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-50 h-screen bg-transparent text-foreground',
          {
            'visible backdrop-blur-sm backdrop-brightness-50': isSidebarVisible,
          },
        )}
      >
        <div
          className={cn(
            'pointer-events-auto fixed bottom-0 top-0 min-w-[250px] translate-x-[-100%] justify-between overflow-hidden bg-background duration-300',
            {
              'translate-x-0': isSidebarVisible,
            },
          )}
        >
          <div
            className="h-full w-full overflow-hidden"
            onMouseLeave={hideSidebar} //
            onMouseEnter={showSidebar}
          >
            <OutsideWrapper
              className="h-full w-full overflow-hidden"
              onClickOutside={hideSidebar}
            >
              <div className="flex h-full flex-col justify-between overflow-hidden p-2">
                <div className="flex h-full flex-col overflow-hidden">
                  <span className="flex flex-col gap-2">
                    <span className="space-x-2 rounded-sm p-2">
                      <span className="text-xl font-medium">MindustryTool</span>
                      <span className="text-xs">{env.webVersion}</span>
                    </span>
                  </span>
                  <NavItems onClick={hideSidebar} />
                </div>
                <UserDisplay />
              </div>
            </OutsideWrapper>
          </div>
        </div>
      </div>
      <NotificationIcon />
    </div>
  );
}
