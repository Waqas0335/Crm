'use client';

import { useState, useRef, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  inputClassName?: string;
}

const COUNTRIES = [
  { code: 'AF', dial: '+93', len: [9] },
  { code: 'AL', dial: '+355', len: [9] },
  { code: 'DZ', dial: '+213', len: [9] },
  { code: 'AD', dial: '+376', len: [6] },
  { code: 'AO', dial: '+244', len: [9] },
  { code: 'AR', dial: '+54', len: [10] },
  { code: 'AM', dial: '+374', len: [8] },
  { code: 'AU', dial: '+61', len: [9] },
  { code: 'AT', dial: '+43', len: [10] },
  { code: 'AZ', dial: '+994', len: [9] },
  { code: 'BH', dial: '+973', len: [8] },
  { code: 'BD', dial: '+880', len: [10] },
  { code: 'BE', dial: '+32', len: [9] },
  { code: 'BZ', dial: '+501', len: [7] },
  { code: 'BJ', dial: '+229', len: [8] },
  { code: 'BT', dial: '+975', len: [8] },
  { code: 'BO', dial: '+591', len: [8] },
  { code: 'BR', dial: '+55', len: [10, 11] },
  { code: 'BN', dial: '+673', len: [7] },
  { code: 'BG', dial: '+359', len: [8, 9] },
  { code: 'KH', dial: '+855', len: [8, 9] },
  { code: 'CA', dial: '+1', len: [10] },
  { code: 'CL', dial: '+56', len: [9] },
  { code: 'CN', dial: '+86', len: [11] },
  { code: 'CO', dial: '+57', len: [10] },
  { code: 'HR', dial: '+385', len: [8, 9] },
  { code: 'CU', dial: '+53', len: [8] },
  { code: 'CY', dial: '+357', len: [8] },
  { code: 'CZ', dial: '+420', len: [9] },
  { code: 'DK', dial: '+45', len: [8] },
  { code: 'EC', dial: '+593', len: [9] },
  { code: 'EG', dial: '+20', len: [10] },
  { code: 'FI', dial: '+358', len: [5, 9, 10] },
  { code: 'FR', dial: '+33', len: [9] },
  { code: 'DE', dial: '+49', len: [10, 11] },
  { code: 'GH', dial: '+233', len: [9] },
  { code: 'GR', dial: '+30', len: [10] },
  { code: 'HK', dial: '+852', len: [8] },
  { code: 'HU', dial: '+36', len: [9] },
  { code: 'IS', dial: '+354', len: [7] },
  { code: 'IN', dial: '+91', len: [10] },
  { code: 'ID', dial: '+62', len: [9, 10, 11] },
  { code: 'IR', dial: '+98', len: [10] },
  { code: 'IQ', dial: '+964', len: [10] },
  { code: 'IE', dial: '+353', len: [9] },
  { code: 'IL', dial: '+972', len: [9] },
  { code: 'IT', dial: '+39', len: [9, 10] },
  { code: 'JP', dial: '+81', len: [10] },
  { code: 'JO', dial: '+962', len: [9] },
  { code: 'KE', dial: '+254', len: [9] },
  { code: 'KR', dial: '+82', len: [9, 10] },
  { code: 'KW', dial: '+965', len: [8] },
  { code: 'LB', dial: '+961', len: [7, 8] },
  { code: 'MY', dial: '+60', len: [9, 10] },
  { code: 'MX', dial: '+52', len: [10] },
  { code: 'MA', dial: '+212', len: [9] },
  { code: 'NP', dial: '+977', len: [10] },
  { code: 'NL', dial: '+31', len: [9] },
  { code: 'NZ', dial: '+64', len: [8, 10] },
  { code: 'NG', dial: '+234', len: [10] },
  { code: 'NO', dial: '+47', len: [8] },
  { code: 'OM', dial: '+968', len: [8] },
  { code: 'PK', dial: '+92', len: [10] },
  { code: 'PH', dial: '+63', len: [10] },
  { code: 'PL', dial: '+48', len: [9] },
  { code: 'PT', dial: '+351', len: [9] },
  { code: 'QA', dial: '+974', len: [8] },
  { code: 'RU', dial: '+7', len: [10] },
  { code: 'SA', dial: '+966', len: [9] },
  { code: 'SG', dial: '+65', len: [8] },
  { code: 'ZA', dial: '+27', len: [9] },
  { code: 'ES', dial: '+34', len: [9] },
  { code: 'LK', dial: '+94', len: [9] },
  { code: 'SE', dial: '+46', len: [9] },
  { code: 'CH', dial: '+41', len: [9] },
  { code: 'TH', dial: '+66', len: [9] },
  { code: 'TR', dial: '+90', len: [10] },
  { code: 'AE', dial: '+971', len: [9] },
  { code: 'GB', dial: '+44', len: [10] },
  { code: 'US', dial: '+1', len: [10] },
  { code: 'VN', dial: '+84', len: [9] },
].sort((a, b) => a.code.localeCompare(b.code));

export default function PhoneInput({
  value, onChange, placeholder = '555 000 0000', inputClassName = ""
}: PhoneInputProps) {
  const [dialCode, setDialCode] = useState('+1');
  const [number, setNumber]     = useState('');
  const [touched, setTouched]   = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const dropdownRef             = useRef<HTMLDivElement>(null);

  const country     = COUNTRIES.find(c => c.dial === dialCode) ?? COUNTRIES.find(c => c.code === 'US')!;
  const digits      = number.replace(/\D/g, '');
  const valid       = country.len.includes(digits.length);
  const showErr     = touched && number.length > 0 && !valid;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(dial: string) {
    setDialCode(dial);
    setIsOpen(false);
    setTouched(false);
    onChange(`${dial} ${number}`);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1.5 relative" ref={dropdownRef}>
        
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`min-w-[75px] w-auto shrink-0 bg-white/80 border rounded-xl px-2.5 py-2.5 text-[12px] font-semibold text-slate-700 flex items-center justify-between cursor-pointer select-none transition-all
            ${showErr ? 'border-red-300' : 'border-slate-200 hover:border-slate-300'} 
            ${isOpen ? 'ring-2 ring-blue-100 border-blue-400' : ''}`}
        >
          <span className="flex gap-1">
            <span className="text-slate-400 font-medium">{country.code}</span>
            <span>{country.dial}</span>
          </span>
          <svg className={`ml-1 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-[110] overflow-hidden">
            <div className="max-h-[250px] overflow-y-auto py-1">
              {COUNTRIES.map((c) => (
                <div
                  key={`${c.code}-${c.dial}`}
                  onClick={() => handleSelect(c.dial)}
                  className={`px-4 py-2.5 text-[12px] cursor-pointer flex justify-between items-center transition-colors
                    ${dialCode === c.dial && country.code === c.code ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span className="font-bold">{c.code} <span className="font-normal text-slate-400 ml-1">{c.dial}</span></span>
                  {dialCode === c.dial && country.code === c.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          type="tel"
          className={`flex-1 min-w-0 ${inputClassName} ${showErr ? '!border-red-300' : ''}`}
          placeholder={placeholder}
          value={number}
          onChange={(e) => {
            const val = e.target.value.replace(/[^\d\s-]/g, '');
            setNumber(val);
            onChange(`${dialCode} ${val}`);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {showErr && (
        <p className="text-[10px] text-red-500 font-medium ml-1">
          Invalid number for {country.code}
        </p>
      )}
    </div>
  );
}