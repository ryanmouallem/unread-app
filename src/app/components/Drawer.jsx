"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function Drawer({ isOpen, onClose, title, children, widthClass = "w-[min(92vw,28rem)]" }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const panel = e.currentTarget;
    const focusables = panel.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter((el) => !el.hasAttribute('disabled'));
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 z-10 h-full ${widthClass} max-w-full bg-[#F4F3ED] shadow-xl ring-1 ring-black/5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#E7E2DD] bg-[#F4F3ED] px-4 py-3">
          <h3 className="text-lg font-semibold text-[#3B332B]">{title}</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-2 text-[#3B332B]/70 hover:bg-black/5 hover:text-[#3B332B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="h-[calc(100%-3.25rem)] overflow-y-auto p-4" onKeyDown={trapFocus}>{children}</div>
      </aside>
    </div>
  );
}
