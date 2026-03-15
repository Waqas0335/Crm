'use client';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  sm?: boolean;
}

export default function Toggle({ checked, onChange, label, sm = false }: ToggleProps) {
  return (
    <label className={`tog${sm ? ' sm' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="tog-t">
        <span className="tog-h" />
      </span>
      <span className="tog-l">{label}</span>
    </label>
  );
}