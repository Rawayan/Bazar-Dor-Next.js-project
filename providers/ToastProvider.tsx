"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
<Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
  );
}