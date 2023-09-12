import styles from "./Searchbar.module.scss";
import { useRouter } from "next/router";

export function SearchBar() {
  const { query } = useRouter();
  console.log(query.q);

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

