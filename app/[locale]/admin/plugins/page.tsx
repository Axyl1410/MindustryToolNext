'use client';

import React, { useState } from 'react';

import ResponsiveInfiniteScrollGrid from '@/components/common/responsive-infinite-scroll-grid';
import UploadPluginCard from '@/components/plugin/upload-plugin-preview-card';
import NameTagSearch from '@/components/search/name-tag-search';
import useSearchPageParams from '@/hooks/use-search-page-params';
import { useSearchTags } from '@/hooks/use-tags';
import { getPluginUploads } from '@/query/plugin';

export default function Page() {
  const { plugin } = useSearchTags();
  const params = useSearchPageParams();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div className="relative flex h-full flex-col gap-4 p-4">
      <NameTagSearch tags={plugin} />
      <div
        className="relative flex h-full flex-col gap-4 overflow-y-auto"
        ref={(ref) => setContainer(ref)}
      >
        <ResponsiveInfiniteScrollGrid
          queryKey={['plugins', 'upload']}
          getFunc={getPluginUploads}
          params={params}
          container={() => container}
          itemMinWidth={320}
          itemMinHeight={352}
          contentOffsetHeight={112}
          gap={8}
        >
          {(data) => <UploadPluginCard key={data.id} plugin={data} />}
        </ResponsiveInfiniteScrollGrid>
      </div>
    </div>
  );
}
