"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/date";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getBanglaDate());
  }, []);

  if (!date) {
    return (
      <span className="hidden text-xs text-[var(--muted)] md:block">
        আজকের তারিখ{" "}
      </span>
    );
  }

  return (
    <span className="hidden text-xs text-[var(--muted)] md:block">{date} </span>
  );
}
