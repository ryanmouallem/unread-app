"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import AuthCard from "@/app/login/AuthCard";

export default function Modal({ closeModal }) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [closeModal]);

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll(
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={closeModal}
    >
      <div
        ref={dialogRef}
        className="relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
      >
        <button
          aria-label="Close"
          onClick={closeModal}
          className="absolute right-3 top-3 rounded-md p-2 text-[#3B332B]/70 hover:bg-black/5 hover:text-[#3B332B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
        >
          <X size={18} />
        </button>
        <AuthCard
          className="w-[min(92vw,36rem)] max-h-[85vh] overflow-y-auto pt-10"
          emailFieldRef={firstFieldRef}
          headingId="auth-modal-title"
        />
      </div>
    </div>
  );
}
