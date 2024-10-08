'use client';

import React from 'react';

import { useI18n } from '@/locales/client';
import { cn } from '@/lib/utils';

function _TagName({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  const t = useI18n();

  return (
    <span className={cn('text-sm capitalize', className)}>
      {t(`tags.${children}`)}
    </span>
  );
}

export const TagName = React.memo(_TagName)
