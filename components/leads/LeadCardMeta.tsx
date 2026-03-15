import SourcePill from '@/components/ui/SourcePill';
import type { Lead } from '@/types';

interface LeadCardMetaProps {
  lead: Lead;
}

export default function LeadCardMeta({ lead }: LeadCardMetaProps) {
  return (
    <div className="li-col">
      {/* Primary name */}
      <div className="ln">
        <a href="#" onClick={(e) => e.stopPropagation()}>{lead.name}</a>
        <span className="lph">– {lead.phone}</span>
      </div>

      {/* Co-applicant */}
      {lead.coName && (
        <div className="co">
          <span className="co-l">co –</span>
          <a
            href="#"
            style={{ fontSize: 12, fontWeight: 500 }}
            onClick={(e) => e.stopPropagation()}
          >
            {lead.coName}
          </a>
          {lead.coPhone && <span className="lph" style={{ fontSize: 11 }}>{lead.coPhone}</span>}
        </div>
      )}

      {/* Meta grid */}
      <div className="mg">
        <div className="mr">
          <span className="ml">Sales</span>
          <span className="mv">{lead.sales ?? '—'}</span>
          <span className="ml">Decision</span>
          <span className="mv">{lead.decision ?? '—'}</span>
          <span className="ml">Source</span>
          <SourcePill source={lead.source} />
          <span className="ml">Detail</span>
          <span className="mv">{lead.detail ?? '—'}</span>
        </div>

        <div className="mr">
          <span className="ml">BDR</span>
          <span className="mv">{lead.bdr ?? '—'}</span>
          <span className="ml">Lot</span>
          <span className="mv">{lead.lot ?? '—'}</span>
          <span className="ml">BDR 2</span>
          <span className="mv">{lead.bdr2 ?? '—'}</span>
          {lead.down && (
            <>
              <span className="ml">Down</span>
              <span className="mv dv">{lead.down}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}