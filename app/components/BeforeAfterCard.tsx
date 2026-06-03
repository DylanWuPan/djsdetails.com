"use client";

import { useState } from "react";
import Image from "next/image";

interface BeforeAfter {
  id: number;
  label: string;
  before: string;
  after: string;
}

export default function BeforeAfterCard({ item }: { item: BeforeAfter }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      className="ba-card"
      type="button"
      onClick={() => setRevealed((r) => !r)}
      aria-label={`Show ${revealed ? "before" : "after"} photo for ${item.label}`}
    >
      <div className={`ba-slider ${revealed ? "revealed" : ""}`}>
        <Image
          src={item.before}
          alt={`Before mobile auto detailing: ${item.label}`}
          className="ba-img ba-before"
          height={2000}
          width={2000}
        />
        <Image
          src={item.after}
          alt={`After mobile auto detailing: ${item.label}`}
          className="ba-img ba-after"
          height={2000}
          width={2000}
        />
        <div className="ba-divider">
          <span className="ba-pill">{revealed ? "AFTER" : "BEFORE"}</span>
        </div>
      </div>
      <div className="ba-meta">
        <span className="ba-title">{item.label}</span>
        <span className="ba-cta">
          {revealed ? "See before" : "Tap to reveal after"}
        </span>
      </div>
    </button>
  );
}
