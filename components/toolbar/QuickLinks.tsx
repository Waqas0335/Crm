const LINKS = [
  'Full Application Form',
  'Short Application',
  'Add New Lead',
  'Event Schedule',
  'Activity Report',
  'Search Inventory',
  'BDC Report',
  'Lead to Sales Report',
] as const;

export default function QuickLinks() {
  return (
    /* .ql → flex items-center gap-[3px] flex-wrap */
    <nav className="flex items-center gap-[3px] flex-wrap">
      {LINKS.map((label) => (
        /*
         * .ql-a → flex items-center gap-1 px-[9px] py-1 text-[var(--text-2)] text-[11.5px]
         *         rounded-[6px] border border-transparent whitespace-nowrap
         *         transition-all duration-150
         *         hover:bg-white hover:text-[var(--neo-accent)]
         *         hover:border-blue-500/20 hover:shadow-[0_1px_4px_rgba(0,0,0,.06)]
         */
        <a
          key={label}
          href="#"
          className="flex items-center gap-1 px-[9px] py-1 text-[var(--text-2)] text-[11.5px] rounded-[6px] border border-transparent whitespace-nowrap transition-all duration-150 hover:bg-white hover:text-[var(--neo-accent)] hover:border-blue-500/20 hover:shadow-[0_1px_4px_rgba(0,0,0,.06)]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}