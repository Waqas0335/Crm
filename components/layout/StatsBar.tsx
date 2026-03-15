import React from 'react';
import { STAT_GROUPS } from '@/data/mockData';
import type { StatGroup, StatItem } from '@/types';

function StatValue({ stat }: { stat: StatItem }) {
  return (
    <div className="si">
      <span className="sl">{stat.label}</span>
      <span className={`sv${stat.variant ? ` ${stat.variant}` : ''}`}>
        {stat.value}
      </span>
    </div>
  );
}

function StatGroupBlock({ group }: { group: StatGroup }) {
  return (
    <div className="sg">
      <div className={`sg-l ${group.colorClass}`}>{group.label}</div>
      <div className="sr">
        {group.stats.map((stat) => (
          <StatValue key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="sb">
      {STAT_GROUPS.map((group, index) => (
        <React.Fragment key={group.label}>
          {index > 0 && <div className="sdiv" />}
          <StatGroupBlock group={group} />
        </React.Fragment>
      ))}
    </div>
  );
}