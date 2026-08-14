"use client";

import { useState, useEffect } from "react";

export function useClock(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
