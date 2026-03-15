'use client';

import Toggle from '@/components/ui/Toggle';
import type { ListView } from '@/types';

interface ToolbarControlsProps {
  location: string;
  onLocationChange: (v: string) => void;
  loadCount: string;
  onLoadCountChange: (v: string) => void;
  listView: ListView;
  onListViewChange: (v: ListView) => void;
  staticFilter: boolean;
  onStaticFilterChange: () => void;
}

const LOCATIONS   = ['Arizona- Prescott', 'Arizona- Phoenix', 'Arizona- Tucson', 'Arizona- Mesa'];
const LOAD_COUNTS = ['100', '500', '1000', '2000'];
const LIST_VIEWS: ListView[] = ['Live', 'Static'];

/*
 * .c-sel      → min-w-[130px]
 * .c-sel.nw   → min-w-[65px]
 */
const SEL_BASE =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] px-[7px] py-1 pr-[22px] rounded-[6px] appearance-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_6px_center]';

const SEL_W  = SEL_BASE + ' min-w-[130px]';   /* .c-sel      */
const SEL_NW = SEL_BASE + ' min-w-[65px]';    /* .c-sel.nw   */

export default function ToolbarControls({
  location, onLocationChange,
  loadCount, onLoadCountChange,
  listView, onListViewChange,
  staticFilter, onStaticFilterChange,
}: ToolbarControlsProps) {
  return (
    /* .tc → flex items-center gap-[9px] flex-wrap */
    <div className="flex items-center gap-[9px] flex-wrap">

      {/* .cg → flex items-center gap-1 */}
      <div className="flex items-center gap-1">
        {/* .c-lbl → text-[10.5px] text-[var(--text-3)] whitespace-nowrap */}
        <span className="text-[10.5px] text-[var(--text-3)] whitespace-nowrap">Location</span>
        <select className={SEL_W} value={location} onChange={(e) => onLocationChange(e.target.value)}>
          {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10.5px] text-[var(--text-3)] whitespace-nowrap">Load Count</span>
        <select className={SEL_NW} value={loadCount} onChange={(e) => onLoadCountChange(e.target.value)}>
          {LOAD_COUNTS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10.5px] text-[var(--text-3)] whitespace-nowrap">List view</span>
        <select className={SEL_NW} value={listView} onChange={(e) => onListViewChange(e.target.value as ListView)}>
          {LIST_VIEWS.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      <Toggle
        checked={staticFilter}
        onChange={onStaticFilterChange}
        label="Static Filter"
        sm
      />
    </div>
  );
}