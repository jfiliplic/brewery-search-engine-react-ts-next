import styles from "./Searchbar.module.scss";
import { useCallback } from "react";

export function SearchBar({ setQuery }: { setQuery: any }) {
  const handleTextEnter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
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
