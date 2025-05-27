// components/CooltimeBlocks.tsx
import React from "react";

interface InputBlockProps {
  value: number;
  onChange: (val: number) => void;
}

export function InputBlock({ value, onChange }: InputBlockProps) {
  return (
    <div>
      <input
        type="number"
        className="w-full border px-2 py-1 rounded text-lg"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        step="0.1"
      />
    </div>
  );
}

interface ReadOnlyBlockProps {
  value: string;
}

export function ReadOnlyBlock({ value }: ReadOnlyBlockProps) {
  return (
    <div>
      <input
        type="text"
        className="w-full border px-2 py-1 rounded text-lg"
        value={value}
        readOnly
      />
    </div>
  );
}
