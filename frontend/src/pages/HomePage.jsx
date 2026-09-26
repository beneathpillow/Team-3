import Card from "../components/Card";

export default function HomePage() {
  return (
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
  );
}
