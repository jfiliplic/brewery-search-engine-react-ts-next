import Image from "next/image";
import logo from "../assets/logo.png";
import styles from "./page.module.scss";

export { ModeToggleButton, Logo, Searchbar, KeywordRadioBtn };

const ModeToggleButton = () => {
  return (
    <div className={styles.themeToggle}>
      <label htmlFor="toggle" className={styles.toggle}>
        <input type="checkbox" id="toggle" className={styles.toggleInput} />
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
};

const LogoImage = () => {
  return (
    <Image
      className={styles.logoImg}
      src={logo}
      alt="a couple of beer glasses"
      width={1200}
      height={1200}
    />
  );
};

const Logo = () => {
  return (
    <div className={styles.logo}>
      <LogoImage />
      <h1 className={styles.engineName}>BeerBeerGO!</h1>
      <h3 className={styles.engineSlogan}>Your local brewery search engine</h3>
    </div>
  );
};

const Searchbar = () => {
  return (
    <>
      <label htmlFor="searchbar"></label>
      <input
        type="search"
        className={styles.searchbar}
        name="searchbar"
        placeholder="Search by:"
        autoComplete="off"
        spellCheck="false"
      />
    </>
  );
};

function KeywordRadioBtn({ id, value }: { id: string; value: string }) {
  return (
    <>
      <input type="radio" id={id} value={value} name="keyword" />
    </>
  );
}
