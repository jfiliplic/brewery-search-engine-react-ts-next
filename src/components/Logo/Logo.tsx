import Image from "next/image";
import logo from "../../assets/logo.png";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image
        className={styles.logoImg}
        src={logo}
        alt="a couple of beer glasses"
        width={1200}
        height={1200}
      />
      <h1 className={styles.engineName}>BeerBeerGO!</h1>
      <h3 className={styles.engineSlogan}>Your local brewery search engine</h3>
    </div>
  );
};
