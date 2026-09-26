import { useEffect, useRef, useState } from "react";
import "./index.css";
import { topics } from "./firstAidData";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import UnsurePage from "./pages/UnsurePage";
import EmergencyPage from "./pages/EmergencyPage";
import TopicPage from "./pages/TopicPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HealthcareCentersPage from "./pages/Helpcentre";

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
              : route === "helpcentre"
                ? "Find healthcare"
                 : topic
                  ? topic.title
                    : "Page not found";
  return (
    <div className="site">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Header />
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
        {route === "home" && <HomePage />}
        {route === "topics" && <TopicsPage />}
        {route === "unsure" && <UnsurePage />}
        {route === "emergency" && <EmergencyPage />}
        {topic && <TopicPage topic={topic} />}
        {route === "about" && <AboutPage />}
        {route === "helpcentre" && <HealthcareCentersPage />}
        
        {!["home", "topics", "unsure", "emergency", "about"].includes(route) &&
          !topic && (
            <p className="below">
              <a href="#home">Return to the home page</a>
            </p>
          )}
      </main>
      <Footer />
    </div>
  );
}
