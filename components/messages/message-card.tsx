import moment from 'moment';

import ColorText from '@/components/common/color-text';
import { Skeleton } from '@/components/ui/skeleton';
import ColorAsRole from '@/components/user/color-as-role';
import UserAvatar from '@/components/user/user-avatar';
import useClientAPI from '@/hooks/use-client';
import { cn } from '@/lib/utils';
import { MessageGroup } from '@/types/response/Message';

import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/query/user';

type Props = {
  className?: string;
  message: MessageGroup;
};

export function MessageCard({ className, message }: Props) {
  const { userId, contents, createdAt } = message;
  const axios = useClientAPI();

  const { data } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(axios, { id: userId }),
  });

  return (
    <div
      className={cn('flex w-full gap-2 text-wrap rounded-lg p-2', className)}
    >
      {data ? (
        <UserAvatar user={data} />
      ) : (
        <Skeleton className="h-8 w-8 rounded-full border border-border" />
      )}
      <div className="overflow-hidden">
        <div className="space-x-2">
          {data ? (
            <ColorAsRole
              className="font-semibold capitalize"
              roles={data.roles}
            >
              {data.name}
            </ColorAsRole>
          ) : (
            <Skeleton className="h-6 w-24" />
          )}
          <span>{moment(createdAt).fromNow()}</span>
        </div>
        <div className="no-scrollbar grid w-full gap-1 overflow-x-auto">
          {contents.map(({ text }, index) => (
            <ColorText key={index} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}
