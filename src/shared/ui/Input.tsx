import clsx from "clsx";

export default function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <>
      <input
        type={type || "text"}
        className={clsx(
          "w-full bg-secondary border border-border rounded-xl px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
          className,
        )}
        {...props}
      />
    </>
  );
}
