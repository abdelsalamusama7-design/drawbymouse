import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import kivyImports from "@/assets/kivy-code-imports.png";
import kivyTouchFlow from "@/assets/kivy-touch-flow.png";
import kivyTouchDown from "@/assets/kivy-touch-down.png";
import kivyTouchMove from "@/assets/kivy-touch-move.png";
import kivyAppClass from "@/assets/kivy-app-class.png";

function useScrollReveal() {
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
            (entry.target as HTMLElement).style.transform = "translateY(0) blur(0)";
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

const revealStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(18px)",
  filter: "blur(4px)",
  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)",
};

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
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

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
    {children}
  </span>
);

const Learn = () => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-sm font-bold tracking-tight text-foreground">
            Kivy<span className="text-primary">Paint</span>
          </span>
          <div className="flex items-center gap-4">
            <a href="#concepts" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Concepts
            </a>
            <a href="#code" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Code
            </a>
            <Link
              to="/"
              className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
            >
              Try the App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(220,70%,45%,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
          <div data-reveal style={revealStyle}>
            <SectionTag>Open-Source Python Framework</SectionTag>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl" style={{ textWrap: "balance" }}>
              Building a Touch Painting App with Kivy
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
              Learn how Kivy handles multi-touch input, canvas drawing, and random color generation —
              the core concepts behind creating interactive painting applications that run everywhere.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/"
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
              >
                Open Live Demo
              </Link>
              <a
                href="#concepts"
                className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.97]"
              >
                Read the Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — Imports & Setup */}
      <section id="concepts" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <SectionTag>Step 1</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Imports & Widget Setup
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                Every Kivy painting app starts by importing <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">App</code>,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Widget</code>, and the graphics primitives —{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Color</code>,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Ellipse</code>, and{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Line</code>.
                The <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">DrawingPad</code> class
                extends Widget and uses <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">touch.ud</code> (user data dictionary)
                to store a seeded random color for each unique touch.
              </p>
              <CodeBlock
                title="drawing_pad.py"
                code={`from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse, Line
import random

class DrawingPad(Widget):
    def get_color(self, touch):
        if 'color' not in touch.ud:
            random.seed(touch.uid)
            touch.ud['color'] = (
                random.random(),
                random.random(),
                random.random()
            )
        return touch.ud['color']`}
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src={kivyImports}
                alt="Kivy imports and DrawingPad class definition showing get_color method"
                className="w-full rounded-xl border border-border shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Touch Flow Diagram */}
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="text-center">
            <SectionTag>How It Works</SectionTag>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
              Color Assignment Flow
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
              When a finger touches the screen, Kivy checks <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">touch.ud</code> for an existing color.
              If none exists, it seeds the random generator with the touch's unique ID and generates an RGB tuple —
              ensuring each finger always gets a consistent, unique color.
            </p>
            <img
              src={kivyTouchFlow}
              alt="Flowchart showing how touch.ud stores color data per touch event"
              className="mx-auto mt-10 w-full max-w-2xl rounded-xl border border-border bg-card shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Section 3 — on_touch_down */}
      <section id="code" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center md:order-1">
              <img
                src={kivyTouchDown}
                alt="on_touch_down method code showing ellipse creation and line initialization"
                className="w-full rounded-xl border border-border shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="md:order-2">
              <SectionTag>Step 2</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Handling Touch Down
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                When a touch begins, <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">on_touch_down</code> fires.
                It retrieves the color, draws an initial ellipse at the touch position,
                and initializes a <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">Line</code> object stored in{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">touch.ud['line']</code> —
                ready to be extended as the finger moves.
              </p>
              <CodeBlock
                title="on_touch_down"
                code={`def on_touch_down(self, touch):
    color = self.get_color(touch)
    with self.canvas:
        Color(*color)
        d = 30
        Ellipse(
            pos=(touch.x - d/2, touch.y - d/2),
            size=(d, d)
        )
        touch.ud['line'] = Line(
            points=[touch.x, touch.y],
            width=2
        )`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — on_touch_move */}
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <SectionTag>Step 3</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Tracking Touch Movement
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                As the finger moves, <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">on_touch_move</code> appends
                the current position to the line's point list. Kivy automatically
                re-renders the updated line on the canvas — creating a smooth,
                continuous stroke that follows the touch path.
              </p>
              <CodeBlock
                title="on_touch_move"
                code={`def on_touch_move(self, touch):
    touch.ud['line'].points += [
        touch.x, touch.y
    ]`}
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src={kivyTouchMove}
                alt="Diagram showing how on_touch_move extends the line points array"
                className="w-full rounded-xl border border-border shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — App Class */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center md:order-1">
              <img
                src={kivyAppClass}
                alt="TouchDrawApp class with build method returning DrawingPad widget"
                className="w-full max-w-md rounded-xl border border-border shadow-xl"
                loading="lazy"
              />
            </div>
            <div className="md:order-2">
              <SectionTag>Step 4</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Running the Application
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                The <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">TouchDrawApp</code> class
                extends <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">App</code> and
                returns a <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">DrawingPad()</code> instance
                from its <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">build()</code> method.
                Calling <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">run()</code> launches
                the event loop — and your painting app is live on any platform Kivy supports.
              </p>
              <CodeBlock
                title="main.py"
                code={`class TouchDrawApp(App):
    def build(self):
        return DrawingPad()

TouchDrawApp().run()`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
              See it in action
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              We rebuilt this Kivy painting example as a web app using HTML Canvas.
              Try drawing with your mouse or fingers — each stroke gets a random color, just like the original.
            </p>
            <Link
              to="/"
              className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
            >
              Launch Drawing App →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-6 text-center">
        <p className="text-[11px] text-muted-foreground">
          Built with React & Canvas — inspired by the{" "}
          <a href="https://kivy.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            Kivy framework
          </a>{" "}
          painting tutorial
        </p>
      </footer>
    </div>
  );
};

export default Learn;
