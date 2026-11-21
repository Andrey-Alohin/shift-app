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
      className={cn(
        "fixed w-full h-full backdrop-blur-xs top-0 left-0 flex items-center justify-center translate-full transition-transform",
        isOpen && "translate-0",
      )}
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) closeFunc();
      }}
    >
      <div className="p-2 rounded-2xl bg-accent-foreground">
        <h1>Modal window</h1>
        {}
      </div>
    </div>
  );
}
