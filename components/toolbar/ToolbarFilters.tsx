'use client';

import Toggle from '@/components/ui/Toggle';

interface ToolbarFiltersProps {
  compactView: boolean;
  onCompactViewChange: () => void;
}

const FILTER_FIELDS = ['Status', 'Source', 'Sales', 'BDR', 'Location', 'Tags'] as const;

/* Matches .fi select */
const SELECT_CLS =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11px] font-[family-name:var(--ff)] px-[7px] py-1 pr-[20px] rounded-[6px] min-w-[110px] appearance-none cursor-pointer outline-none focus:border-[var(--neo-accent)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_6px_center]';

export default function ToolbarFilters({ compactView, onCompactViewChange }: ToolbarFiltersProps) {
  return (
    /*
     * .fp → px-[14px] py-[10px] border-t border-[var(--neo-border)]
     *       bg-[var(--surface)]
     *       animate-in fade-in slide-in-from-top-1 duration-150
     */
    <div className="px-[14px] py-[10px] border-t border-[var(--neo-border)] bg-[var(--surface)] animate-in fade-in slide-in-from-top-1 duration-150">

      {/* .fg → flex gap-[10px] flex-wrap */}
      <div className="flex gap-[10px] flex-wrap">
        {FILTER_FIELDS.map((field) => (
          /* .fi → flex flex-col gap-[3px] */
          <div key={field} className="flex flex-col gap-[3px]">
            {/* .fi label → text-[10px] text-[var(--text-3)] */}
            <label htmlFor={`filter-${field}`} className="text-[10px] text-[var(--text-3)]">
              {field}
            </label>
            <select id={`filter-${field}`} className={SELECT_CLS}>
              <option value="">All</option>
            </select>
          </div>
        ))}
      </div>

      {/* .mt8 → mt-2 */}
      <div className="mt-2">
        <Toggle
          checked={compactView}
          onChange={onCompactViewChange}
          label="Compact View"
          sm
        />
      </div>
    </div>
  );
}