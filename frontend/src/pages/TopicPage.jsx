import Call from "../components/Call";
import List from "../components/List";

export default function TopicPage({ topic }) {
  return (
    <div className="detail-layout">
      <article>
        <section className="panel danger-panel">
          <h2>Call 111 if</h2>
          <List items={topic.emergency} />
          <Call />
        </section>
        {topic.poison && (
          <section className="panel">
            <h2>Call for poisoning advice</h2>
            <Call type="poison" />
          </section>
        )}
        <section className="panel">
          <h2>Do this now</h2>
          <List items={topic.steps} ordered />
        </section>
        {topic.avoid && (
          <section className="panel caution">
            <h2>Do not</h2>
            <List items={topic.avoid} />
          </section>
        )}
        {topic.care && (
          <section className="panel">
            <h2>Seek medical care</h2>
            <List items={topic.care} />
          </section>
        )}
        <p className="source">
          Further guidance:{" "}
          <a href={topic.source} target="_blank" rel="noreferrer">
            {topic.poison
              ? "National Poisons Centre"
              : topic.id === "puncture"
                ? "Healthify"
                : "Hato Hone St John"}{" "}
            ↗
          </a>
        </p>
      </article>
      <aside>
        <section className="panel">
          <h2>Not an emergency?</h2>
          <Call type="health" />
          <p className="compact-note">Free health advice · 24/7</p>
        </section>
      </aside>
    </div>
  );
}
