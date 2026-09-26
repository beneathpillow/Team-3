import List from "../components/List";

export default function AboutPage() {
  return (
    <div className="narrow">
      <section className="panel">
        <h2>Research</h2>
        <p>
          This student prototype draws on New Zealand emergency, first-aid and
          telephone advice resources. It is for people with little first-aid
          knowledge who may be injured, stressed or helping someone else.
        </p>
        <p>
          Short instructions, large controls and three clear entry points reduce
          reading and typing.
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
          Sources consulted: 26 September 2026. This project is not endorsed or
          clinically reviewed by these organisations.
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
  );
}
