export function About() {
  return (
    <section className="about" id="about">
      <div><span className="section-kicker">THE PRINCIPLE</span><h2>Answers should show<br />their working.</h2></div>
      <div className="principles">
        <p>Vassago is designed around a simple contract: synthesis should make sources easier to inspect, not hide them.</p>
        <div><span>01</span><p><strong>Evidence first</strong>Every claim stays connected to a source.</p></div>
        <div><span>02</span><p><strong>Uncertainty visible</strong>Confidence and disagreement belong in the answer.</p></div>
        <div><span>03</span><p><strong>Context preserved</strong>Useful summaries should invite inspection, not replace it.</p></div>
      </div>
    </section>
  );
}
