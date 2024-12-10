import BootiqLogo from "../assets/bootiq-logo.svg";

function Header() {
  return (
    <header>
      <img src={BootiqLogo} width={155} height={77} />
      <nav>
        <a href="/landing">Spustit kvíz</a>
        <a href="/teams">Týmy</a>
      </nav>
    </header>
  );
}

export default Header;
