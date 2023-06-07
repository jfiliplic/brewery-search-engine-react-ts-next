import Image from "next/image";
import logo from "../assets/logo.png";
import styles from "./page.module.scss";

export { ModeToggleButton, Logo, Searchbar, KeywordRadioBtn };

const ModeToggleButton = () => {
  return (
    <label htmlFor="toggle" className="styles.toggle">
      <input type="checkbox" id="toggle" className="styles.toggle-input" />
      <span className="styles.toggle-button"></span>
    </label>
  );
};

const LogoImage = () => {
  return (
    <Image
      src={logo}
      alt="a couple of beer glasses"
      width={1200}
      height={1200}
    />
  );
};

const Logo = () => {
  return (
    <>
      <LogoImage />
      <h1>BeerBeerGO!</h1>
      <h3>Your local brewery search engine</h3>
    </>
  );
};

const Searchbar = () => {
  return (
    <>
      <label htmlFor="searchbar"></label>
      <input
        type="search"
        className="styles.searchbar"
        name="searchbar"
        placeholder="Search by:"
        autoComplete="off"
        spellCheck="false"
      />
    </>
  );
};

function KeywordRadioBtn({ id, value }) {
  return (
    <>
      <input type="radio" id={id} value={value} name="keyword" />
    </>
  );
}
