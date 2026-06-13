"use client";

import Aos from "aos";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const AOS_START_DELAY = 220;

const forceAosRecalc = () => {
  Aos.refreshHard();
  window.dispatchEvent(new Event("scroll"));
};

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const aosReady = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frame1;
    let frame2;
    let startDelay;
    let idleId;

    const runWhenIdle = (callback) => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(callback, { timeout: 1200 });
        return;
      }

      startDelay = window.setTimeout(callback, 0);
    };

    const startAos = () => {
      if (cancelled || aosReady.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      Aos.init({
        duration: reduceMotion ? 0 : 420,
        offset: 28,
        once: true,
        startEvent: "travel-easy:aos-start",
        disableMutationObserver: false,
        disable: reduceMotion,
      });

      // Defer class mutations until hydration has settled.
      frame1 = window.requestAnimationFrame(() => {
        frame2 = window.requestAnimationFrame(() => {
          runWhenIdle(() => {
            startDelay = window.setTimeout(() => {
              if (cancelled) return;
              document.dispatchEvent(new Event("travel-easy:aos-start"));
              aosReady.current = true;
              forceAosRecalc();
            }, AOS_START_DELAY);
          });
        });
      });
    };

    if (document.readyState === "complete") {
      startAos();
    } else {
      window.addEventListener("load", startAos, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", startAos);
      if (frame1) window.cancelAnimationFrame(frame1);
      if (frame2) window.cancelAnimationFrame(frame2);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (startDelay) clearTimeout(startDelay);
    };
  }, []);

  // Trigger AOS refresh when the user navigates between pages
  useEffect(() => {
    if (!aosReady.current) return;

    let raf;
    const timers = [];

    raf = window.requestAnimationFrame(() => {
      forceAosRecalc();
    });

    // Next.js App Router often streams/mounts chunks after navigation.
    // Recalculate in small waves so late-mounted sections don't stay hidden.
    timers.push(window.setTimeout(forceAosRecalc, 180));
    timers.push(window.setTimeout(forceAosRecalc, 520));

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [pathname]);

  return (
    <Provider store={store}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Provider>
  );
}
