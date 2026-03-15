import type { LeadChannel } from '@/types';

interface ChannelBadgeProps {
  channel: LeadChannel;
}

export default function ChannelBadge({ channel }: ChannelBadgeProps) {
  const cls = channel === 'Online' ? 'on' : 'le';
  return (
    <span className={`ch ${cls}`}>
      {channel}
    </span>
  );
}