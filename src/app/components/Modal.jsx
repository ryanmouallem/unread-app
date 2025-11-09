"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { login, signup } from "../login/actions";

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
        className="relative w-[min(92vw,36rem)] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#F4F3ED] p-6 shadow-xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={closeModal}
          className="absolute right-3 top-3 rounded-md p-2 text-[#3B332B]/70 hover:bg-black/5 hover:text-[#3B332B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
        >
          <X size={18} />
        </button>

        <h2 id="auth-modal-title" className="text-2xl font-semibold text-[#3B332B] pr-8">
          Welcome back
        </h2>
        <p className="mt-1 text-[#3B332B]/70">Log in or create an account.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3B332B]">
              Email
            </label>
            <input
              ref={firstFieldRef}
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-[#E7E2DD] bg-white px-4 py-3 text-[#3B332B] placeholder:text-[#3B332B]/60 focus:outline-none focus:ring-2 focus:ring-[#81A282]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3B332B]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-[#E7E2DD] bg-white px-4 py-3 text-[#3B332B] placeholder:text-[#3B332B]/60 focus:outline-none focus:ring-2 focus:ring-[#81A282]"
              placeholder="••••••••"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              className="bg-[#493F37] text-[#F9F8F6] rounded-lg px-5 py-3 shadow-sm hover:bg-[#3B332B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
              formAction={login}
            >
              Log in
            </button>
            <button
              className="bg-white text-[#493F37] border border-[#E7E2DD] rounded-lg px-5 py-3 shadow-sm hover:bg-[#F9F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
              formAction={signup}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
