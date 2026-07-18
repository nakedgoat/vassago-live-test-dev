"use client";

import { useState } from "react";
import { Brand } from "./Brand";

export function Footer() {
  const [message, setMessage] = useState("");
  function unavailable(label: string) {
    setMessage(`${label} is not connected in this preview.`);
    window.setTimeout(() => setMessage(""), 2600);
  }
  return (
    <>
      <footer>
        <a href="#main" aria-label="Back to top"><Brand /></a>
        <p>Search deeper. Understand more.</p>
        <div>
          <a href="#about">Principles</a>
          <button onClick={() => unavailable("Privacy details")}>Privacy</button>
          <button onClick={() => unavailable("Service status")}>Status</button>
          <span>Preview • 2026</span>
        </div>
      </footer>
      <div className={`toast ${message ? "show" : ""}`} role="status">{message}</div>
    </>
  );
}
