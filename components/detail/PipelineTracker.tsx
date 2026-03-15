const PIPELINE_STEPS = [
  'Fresh',
  'Working',
  'Pre-Approved',
  'Application Submitted',
  'Appointment Set',
] as const

const DONE_UNTIL = 2

export default function PipelineTracker() {
  return (
    <div className="flex items-center flex-wrap gap-[3px] px-3 py-[10px] border-b border-[var(--neo-border)] bg-[rgba(59,130,246,.03)] overflow-x-auto">
      {PIPELINE_STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-[3px] min-w-fit">
          <span
            className={`text-[9.5px] px-2 py-[3px] rounded-full border whitespace-nowrap
              ${i <= DONE_UNTIL
                ? 'bg-blue-500/10 border-blue-300/60 text-blue-600 font-semibold'
                : 'bg-transparent border-[var(--neo-border)] text-[var(--text-3)]'
              }`}
          >
            {step}
          </span>
          {i < PIPELINE_STEPS.length - 1 && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-3)] shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}