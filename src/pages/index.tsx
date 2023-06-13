import styles from "../styles/Page.module.scss";

import { KeywordRadioBtnGroup } from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";

import { ModeToggleBtn } from "@/components/ModeToggleBtn/ModeToggleBtn";

import { Logo } from "@/components/Logo/Logo";

import { Searchbar } from "@/components/Searchbar/Searchbar";

export default function Home() {
  return (
    <>
      <section>
        <ModeToggleBtn />
      </section>
      <header>
        <Logo />
      </header>
      <main>
        <form className={styles.search}>
          <Searchbar />
          <fieldset>
            <KeywordRadioBtnGroup />
          </fieldset>
        </form>
      </main>
    </>
  );
}
