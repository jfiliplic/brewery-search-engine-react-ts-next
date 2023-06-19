import styles from "../styles/Page.module.scss";
import { KeywordRadioBtnGroup } from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { ModeToggleBtn } from "@/components/ModeToggleBtn/ModeToggleBtn";
import { Logo } from "@/components/Logo/Logo";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { useState, useCallback } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("name");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const onSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(text);
      setText("");
    },
    [text, setText, setSubmitted]
  );

  return (
    <>
      <section>
        <ModeToggleBtn />
      </section>
      <header>
        <Logo />
      </header>
      <main>
        <form className={styles.search} onSubmit={onSearchbarSubmit}>
          <Searchbar text={text} setText={setText} />
          <KeywordRadioBtnGroup keyword={keyword} setKeyword={setKeyword} />
        </form>
      </main>
    </>
  );
}
