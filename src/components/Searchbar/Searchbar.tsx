import styles from "./Searchbar.module.scss";
import { useCallback } from "react";

export function Searchbar({ text, setText }: { text: string; setText: any }) {
  const onTextEnter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

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
        onChange={onTextEnter}
      />
    </>
  );
}
