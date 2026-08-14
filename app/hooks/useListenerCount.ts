"use client";

import { useState, useEffect } from "react";

export function useListenerCount(): number {
  const [count, setCount] = useState(1247);

  useEffect(() => {
    function tick() {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return Math.max(800, Math.min(1800, prev + delta));
      });
    }

    // Random interval between 5–15 seconds
    let timeout: ReturnType<typeof setTimeout>;
    function schedule() {
      const delay = 5000 + Math.random() * 10000;
      timeout = setTimeout(() => {
        tick();
        schedule();
      }, delay);
    }

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return count;
}
