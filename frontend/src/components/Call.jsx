import Icon from "./Icon";
export default function Call({ type = "emergency" }) {
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
