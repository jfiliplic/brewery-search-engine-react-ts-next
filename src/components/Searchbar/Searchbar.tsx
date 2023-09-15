import styles from "./SearchBar.module.scss";
import { useRouter } from "next/router";

export function SearchBar() {
  const { query } = useRouter();

  return (
    <>
      <label htmlFor="searchbar"></label>
      <input
        type="search"
        className={styles.searchbar}
        name="searchbar"
        placeholder="Search by:"
        autoComplete="off"
        defaultValue={query.q || ""}
        spellCheck="false"
      />
    </>
  );
}

