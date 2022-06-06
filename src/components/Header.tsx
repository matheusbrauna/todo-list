import Logo from "../assets/logo.svg";

export function Header() {
  return (
    <header>
      <div className="wrapper">
        < img src={Logo} alt="Logotipo" className="logo" />
      </div>
    </header >
  )
}