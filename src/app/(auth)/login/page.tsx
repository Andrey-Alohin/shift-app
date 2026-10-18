"use client";
import { LoginForm } from "@/features/auth/ui/LoginFom";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-[44%] bg-card border-r border-border flex-col justify-between p-10 relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute top-1/3 -left-24 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
              {/* Icon */}
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight">
              Графік змін
            </span>
          </div>
        </div>

        <div className="relative space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              Сьогодні
            </p>
            <div className="space-y-2">
              {[
                {
                  name: "Олена Петренко",
                  time: "09:00–17:00",
                  color: "#5b73f5",
                  init: "ОП",
                },
                {
                  name: "Максим Коваль",
                  time: "10:00–19:00",
                  color: "#34d399",
                  init: "МК",
                },
                {
                  name: "Ірина Сидорчук",
                  time: "11:00–20:00",
                  color: "#f59e0b",
                  init: "ІС",
                },
                {
                  name: "Артем Бондаренко",
                  time: "08:00–20:00",
                  color: "#a78bfa",
                  init: "АБ",
                  out: true,
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-background/40 backdrop-blur"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{
                      backgroundColor: p.color + "25",
                      color: p.color,
                      border: `1px solid ${p.color}35`,
                    }}
                  >
                    {p.init}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">
                      {p.name}
                    </div>
                  </div>
                  {p.out && (
                    <span className="text-[9px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                      OUT
                    </span>
                  )}
                  <span className="text-[11px] font-['JetBrains_Mono'] text-muted-foreground shrink-0">
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="border-l-2 border-primary/40 pl-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Одне місце для всього графіку.
            </p>
          </blockquote>
        </div>

        <div className="relative">
          <p className="text-xs text-muted-foreground/40">
            © 2026 Shift Manager
          </p>
        </div>
      </div>
      <LoginForm />
    </main>
  );
}
