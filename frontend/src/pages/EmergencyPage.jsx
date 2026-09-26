import Call from "../components/Call";
import { warningSigns } from "../firstAidData";

export default function EmergencyPage() {
  return (
    <div className="narrow">
      <ul className="warning-grid">
        {warningSigns.map((s) => (
          <li key={s}>
            <span aria-hidden="true">!</span>
            {s}
          </li>
        ))}
      </ul>
      <section className="panel danger-panel">
        <h2>Yes / It may be an emergency</h2>
        <Call />
      </section>
      <section className="panel">
        <h2>No signs listed, but need advice?</h2>
        <p>
          If this may be an emergency, call 111. This list does not cover every
          emergency.
        </p>
        <Call type="health" />
      </section>
      <a className="browse" href="#topics">
        Browse first-aid topics →
      </a>
    </div>
  );
}
