"use client";

import { ArrowUpDown } from "lucide-react";

const options = [
  { value: "newest", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowUpDown
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-11 pr-8 py-3 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}