import React from "react";
import { Link } from "react-router-dom";
import { useScrollReveal, revealStyle, SectionTag, CodeBlock } from "@/components/learn/ScrollReveal";

import kivyLibraryInfo from "@/assets/kivy-library-info.png";
import kivyPaintingSetup from "@/assets/kivy-painting-setup.png";
import kivyColorFlow from "@/assets/kivy-color-flow.png";
import kivyTouchDownCode from "@/assets/kivy-touch-down-code.png";
import kivyTouchDownFlow from "@/assets/kivy-touch-down-flow.png";
import kivyTouchMoveDetail from "@/assets/kivy-touch-move-detail.png";
import kivyAppRun from "@/assets/kivy-app-run.png";
import kivyRunCode from "@/assets/kivy-run-code.png";
import kivyRunDemo from "@/assets/kivy-run-demo.png";

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">{children}</code>
);

const platforms = [
  { name: "Windows", icon: "🪟" },
  { name: "macOS", icon: "🍎" },
  { name: "Linux", icon: "🐧" },
  { name: "Android", icon: "📱" },
  { name: "iOS", icon: "📲" },
  { name: "Raspberry Pi", icon: "🍓" },
];

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
            <a href="#about" className="text-xs text-muted-foreground transition-colors hover:text-foreground">About</a>
            <a href="#code" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Code</a>
            <a href="#demo" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Demo</a>
            <Link to="/" className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]">
              Try the App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — What is Kivy */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(220,70%,45%,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-24">
          <div data-reveal style={revealStyle} className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <SectionTag>Open-Source Python Framework</SectionTag>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl" style={{ textWrap: "balance" }}>
                Building a Touch Painting App with Kivy
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                Kivy is an open-source Python library for building cross-platform GUI applications.
                It supports multi-touch gestures, mouse and keyboard inputs — ideal for modern interactive apps.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]">
                  Open Live Demo
                </Link>
                <a href="#code" className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.97]">
                  Read the Guide
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img src={kivyLibraryInfo} alt="Kivy Library — cross-platform Python framework info" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Platform Support */}
      <section id="about" className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="text-center">
            <SectionTag>Cross-Platform</SectionTag>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
              بيشتغل على كل البلاتفورم
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
              Write once, run everywhere — Kivy apps deploy to all major platforms from a single Python codebase.
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 sm:grid-cols-6">
              {platforms.map((p, i) => (
                <div
                  key={p.name}
                  data-reveal
                  style={{ ...revealStyle, transitionDelay: `${120 + i * 70}ms` }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-xs font-medium text-foreground">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — Imports & Setup */}
      <section id="code" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <SectionTag>Step 1</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Imports & Widget Setup
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                Every Kivy painting app starts by importing <InlineCode>App</InlineCode>, <InlineCode>Widget</InlineCode>, and
                the graphics primitives — <InlineCode>Color</InlineCode>, <InlineCode>Ellipse</InlineCode>, and <InlineCode>Line</InlineCode>.
                The <InlineCode>DrawingPad</InlineCode> class uses <InlineCode>touch.ud</InlineCode> to store a seeded random color for each unique touch.
              </p>
              <div className="mt-6">
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
            </div>
            <div className="flex items-center justify-center">
              <img src={kivyPaintingSetup} alt="Kivy imports and DrawingPad class setup" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Color Assignment Flow */}
      <section className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="text-center">
            <SectionTag>How It Works</SectionTag>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
              Color Assignment Flow
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
              When a finger touches the screen, Kivy checks <InlineCode>touch.ud</InlineCode> for an existing color.
              If none exists, it seeds the random generator with the touch's unique ID — ensuring each finger gets a consistent, unique color.
            </p>
            <img src={kivyColorFlow} alt="Flowchart showing how touch.ud stores color data per touch event" className="mx-auto mt-10 w-full max-w-2xl rounded-xl border border-border bg-card shadow-xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Section 3 — on_touch_down */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <SectionTag>Step 2</SectionTag>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Handling Touch Down
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                  When a touch begins, <InlineCode>on_touch_down</InlineCode> retrieves the color, draws an initial ellipse,
                  and initializes a <InlineCode>Line</InlineCode> stored in <InlineCode>touch.ud['line']</InlineCode> — ready to be extended as the finger moves.
                </p>
              </div>
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
            <div className="flex flex-col items-center gap-6">
              <img src={kivyTouchDownCode} alt="on_touch_down code" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
              <img src={kivyTouchDownFlow} alt="on_touch_down flow diagram" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
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
                As the finger moves, <InlineCode>on_touch_move</InlineCode> appends the current position to the line's point list.
                Kivy automatically re-renders the updated line — creating a smooth, continuous stroke.
              </p>
              <div className="mt-6">
                <CodeBlock
                  title="on_touch_move"
                  code={`def on_touch_move(self, touch):
    touch.ud['line'].points += [
        touch.x, touch.y
    ]`}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img src={kivyTouchMoveDetail} alt="on_touch_move diagram showing line extension" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — App Class */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center md:order-1">
              <img src={kivyAppRun} alt="TouchDrawApp class with build method" className="w-full max-w-md rounded-xl border border-border shadow-xl" loading="lazy" />
            </div>
            <div className="md:order-2">
              <SectionTag>Step 4</SectionTag>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Running the Application
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
                The <InlineCode>TouchDrawApp</InlineCode> class extends <InlineCode>App</InlineCode> and
                returns a <InlineCode>DrawingPad()</InlineCode> from its <InlineCode>build()</InlineCode> method.
                Calling <InlineCode>run()</InlineCode> launches the event loop on any platform Kivy supports.
              </p>
              <div className="mt-6">
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
        </div>
      </section>

      {/* Section 6 — Run the Code / Demo */}
      <section id="demo" className="border-b border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal style={{ ...revealStyle, transitionDelay: "80ms" }} className="text-center">
            <SectionTag>Result</SectionTag>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
              Run the Code
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Here's the complete app running — each touch creates a unique colored stroke on a dark canvas.
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <img src={kivyRunCode} alt="IDE showing the complete Kivy painting code" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
              <img src={kivyRunDemo} alt="Running Kivy painting app with colorful strokes" className="w-full rounded-xl border border-border shadow-xl" loading="lazy" />
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
            <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]">
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
