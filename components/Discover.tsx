"use client";

import { useState } from "react";

const topicSets = [
  [
    ["ARTIFICIAL INTELLIGENCE", "The quiet race to make AI useful without the cloud", "Hardware, runtimes, and smaller models are converging around a private, local-first future.", "12 sources", "The future of private AI"],
    ["SECURITY", "Passkeys reach the awkward middle stage", "Adoption is growing, but recovery and cross-platform UX remain unsettled.", "8 sources", "How passkeys improve account security"],
    ["SCIENCE", "Mapping the deep ocean with autonomous systems", "Cheaper sensors are revealing how much of our own planet remains unknown.", "16 sources", "Recent discoveries in deep ocean science"],
  ],
  [
    ["ENERGY", "Small grids are becoming serious infrastructure", "Storage, forecasting, and flexible demand are reshaping local energy resilience.", "10 sources", "How microgrids improve energy resilience"],
    ["COMPUTING", "The browser is becoming a local AI runtime", "New APIs and compact models are moving useful inference closer to the user.", "14 sources", "AI models running inside web browsers"],
    ["CLIMATE", "Better forecasts meet harder decisions", "Regional climate models are improving while adaptation choices remain deeply local.", "11 sources", "Recent advances in regional climate forecasting"],
  ],
];

export function Discover() {
  const [set, setSet] = useState(0);
  const topics = topicSets[set];

  return (
    <section className="discover" id="discover">
      <div className="section-title-row">
        <div><span className="section-kicker">SIGNALS, NOT NOISE</span><h2>Worth understanding now</h2></div>
        <button onClick={() => setSet(value => (value + 1) % topicSets.length)}>Refresh topics <span>↻</span></button>
      </div>
      <div className="topic-grid" key={set}>
        {topics.map((topic, index) => (
          <article className={`topic-card ${index === 0 ? "featured" : ""}`} key={topic[1]}>
            <span className={`topic-label ${index === 1 ? "amber" : index === 2 ? "blue" : ""}`}>{topic[0]}</span>
            <h3>{topic[1]}</h3><p>{topic[2]}</p>
            <div><span>{topic[3]}</span><a href={`#search`} onClick={() => window.dispatchEvent(new CustomEvent("vassago-query", { detail: topic[4] }))}>Explore{index === 0 ? " topic" : ""} →</a></div>
          </article>
        ))}
      </div>
    </section>
  );
}
