"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Filter = "all" | "web" | "news" | "research";
type SearchState = "ready" | "loading" | "offline" | "error";

const examples = [
  "What is changing in open source AI?",
  "Which AI models can run locally?",
  "How do open model licenses compare?",
  "Recent discoveries in deep ocean science",
  "How passkeys improve account security",
];

const sources = [
  { type: "research", badge: "HF", tone: "violet", publisher: "Hugging Face", meta: "Research", match: 96, title: "Open models are becoming smaller, faster, and more specialized", url: "https://huggingface.co/models", summary: "Teams are shifting from one general-purpose model toward compact systems tuned for a domain, device, or workflow—with lower inference costs.", tags: ["Open weights", "Efficiency", "Edge AI"] },
  { type: "news", badge: "MIT", tone: "coral", publisher: "MIT Technology Review", meta: "Analysis", match: 91, title: "The open ecosystem is moving beyond model releases", url: "https://www.technologyreview.com/topic/artificial-intelligence/", summary: "New tooling now focuses on evaluation, provenance, deployment, and the difficult work of making models dependable in production.", tags: ["Infrastructure", "Evaluation"] },
  { type: "web", badge: "GH", tone: "green", publisher: "GitHub", meta: "Trending", match: 88, title: "Local inference projects are drawing sustained developer interest", url: "https://github.com/trending", summary: "Projects centered on portable runtimes, quantization, and private on-device assistants continue to gain contributors.", tags: ["Local-first", "Developer tools"] },
  { type: "research", badge: "PA", tone: "blue", publisher: "Papers with Code", meta: "Benchmarks", match: 84, title: "Reproducible evaluation is becoming core model infrastructure", url: "https://paperswithcode.com/", summary: "Public benchmarks and evaluation harnesses help teams compare model quality, cost, and tradeoffs across deployment targets.", tags: ["Benchmarks", "Provenance"] },
  { type: "web", badge: "OW", tone: "amber", publisher: "Open Source Initiative", meta: "Licensing", match: 80, title: "Open model licensing requires more precise language", url: "https://opensource.org/ai", summary: "Code, weights, data, and usage terms can carry different permissions. Comparing them separately avoids misleading claims.", tags: ["Licensing", "Governance"] },
] as const;

