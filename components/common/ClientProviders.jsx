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
    let startDelay;

    const initDelay = window.setTimeout(() => {
      Aos.init({
        duration: 1200,
        once: true,
        startEvent: "aos:hydrate-ready",
      });

      // Defer AOS class mutations until after hydration finishes.
      startDelay = window.setTimeout(() => {
        document.dispatchEvent(new Event("aos:hydrate-ready"));
        aosReady.current = true;
      }, 250);
    }, 0);

    return () => {
      clearTimeout(initDelay);
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
