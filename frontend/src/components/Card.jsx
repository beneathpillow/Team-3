import Icon from "./Icon";
export default function Card({ to, icon, title, description, variant = "" }) {
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
