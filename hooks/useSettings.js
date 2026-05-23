"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/settings";

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then((value) => {
      setSettings(value);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
