'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { revalidate } from '@/action/action';
import ColorText from '@/components/common/color-text';
import ComboBox from '@/components/common/combo-box';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useClientAPI from '@/hooks/use-client';
import useQueriesData from '@/hooks/use-queries-data';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';
import { InternalServerModes } from '@/types/request/UpdateInternalServerRequest';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  CreateInternalServerRequest,
  CreateInternalServerSchema,
} from '@/types/request/CreateInternalServerRequest';
import { createInternalServer } from '@/query/server';

export default function CreateServerDialog() {
  const t = useI18n();
  const form = useForm<CreateInternalServerRequest>({
    resolver: zodResolver(CreateInternalServerSchema),
    defaultValues: {
      name: '',
      description: '',
      mode: 'SURVIVAL',
      port: 6567,
    },
  });

  const [open, setOpen] = useState(false);

  const { invalidateByKey } = useQueriesData();
  const axios = useClientAPI();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ['servers'],
    mutationFn: (data: CreateInternalServerRequest) =>
      createInternalServer(axios, data),
    onSuccess: () => {
      invalidateByKey(['servers']);
      toast({
        title: t('upload.success'),
        variant: 'success',
      });
      form.reset();
      revalidate('/servers');
      setOpen(false);
    },
    onError: (error) =>
      toast({
        title: t('upload.fail'),
        description: error.message,
        variant: 'destructive',
      }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" title={t('server.add')}>
          {t('server.add')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-1 flex-col justify-between space-y-4 rounded-md bg-card p-4"
            onSubmit={form.handleSubmit((value) => mutate(value))}
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server name</FormLabel>
                    <FormControl>
                      <Input placeholder="Test" {...field} />
                    </FormControl>
                    <FormDescription>
                      {field.value ? (
                        <ColorText text={field.value} />
                      ) : (
                        'The server name that displayed in game'
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Some cool stuff" {...field} />
                    </FormControl>
                    <FormDescription>
                      {field.value ? (
                        <ColorText text={field.value} />
                      ) : (
                        'The server description that displayed in game'
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6567"
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      The port that server hosting on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Mode</FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder={InternalServerModes[0]}
                        value={{ label: field.value, value: field.value }}
                        values={InternalServerModes.map((value) => ({
                          label: value,
                          value,
                        }))}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormDescription>Server game mode</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-1">
              <Button
                variant="secondary"
                title={t('reset')}
                onClick={() => form.reset()}
              >
                {t('reset')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                title={t('upload')}
                disabled={isPending}
              >
                {t('upload')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
