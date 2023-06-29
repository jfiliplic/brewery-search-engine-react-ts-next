import styles from "./Searchbar.module.scss";
import { useCallback } from "react";

export function Searchbar({
  query,
  setQuery,
  setQueryResults,
  setShouldShowEmpty,
}: {
  query: string;
  setQuery: any;
  setQueryResults: any;
  setShouldShowEmpty: any;
}) {
  const onTextEnter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (!query) {
        setQueryResults([]); // dodal pri ver2 - če prvi search vrne rezultate in zbrišeš formo ter pritisneš Enter, ponovno renderira result section in jo prikaže prazno
        setShouldShowEmpty(true); // clearing search form after previous search rerenders result section (no alert msg when form is emptied and on reentering letters/txt) ver2 - če to odstranim, potem če 1.search prazen in 2. search z rezultati, ko zbrišem formo in začnem tipkati, prikaže msg alert no match
      }
    },
    [query, setQuery, setQueryResults, setShouldShowEmpty]
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
