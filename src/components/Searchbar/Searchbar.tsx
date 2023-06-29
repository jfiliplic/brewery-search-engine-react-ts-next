import styles from "./Searchbar.module.scss";
import { useCallback } from "react";

export function Searchbar({
  query,
  setQuery,
  setShouldShowEmpty,
}: {
  query: string;
  setQuery: any;
  setShouldShowEmpty: any;
}) {
  const onTextEnter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (!query) {
        setShouldShowEmpty(true); // clearing search form after previous search rerenders result section (no alert msg when form is emptied and on reentering letters/txt)
      }
    },
    [query, setQuery, setShouldShowEmpty]
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
