'use client';

import React, { ReactNode } from 'react';

import Tran from '@/components/common/tran';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('hover:bg-destructive/80', {
  variants: {
    variant: {
      default: 'border border-border',
      command: '',
      ghost: 'border-none top-1 left-1 absolute',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type DeleteButtonProps = {
  isLoading: boolean;
  description: ReactNode;
  onClick: () => void;
} & VariantProps<typeof buttonVariants>;
export default function DeleteButton({
  isLoading,
  variant,
  description,
  onClick,
}: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant }))}
          variant={variant}
          size="command"
          disabled={isLoading}
        >
          <XMarkIcon className="size-5" />
          {variant === 'command' && <Tran text="delete" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Tran text="are-you-sure" />
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Tran text="cancel" />
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            asChild
          >
            <Button onClick={onClick}>
              <Tran text="delete" />
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
