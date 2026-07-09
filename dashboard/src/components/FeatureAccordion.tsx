"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FeatureAccordion({
  title,
  subtitle,
  children,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-slate-900 transition"
      >
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}