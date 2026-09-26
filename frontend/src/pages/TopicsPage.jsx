import Icon from "../components/Icon";
import { topics } from "../firstAidData";

export default function TopicsPage() {
  return (
    <>
      <div className="topic-grid">
        {topics.map((t) => (
          <a href={`#topic/${t.id}`} className="topic-card" key={t.id}>
            <span className="icon-box">
              <Icon name={t.icon} />
            </span>
            <h2>{t.title}</h2>
            <span className="topic-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
      <p className="below">
        <a href="#unsure">Not sure? Get help →</a>
      </p>
    </>
  );
}
