'use client';

import moment from 'moment';

import Tran from '@/components/common/tran';
import { Log } from '@/types/response/Log';
import MetricWrapper from '@/components/metric/metric-wrapper';

type Props = {
  data: Log[];
};

export default function LoginLog({ data }: Props) {
  return (
    <MetricWrapper>
      <div className="flex h-[500px] w-full flex-col gap-2 bg-card p-2">
        <span className="font-bold">
          <Tran text="metric.user-login-history" />
        </span>
        <div className="h-[400px]">
          <section className="no-scrollbar grid h-[450px] gap-2 overflow-y-auto">
            {data.map((log) => (
              <LoginLogCard key={log.id} log={log} />
            ))}
          </section>
        </div>
      </div>
    </MetricWrapper>
  );
}

type LoginLogCardProps = {
  log: Log;
};

function LoginLogCard({
  log: { id, content, ip, createdAt },
}: LoginLogCardProps) {
  const from = moment(new Date(createdAt).toISOString()).fromNow();

  return (
    <span
      className="flex justify-between gap-8 rounded-sm bg-background p-4"
      key={id}
    >
      <span>{`${content} ${from}`}</span>
      <span>{ip}</span>
    </span>
  );
}
