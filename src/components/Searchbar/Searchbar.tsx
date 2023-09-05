import styles from "./Searchbar.module.scss";
import { useCallback } from "react";

export function SearchBar({ setQ }: { setQ: any }) {
  const handleTextEnter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQ(e.target.value);
    },
    [setQ]
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
        onChange={handleTextEnter}
      />
    </>
  );
}
