"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";

export function Header() {
  const [light, setLight] = useState(false);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vassago-theme") === "light";
    document.documentElement.dataset.theme = saved ? "light" : "dark";
    const frame = window.requestAnimationFrame(() => setLight(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem("vassago-theme", next ? "light" : "dark");
  }

  return (
    <header className="site-header">
      <a href="#main" aria-label="Vassago home"><Brand labs /></a>
      <nav aria-label="Primary navigation">
        <a className="active" href="#search">Search</a>
        <a href="#discover">Discover</a>
        <a href="#about">About</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={toggleTheme} aria-label={`Use ${light ? "dark" : "light"} theme`} aria-pressed={light}>
          {light ? "☾" : "☼"}
        </button>
        <button className="access-button" onClick={() => setNotice(true)}>Request access <span>↗</span></button>
      </div>
      {notice && (
        <div className="notice-dialog" role="dialog" aria-modal="true" aria-labelledby="access-title">
          <button className="dialog-scrim" aria-label="Close dialog" onClick={() => setNotice(false)} />
          <div className="dialog-card">
            <span className="section-kicker">PREVIEW PROGRAM</span>
            <h2 id="access-title">Access requests aren’t open yet.</h2>
            <p>This public build is a design and interaction preview. The production signup service is intentionally not connected.</p>
            <button onClick={() => setNotice(false)}>Got it</button>
          </div>
        </div>
      )}
    </header>
  );
}
