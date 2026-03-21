import React, { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            (entry.target as HTMLElement).style.filter = "blur(0px)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export const revealStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(18px)",
  filter: "blur(4px)",
  transition:
    "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)",
};

export const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
    {children}
  </span>
);

export const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-[hsl(220,20%,8%)] shadow-lg">
    {title && (
      <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(0,72%,51%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(45,93%,47%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(142,71%,45%)]" />
        <span className="ml-2 text-[11px] text-muted-foreground">{title}</span>
      </div>
    )}
    <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
      <code className="text-[hsl(210,40%,88%)]">{code}</code>
    </pre>
  </div>
);
