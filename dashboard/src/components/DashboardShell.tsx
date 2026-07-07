"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveRef = useRef<Element | null>(null);

  useEffect(() => {
    const body = document.body;

    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const container = sidebarRef.current;
        if (!container) return;

        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    if (open) {
      previousActiveRef.current = document.activeElement;
      body.classList.add("overflow-hidden");
      // focus close button or first focusable
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        } else if (sidebarRef.current) {
          const first = sidebarRef.current.querySelector<HTMLElement>(
            'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
          );
          first?.focus();
        }
      }, 0);

      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.classList.remove("overflow-hidden");
      const prev = previousActiveRef.current as HTMLElement | null;
      if (prev) prev.focus();
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#020B22] text-white">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 bg-slate-900/60"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🍉</span>
          <div>
            <div className="text-lg font-bold">Melon</div>
            <div className="text-xs text-slate-400">QA Bot</div>
          </div>
        </div>

        <div />
      </div>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Mobile overlay + slide-in sidebar */}
        <div className={`fixed inset-0 z-50 lg:relative lg:block ${open ? "pointer-events-auto" : "pointer-events-none"} lg:pointer-events-auto`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 lg:hidden transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
            onClick={() => setOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="relative w-full lg:w-72">
            <div
              ref={sidebarRef}
              role={open ? "dialog" : undefined}
              aria-modal={open ? "true" : undefined}
              className={`fixed left-0 top-0 bottom-0 z-50 w-72 transform transition-transform duration-300 lg:relative lg:translate-x-0 bg-transparent ${
                open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
              }`}
            >
              <div className="h-full lg:sticky lg:top-0">
                <div className="flex items-center justify-end p-4 lg:hidden">
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="rounded-md p-2 bg-slate-900/60"
                    ref={closeButtonRef}
                  >
                    <X size={20} />
                  </button>
                </div>

                <Sidebar onLinkClick={open ? () => setOpen(false) : undefined} />
              </div>
            </div>
          </div>
        </div>

        <section className="flex-1 overflow-auto p-6 sm:p-10" aria-hidden={open ? true : undefined}>
          {children}
        </section>
      </div>
    </div>
  );
}
