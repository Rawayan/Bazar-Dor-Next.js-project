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
      <span className="text-xs text-[var(--muted)]">
        আজকের তারিখ{" "}
      </span>
    );
  }

  return (
    <span className="text-xs text-[var(--muted)]">{date} </span>
  );
}
