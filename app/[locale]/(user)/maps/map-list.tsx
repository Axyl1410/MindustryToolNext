'use client';

import { omit } from 'lodash';
import { PlusIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import GridPaginationList from '@/components/common/grid-pagination-list';
import {
  GridLayout,
  ListLayout,
  PaginationLayoutSwitcher,
} from '@/components/common/pagination-layout';
import PaginationNavigator from '@/components/common/pagination-navigator';
import ResponsiveInfiniteScrollGrid from '@/components/common/responsive-infinite-scroll-grid';
import MapPreviewCard from '@/components/map/map-preview-card';
import NameTagSearch from '@/components/search/name-tag-search';
import PreviewSkeleton from '@/components/skeleton/preview-skeleton';
import env from '@/constant/env';
import useClientQuery from '@/hooks/use-client-query';
import useSearchQuery from '@/hooks/use-search-query';
import { useSearchTags } from '@/hooks/use-tags';
import { getMapCount } from '@/query/map';
import getMaps from '@/query/map/get-maps';
import { ItemPaginationQuery } from '@/query/query';

export default function MapList() {
  const { map } = useSearchTags();
  const params = useSearchQuery(ItemPaginationQuery);

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const { data } = useClientQuery({
    queryKey: ['maps', 'count', omit(params, 'page', 'size', 'sort')],
    queryFn: (axios) => getMapCount(axios, params),
  });

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden p-4">
      <NameTagSearch tags={map} />
      <div className="flex justify-between">
        <span>Found {data} maps</span>
        <PaginationLayoutSwitcher />
      </div>
      <ListLayout>
        <div
          className="relative flex h-full flex-col overflow-auto"
          ref={(ref) => setContainer(ref)}
        >
          <ResponsiveInfiniteScrollGrid
            params={params}
            queryKey={['map']}
            getFunc={getMaps}
            container={() => container}
            skeleton={{
              amount: 20,
              item: <PreviewSkeleton />,
            }}
            itemMinWidth={320}
            itemMinHeight={352}
            contentOffsetHeight={112}
            gap={8}
          >
            {(data) => <MapPreviewCard key={data.id} map={data} />}
          </ResponsiveInfiniteScrollGrid>
        </div>
      </ListLayout>
      <GridLayout>
        <GridPaginationList
          params={params}
          queryKey={['map']}
          getFunc={getMaps}
          skeleton={{
            amount: 20,
            item: <PreviewSkeleton />,
          }}
        >
          {(data) => <MapPreviewCard key={data.id} map={data} />}
        </GridPaginationList>
      </GridLayout>
      <div className="sm:justify-between justify-end sm:flex-row-reverse items-center flex flex-wrap gap-4">
        <GridLayout>
          <PaginationNavigator numberOfItems={data ?? 0} />
        </GridLayout>
        <div className="flex gap-1">
          <Link
            className="items-center flex gap-2 py-1 pl-1 pr-3 border border-border rounded-md"
            href={`${env.url.base}/users/me`}
            title="My map"
          >
            <UserIcon className="size-5" />
            My map
          </Link>
          <Link
            className="items-center flex gap-2 py-1 pl-1 pr-3 border border-border rounded-md"
            href={`${env.url.base}/upload/map`}
            title="My map"
          >
            <PlusIcon className="size-5" />
            Add map
          </Link>
        </div>
      </div>
    </div>
  );
}