import Link from 'next/link';
import React from 'react';

import CopyButton from '@/components/button/copy-button';
import DownloadButton from '@/components/button/download-button';
import {
  Preview,
  PreviewActions,
  PreviewDescription,
  PreviewHeader,
  PreviewImage,
} from '@/components/common/preview';
import env from '@/constant/env';
import useClientAPI from '@/hooks/use-client';
import useToastAction from '@/hooks/use-toast-action';
import { useI18n } from '@/locales/client';
import { Schematic } from '@/types/response/Schematic';
import { LinkIcon } from '@/components/common/icons';
import { getSchematicData } from '@/query/schematic';

type UploadSchematicPreviewCardProps = {
  schematic: Schematic;
};

export default function UploadSchematicPreviewCard({
  schematic: { id, name },
}: UploadSchematicPreviewCardProps) {
  const axios = useClientAPI();
  const t = useI18n();

  const link = `${env.url.base}/admin/schematics/${id}`;
  const detailLink = `/admin/schematics/${id}`;
  const imageLink = `${env.url.image}/schematic-previews/${id}.png`;
  const errorImageLink = `${env.url.api}/schematics/${id}/image`;
  const copyContent = `Copied schematic ${name}`;
  const downloadLink = `${env.url.api}/schematics/${id}/download`;
  const downloadName = `{${name}}.msch`;

  const getData = useToastAction({
    title: t('copying'),
    content: t('downloading-data'),
    action: async () => await getSchematicData(axios, id),
  });

  return (
    <Preview>
      <CopyButton
        position="absolute"
        variant="ghost"
        data={link}
        content={link}
      >
        <LinkIcon />
      </CopyButton>
      <Link href={detailLink}>
        <PreviewImage src={imageLink} errorSrc={errorImageLink} alt={name} />
      </Link>
      <PreviewDescription>
        <PreviewHeader>{name}</PreviewHeader>
        <PreviewActions>
          <CopyButton content={copyContent} data={getData} />
          <DownloadButton href={downloadLink} fileName={downloadName} />
        </PreviewActions>
      </PreviewDescription>
    </Preview>
  );
}
