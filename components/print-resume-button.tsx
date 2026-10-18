"use client";

import { Printer } from "./icons";

export function PrintResumeButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      type="button"
      className="button button--primary print-button"
      onClick={handlePrint}
      aria-label="Print / Save as PDF"
    >
      <Printer size={16} />
      <span>Print / Save as PDF</span>
    </button>
  );
}
