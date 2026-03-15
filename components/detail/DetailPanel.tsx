import DetailHeader from './DetailHeader';
import ActivityForm from './ActivityForm';
import type { Lead } from '@/types';

interface DetailPanelProps {
  lead: Lead;
  onClose: () => void;
  onUpdateLead: (updated: Lead) => void;
}

export default function DetailPanel({ lead, onClose, onUpdateLead }: DetailPanelProps) {
  return (
    <aside className="dp">
      <DetailHeader lead={lead} onClose={onClose} onUpdateLead={onUpdateLead} />
      <ActivityForm />
    </aside>
  );
}