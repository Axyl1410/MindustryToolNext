'use client';

import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import { useI18n } from '@/locales/client';

const linkVariants = cva('flex gap-2', {
  variants: {
    variant: {
      default: '',
      primary: 'text-brand hover:text-brand',
      'button-primary':
        'rounded-md border bg-brand p-2 text-sm text-background dark:text-foreground',
      'button-secondary':
        'items-center flex gap-2 rounded-md bg-secondary px-2 py-1.5',
      command:
        'hover:bg-accent justify-start gap-1 flex items-center p-2 w-full rounded-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type InternalLinkVariants = VariantProps<typeof linkVariants>;

export type InternalLinkProps = React.ButtonHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
  } & {
    href: string;
  };

export default function InternalLink({
  className,
  variant,
  title,
  ...props
}: InternalLinkProps) {
  const t = useI18n();

  return (
    <Link
      className={cn(linkVariants({ variant, className }))}
      {...props}
      title={title ? t(title) : ''}
    ></Link>
  );
}