function useTypingDemo(inputRef: React.RefObject<HTMLInputElement | null>, stopped: boolean) {
  useEffect(() => {
    if (stopped || !inputRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = true;
    let timer = 0;
    let example = 0;
    let position = 0;
    let deleting = false;

    const tick = () => {
      const input = inputRef.current;
      if (!active || !input) return;
      const target = examples[example];
      position += deleting ? -1 : 1;
      input.value = target.slice(0, position);
      input.setAttribute("data-demo-value", input.value);
      if (!deleting && position === target.length) {
        deleting = true;
        timer = window.setTimeout(tick, 1500);
      } else if (deleting && position === 0) {
        deleting = false;
        example = (example + 1) % examples.length;
        timer = window.setTimeout(tick, 420);
      } else {
        const delay = deleting ? 24 + Math.random() * 28 : 48 + Math.random() * 88;
        timer = window.setTimeout(tick, delay);
      }
    };
    inputRef.current.value = "";
    timer = window.setTimeout(tick, 500);
    return () => { active = false; window.clearTimeout(timer); };
  }, [inputRef, stopped]);
}

export function SearchExperience() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("What is changing in open source AI?");
  const [draft, setDraft] = useState("");
  const [demoStopped, setDemoStopped] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [state, setState] = useState<SearchState>("ready");
  const [expanded, setExpanded] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [tuneOpen, setTuneOpen] = useState(false);
  const [recentOnly, setRecentOnly] = useState(false);
  const stopDemo = () => setDemoStopped(true);
  useTypingDemo(inputRef, demoStopped);

  useEffect(() => {
    const offline = () => setState("offline");
    const online = () => setState(current => current === "offline" ? "ready" : current);
    const externalQuery = (event: Event) => runSearch((event as CustomEvent<string>).detail);
    window.addEventListener("offline", offline);
    window.addEventListener("online", online);
    window.addEventListener("vassago-query", externalQuery);
    return () => { window.removeEventListener("offline", offline); window.removeEventListener("online", online); window.removeEventListener("vassago-query", externalQuery); };
    // runSearch intentionally resolves at event time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); stopDemo(); inputRef.current?.focus(); inputRef.current?.select();
      }
      if (event.key === "Escape") { setSuggestionsOpen(false); setTuneOpen(false); }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  const matches = useMemo(() => {
    const needle = draft.toLowerCase().trim();
    return needle ? examples.filter(item => item.toLowerCase().includes(needle)).slice(0, 4) : [];
  }, [draft]);
  const filtered = sources.filter(source => filter === "all" || source.type === filter);
  const shown = expanded ? filtered : filtered.slice(0, 3);

  function flash(message: string) {
    setToast(message); window.setTimeout(() => setToast(""), 2400);
  }

  function runSearch(value?: string) {
    stopDemo();
    const next = (value ?? inputRef.current?.value ?? "").trim();
    if (!next) { setState("error"); return; }
    if (!navigator.onLine) { setState("offline"); return; }
    setDraft(next); if (inputRef.current) inputRef.current.value = next;
    setSuggestionsOpen(false); setState("loading");
    document.querySelector("#results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => { setQuery(next); setState("ready"); flash("Curated preview refreshed"); }, 650);
  }

  function submit(event: FormEvent) { event.preventDefault(); runSearch(); }

  async function copyAnswer() {
    try { await navigator.clipboard.writeText(document.querySelector("#answer-content")?.textContent ?? ""); flash("Answer copied"); }
    catch { flash("Copy is unavailable in this browser"); }
  }

  return (
    <>
      <section className="hero" id="search">
        <div className="eyebrow"><span /> Intelligence, with its sources intact</div>
        <h1>Search deeper.<br /><em>See the whole picture.</em></h1>
        <p className="hero-copy">Vassago connects the strongest sources, surfaces the context between them, and gives you a clear path forward.</p>
        <form className="search-shell" role="search" onSubmit={submit}>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="query">Search the web</label>
          <input id="query" ref={inputRef} role="combobox" autoComplete="off" defaultValue="What is changing in open source AI?" placeholder="Ask anything, or paste a URL…" onFocus={stopDemo} onPointerDown={stopDemo} onPaste={stopDemo} onChange={event => { stopDemo(); setDraft(event.target.value); setSuggestionsOpen(true); }} aria-autocomplete="list" aria-expanded={suggestionsOpen && matches.length > 0} aria-controls="search-suggestions" />
          <kbd>⌘ K</kbd>
          <button type="submit" aria-label="Run search">→</button>
          <div className={`suggestions ${suggestionsOpen && matches.length ? "open" : ""}`} id="search-suggestions" role="listbox" aria-label="Search suggestions">
            {matches.map(item => <button key={item} type="button" role="option" aria-selected="false" onClick={() => runSearch(item)}>{item}</button>)}
          </div>
        </form>
        <div className="query-chips" aria-label="Example searches"><span>Try</span>
          <button onClick={() => runSearch("The future of private AI")}>Private AI</button>
          <button onClick={() => runSearch("Recent discoveries in deep ocean science")}>Deep ocean science</button>
          <button onClick={() => runSearch("How passkeys improve account security")}>Passkey security</button>
        </div>
      </section>

      <section className="results-section" id="results" aria-live="polite" aria-busy={state === "loading"}>
        <div className="preview-banner"><span>PREVIEW DATA</span> Search synthesis is interactive, but uses a curated local dataset until the isolated search service is connected.</div>
        <div className="results-head">
          <div><span className="section-kicker">DEEP SEARCH</span><h2>{query}</h2></div>
          <div className="search-meta"><span className="pulse-dot" /><span>{state === "loading" ? "Scanning preview sources…" : `${sources.length} sample sources analyzed`}</span><span>•</span><span>Local demo</span></div>
        </div>

        {state === "offline" && <div className="state-card"><strong>You’re offline.</strong><p>The sample content remains visible, but a new search cannot be started.</p><button onClick={() => navigator.onLine ? runSearch() : flash("Still offline")}>Retry</button></div>}
        {state === "error" && <div className="state-card"><strong>Enter a question to search.</strong><p>The search field is empty. Try an example or type your own question.</p><button onClick={() => { setState("ready"); inputRef.current?.focus(); }}>Back to search</button></div>}

        <div className="filter-row" role="tablist" aria-label="Result filters">
          {(["all", "web", "news", "research"] as Filter[]).map(item => <button key={item} className={`filter ${filter === item ? "active" : ""}`} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
          <span className="filter-spacer" />
          <button className="view-control" aria-expanded={tuneOpen} onClick={() => setTuneOpen(value => !value)}>Tune <span>⌁</span></button>
          {tuneOpen && <div className="tune-panel"><strong>Result preferences</strong><label><input type="checkbox" checked={recentOnly} onChange={event => setRecentOnly(event.target.checked)} /> Prefer recent sources</label><small>Saved for this preview session.</small></div>}
        </div>

        <div className={`results-grid ${state === "loading" ? "is-loading" : ""}`}>
          <div className="source-column">
            {shown.length ? shown.map(source => (
              <article className="result-card" key={source.title}>
                <div className="source-line"><span className={`source-icon ${source.tone}`}>{source.badge}</span><span>{source.publisher}</span><span>•</span><span>{recentOnly ? "Recent" : source.meta}</span><span className="relevance">{source.match}% match</span></div>
                <h3><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></h3>
                <p>{source.summary}</p><div className="tags">{source.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            )) : <div className="state-card"><strong>No sources match this filter.</strong><p>Choose “All” to restore the preview results.</p><button onClick={() => setFilter("all")}>Show all</button></div>}
            {filtered.length > 3 && <button className="more-results" onClick={() => setExpanded(value => !value)}>{expanded ? "Show fewer sources ↑" : `Show ${filtered.length - 3} more sources ↓`}</button>}
          </div>

          <aside className="answer-panel" aria-label="Vassago answer">
            <div className="answer-top"><div className="oracle-mark"><span /></div><div><span>VASSAGO ANSWER · SAMPLE</span><small>Example content does not regenerate in this preview</small></div><button className="copy-button" onClick={copyAnswer} aria-label="Copy answer">▣</button></div>
            <div className="answer-content" id="answer-content">
              <p>Open source AI is entering a <strong>practical infrastructure phase</strong>. The story is no longer only about releasing larger models; it is about making capable models cheaper, auditable, and useful in specific environments.<sup>1</sup></p>
              <h4>Three shifts matter most</h4>
              <ul><li><strong>Smaller, specialized models</strong> are closing the quality gap for focused tasks while reducing compute and latency.<sup>1,2</sup></li><li><strong>Local-first deployment</strong> is improving privacy and giving teams more control over sensitive workflows.<sup>3</sup></li><li><strong>Evaluation is becoming infrastructure.</strong> Reproducible benchmarks and provenance now matter as much as raw capability.<sup>2,4</sup></li></ul>
              <div className="answer-note"><span>⌁</span><p><strong>The useful distinction:</strong> “Open” can describe code, model weights, training data, or licensing. Compare those dimensions separately.</p></div>
            </div>
            <div className="follow-ups"><span>DIG DEEPER</span>{["Which models can run locally?", "Compare open model licenses", "What are the privacy tradeoffs?"].map(item => <button key={item} onClick={() => runSearch(item)}>{item}<i>→</i></button>)}</div>
            <div className="answer-footer"><span>Was this useful?</span><button className={feedback === "up" ? "selected" : ""} aria-label="Helpful" onClick={() => { setFeedback("up"); flash("Feedback saved in this browser session"); }}>↑</button><button className={feedback === "down" ? "selected" : ""} aria-label="Not helpful" onClick={() => { setFeedback("down"); flash("Feedback saved in this browser session"); }}>↓</button><span className="answer-status"><i /> Preview sources cross-checked</span></div>
          </aside>
        </div>
      </section>
      <div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div>
    </>
  );
}
