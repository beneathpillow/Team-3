import Icon from "./Icon";

export default function Header() {
  return (
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
      <a href="#helpcentre">Find healthcare Centre</a>
    </header>
  );
}
