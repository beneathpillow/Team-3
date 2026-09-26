import { useEffect, useRef, useState } from "react";
import "./index.css";
import { topics, warningSigns } from "./firstAidData";

function Icon({ name, size = 28 }) {
  const paths = {
    arrow: <path d="m9 5 7 7-7 7M4 12h12" />,
    bandage: (
      <>
        <rect
          x="3"
          y="7"
          width="18"
          height="10"
          rx="4"
          transform="rotate(-40 12 12)"
        />
        <path d="m10 10 4 4m-7-1h.01M17 11h.01" />
      </>
    ),
    phone: (
      <path d="m5 3 4 1 1 5-3 2c2 3 3 4 6 6l2-3 5 1 1 4c-1 5-8 2-12-2S0 4 5 3Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    burn: (
      <path d="M12 2c1 6-5 7-5 12 0 2 1 3 2 4-1-4 4-4 4-7 4 4 4 6 2 9 8-2 6-11 2-14 0 3-1 4-2 4 1-4-1-6-3-8Z" />
    ),
    drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    head: (
      <path d="M8 21v-5C0 10 7 0 15 4c4 2 3 5 6 8h-4v5h-4v4M8 8h4m-2-2v4" />
    ),
    bone: (
      <path d="M8 5c0-4-6-3-5 1-3 3 1 6 3 4l8 8c-2 3 2 6 4 3 4 1 5-5 1-5L10 7c1-3-1-4-2-2Z" />
    ),
    air: (
      <>
        <path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h6" />
      </>
    ),
    snow: (
      <>
        <path d="M12 2v20M3 7l18 10M3 17 21 7m-12-3 3 3 3-3m-6 16 3-3 3 3" />
      </>
    ),
    bottle: (
      <>
        <path d="M9 3h6M10 3v5l-5 9v4h14v-4l-5-9V3M7 16h10" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.help}
    </svg>
  );
}
function Call({ type = "emergency" }) {
  const data =
    type === "poison"
      ? ["0800764766", "Call Poisons Centre", "0800 764 766"]
      : type === "health"
        ? ["0800611116", "Call Healthline", "0800 611 116"]
        : ["111", "Call 111", "Ask for Ambulance"];
  return (
    <a className={`call ${type}`} href={`tel:${data[0]}`}>
      <Icon name="phone" />
      <span>
        <strong>{data[1]}</strong>
        <small>{data[2]}</small>
      </span>
      <span className="call-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
function List({ items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={ordered ? "steps" : "plain-list"}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Tag>
  );
}
function Card({ to, icon, title, description, variant = "" }) {
  return (
    <a className={`choice ${variant}`} href={`#${to}`}>
      <span className="icon-box">
        <Icon name={icon} />
      </span>
      <span className="choice-copy">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </span>
      <Icon name="arrow" />
    </a>
  );
}
export default function App() {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "home",
  );
  const heading = useRef(null);
  useEffect(() => {
    const change = () => setRoute(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
    document.title = "Are you hurt? | First-aid guidance";
  }, [route]);
  const topic = topics.find((t) => route === `topic/${t.id}`);
  const title =
    route === "home"
      ? "Are you hurt?"
      : route === "topics"
        ? "What happened?"
        : route === "unsure"
          ? "Not sure what happened?"
          : route === "emergency"
            ? "Should I call 111?"
            : route === "about"
              ? "About this project"
              : topic
                ? topic.title
                : "Page not found";
  return (
    <div className="site">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Icon name="bandage" size={23} />
          </span>
          First aid<span className="nz">NZ</span>
        </a>
        <a className="header-call" href="tel:111">
          <Icon name="phone" size={17} /> Emergency? Call 111
        </a>
      </header>
      <main id="content">
        {route !== "home" && (
          <a className="back" href={topic ? "#topics" : "#home"}>
            ← {topic ? "All first-aid topics" : "Back to home"}
          </a>
        )}
        <div className={`page-heading ${route === "home" ? "hero" : ""}`}>
          <h1 tabIndex="-1" ref={heading}>
            {title}
          </h1>
          {route === "topics" && <p>Choose one.</p>}
          {route === "emergency" && <p>Do you notice any of these?</p>}
        </div>
        {route === "home" && (
          <>
            <div className="home-choices">
              <Card
                to="topics"
                icon="bandage"
                title="I know what happened"
                variant="green"
              />
              <Card
                to="unsure"
                icon="help"
                title="I don’t know what happened"
                variant="cream"
              />
              <Card
                to="emergency"
                icon="phone"
                title="Should I call 111?"
                variant="red wide"
              />
            </div>
          </>
        )}
        {route === "topics" && (
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
        )}
        {route === "unsure" && (
          <div className="narrow">
            <section className="panel danger-panel">
              <h2>Check for emergency signs</h2>
              <p>
                Trouble breathing, hard to wake, or bleeding that won’t stop?
              </p>
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
        )}
        {route === "emergency" && (
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
                If this may be an emergency, call 111. This list does not cover
                every emergency.
              </p>
              <Call type="health" />
            </section>
            <a className="browse" href="#topics">
              Browse first-aid topics →
            </a>
          </div>
        )}
        {topic && (
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
        )}
        {route === "about" && (
          <div className="narrow">
            <section className="panel">
              <h2>Research</h2>
              <p>
                This student prototype draws on New Zealand emergency, first-aid
                and telephone advice resources. It is for people with little
                first-aid knowledge who may be injured, stressed or helping
                someone else.
              </p>
              <p>
                Short instructions, large controls and three clear entry points
                reduce reading and typing.
              </p>
              <ul>
                <li>
                  <a href="https://www.stjohn.org.nz/first-aid/first-aid-library/">
                    Hato Hone St John first-aid library
                  </a>
                </li>
                <li>
                  <a href="https://www.healthnz.govt.nz/online-phone-healthcare/healthline">
                    Health New Zealand: Healthline
                  </a>
                </li>
                <li>
                  <a href="https://poisons.co.nz/">National Poisons Centre</a>
                </li>
              </ul>
              <p>
                Sources consulted: 26 September 2026. This project is not
                endorsed or clinically reviewed by these organisations.
              </p>
            </section>
            <section className="panel">
              <h2>Plan</h2>
              <List
                ordered
                items={[
                  "Set up the project and GitHub repository.",
                  "Create the home page and three navigation routes.",
                  "Add nine first-aid topics and telephone links.",
                  "Apply a consistent, mobile-friendly design.",
                  "Test navigation, keyboard access and different screen sizes.",
                  "Review wording against official guidance; arrange qualified clinical review before public use.",
                ]}
              />
            </section>
          </div>
        )}
        {!["home", "topics", "unsure", "emergency", "about"].includes(route) &&
          !topic && (
            <p className="below">
              <a href="#home">Return to the home page</a>
            </p>
          )}
      </main>
      <footer>
        <div>
          <span>New Zealand · Student prototype</span>
          <a href="#about">Research & plan</a>
        </div>
        <p>
          Student prototype. General first-aid guidance only; not a substitute
          for professional medical advice. In a medical emergency in New
          Zealand, call 111 and ask for Ambulance.
        </p>
      </footer>
    </div>
  );
}
