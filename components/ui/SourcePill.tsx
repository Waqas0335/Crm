import type { LeadSource } from '@/types';

interface SourcePillProps {
  source: LeadSource;
}

const sourceColors: Record<string, string> = {
  Website: '#6366f1',
  Facebook: '#3b82f6',
  CarDealer: '#8b5cf6',
};

export default function SourcePill({ source }: SourcePillProps) {
  const color = sourceColors[source] ?? '#64748b';
  return (
    <span
      className="mv sp"
      style={{ background: `${color}22`, color }}
    >
      {source}
    </span>
  );
}