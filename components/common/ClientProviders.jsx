"use client";

import Aos from "aos";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const aosReady = useRef(false);

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

    const startAos = () => {
      if (cancelled || aosReady.current) return;

      Aos.init({
        duration: 1200,
        once: true,
        startEvent: "kashf:aos-start",
        disableMutationObserver: true,
      });

      // Wait for two paint frames before applying AOS classes.
      frame1 = window.requestAnimationFrame(() => {
        frame2 = window.requestAnimationFrame(() => {
          startDelay = window.setTimeout(() => {
            if (cancelled) return;
            document.dispatchEvent(new Event("kashf:aos-start"));
            aosReady.current = true;
            Aos.refreshHard();
          }, 0);
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
      if (startDelay) clearTimeout(startDelay);
    };
  }, []);

  // Trigger AOS refresh when the user navigates between pages
  useEffect(() => {
    if (!aosReady.current) return;

    Aos.refresh();

    // In highly dynamic pages (like home_3), Swiper carousels and Next.js Image
    // components take a fraction of a second to fully render their true heights.
    // If AOS calculates the triggers before this, bottom sections get stuck hidden.
    const timeout = setTimeout(() => {
      Aos.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <Provider store={store}>{children}</Provider>;
}
