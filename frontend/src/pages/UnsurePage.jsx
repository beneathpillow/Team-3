import Call from "../components/Call";

export default function UnsurePage() {
  return (
    <div className="narrow">
      <section className="panel danger-panel">
        <h2>Check for emergency signs</h2>
        <p>Trouble breathing, hard to wake, or bleeding that won’t stop?</p>
        <Call />
        <a className="text-link" href="#emergency">
          See all warning signs →
        </a>
        <p className="compact-note">
          If this may be an emergency, call 111 now.
        </p>
      </section>
      <section className="panel">
        <h2>No emergency signs, but need help?</h2>
        <Call type="health" />
        <p className="compact-note">Free health advice · 24/7</p>
      </section>
      <a className="browse" href="#topics">
        Browse first-aid topics →
      </a>
    </div>
  );
}
