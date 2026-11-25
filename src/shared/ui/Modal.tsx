"use client";
import { useRef } from "react";
import { cn } from "../utils";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  closeFunc: () => void;
  children: React.ReactNode;
}

export function Modal({ className, isOpen, children, closeFunc }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      aria-hidden={!isOpen}
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) closeFunc();
      }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/25 transition-opacity duration-300 ",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "p-4 bg-background rounded-2xl transition-transform duration-400 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
