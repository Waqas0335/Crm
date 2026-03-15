'use client';

import { useState } from 'react';
import QuickLinks from './QuickLinks';
import ToolbarControls from './ToolbarControls';
import ToolbarFilters from './ToolbarFilters';
import type { ListView, SortOption } from '@/types';

const SORT_OPTIONS: SortOption[] = ['Recently updated', 'Date created', 'Name A-Z', 'Status'];

/* Shared select class · .s-sel */
const SORT_SEL =
  'bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] px-[7px] py-1 pr-[22px] rounded-[6px] min-w-[130px] appearance-none cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none focus:border-[var(--neo-accent)] focus:shadow-[0_0_0_3px_var(--accent-g)] bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'5\' fill=\'none\' viewBox=\'0 0 9 5\'%3E%3Cpath d=\'M1 1l3.5 3L8 1\' stroke=\'%2394a3b8\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_6px_center]';

export default function Toolbar() {
  const [location,    setLocation]    = useState('Arizona- Prescott');
  const [loadCount,   setLoadCount]   = useState('1000');
  const [listView,    setListView]    = useState<ListView>('Live');
  const [staticFilter, setStaticFilter] = useState(false);
  const [sortBy,      setSortBy]      = useState<SortOption>('Recently updated');
  const [search,      setSearch]      = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compactView, setCompactView] = useState(false);

  return (
    /*
     * .tb → bg-[var(--surface-2)] border-b border-[var(--neo-border)]
     *       shrink-0 shadow-[0_1px_3px_rgba(0,0,0,.04)]
     */
    <div className="bg-[var(--surface-2)] border-b border-[var(--neo-border)] shrink-0 shadow-[0_1px_3px_rgba(0,0,0,.04)]">

      {/* Top row · .tb-top → flex items-center justify-between px-[14px] py-[7px] border-b border-[var(--neo-border)] gap-[10px] flex-wrap */}
      <div className="flex items-center justify-between px-[14px] py-[7px] border-b border-[var(--neo-border)] gap-[10px] flex-wrap">
        <QuickLinks />
        <ToolbarControls
          location={location}           onLocationChange={setLocation}
          loadCount={loadCount}         onLoadCountChange={setLoadCount}
          listView={listView}           onListViewChange={setListView}
          staticFilter={staticFilter}   onStaticFilterChange={() => setStaticFilter(!staticFilter)}
        />
      </div>

      {/* Bottom row · .tb-bot → flex items-center justify-between px-[14px] py-[7px] gap-[10px] flex-wrap */}
      <div className="flex items-center justify-between px-[14px] py-[7px] gap-[10px] flex-wrap">

        {/* Left · .tb-l → flex items-center gap-[7px] */}
        <div className="flex items-center gap-[7px] flex-wrap">

          {/*
           * .fil-btn      → base
           * .fil-btn.on   → active (filters open)
           */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-[5px] px-[10px] py-[5px] border rounded-[6px] text-[11.5px] font-[family-name:var(--ff)] transition-all duration-150 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,.06)]
              ${filtersOpen
                ? 'bg-[var(--accent-g)] border-[var(--neo-accent)] text-[var(--neo-accent)]'
                : 'bg-white border-[var(--neo-border)] text-[var(--text-2)] hover:bg-[var(--accent-g)] hover:border-[var(--neo-accent)] hover:text-[var(--neo-accent)]'
              }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            {filtersOpen ? 'Hide' : 'Show'} Filters
          </button>

          {/*
           * .dr-btn → flex items-center gap-[5px] px-[10px] py-[5px]
           *           bg-white border border-[var(--neo-border)] text-[var(--text-2)]
           *           rounded-[6px] text-[11.5px] shadow-[0_1px_3px_rgba(0,0,0,.06)]
           *           hover:border-[var(--neo-accent)] hover:text-[var(--text-1)]
           */}
          <button className="flex items-center gap-[5px] px-[10px] py-[5px] bg-white border border-[var(--neo-border)] text-[var(--text-2)] rounded-[6px] text-[11.5px] font-[family-name:var(--ff)] shadow-[0_1px_3px_rgba(0,0,0,.06)] transition-all duration-150 cursor-pointer hover:border-[var(--neo-accent)] hover:text-[var(--text-1)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Select date range</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Sort · .srt → flex items-center gap-[5px] */}
          <div className="flex items-center gap-[5px]">
            {/* .srt-l → text-[10.5px] text-[var(--text-3)] */}
            <span className="text-[10.5px] text-[var(--text-3)]">Sort by</span>
            <select className={SORT_SEL} value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Right · .tb-r → flex items-center gap-[7px] */}
        <div className="flex items-center gap-[7px]">

          {/* Search · .srch → relative flex items-center */}
          <div className="relative flex items-center">
            {/* .srch-ico → absolute left-[9px] text-[var(--text-3)] pointer-events-none */}
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="absolute left-[9px] text-[var(--text-3)] pointer-events-none"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            {/*
             * .srch-i → bg-white border border-[var(--neo-border)] text-[var(--text-1)]
             *           text-[11.5px] pl-[30px] pr-[9px] py-[5px] rounded-[6px]
             *           w-[220px] shadow-[0_1px_3px_rgba(0,0,0,.06)]
             *           focus:w-[270px] focus:border-[var(--neo-accent)]
             *           focus:shadow-[0_0_0_3px_var(--accent-g)]
             *           transition-[border-color,width] duration-200
             */}
            <input
              className="bg-white border border-[var(--neo-border)] text-[var(--text-1)] text-[11.5px] font-[family-name:var(--ff)] pl-[30px] pr-[9px] py-[5px] rounded-[6px] w-[220px] shadow-[0_1px_3px_rgba(0,0,0,.06)] outline-none placeholder:text-[var(--text-3)] focus:border-[var(--neo-accent)] focus:w-[270px] focus:shadow-[0_0_0_3px_var(--accent-g)] transition-[border-color,width] duration-200"
              placeholder="Search by name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/*
           * .exp-btn → flex items-center gap-[5px] px-[10px] py-[5px]
           *            bg-white border border-[var(--neo-border)] text-[var(--neo-accent)]
           *            text-[11.5px] rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,.06)]
           *            hover:bg-[var(--accent-g)] hover:border-[var(--neo-accent)]
           */}
          <button className="flex items-center gap-[5px] px-[10px] py-[5px] bg-white border border-[var(--neo-border)] text-[var(--neo-accent)] text-[11.5px] font-[family-name:var(--ff)] rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,.06)] transition-all duration-150 cursor-pointer hover:bg-[var(--accent-g)] hover:border-[var(--neo-accent)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export app list
          </button>
        </div>
      </div>

      {/* Expandable filter panel */}
      {filtersOpen && (
        <ToolbarFilters
          compactView={compactView}
          onCompactViewChange={() => setCompactView(!compactView)}
        />
      )}
    </div>
  );
}