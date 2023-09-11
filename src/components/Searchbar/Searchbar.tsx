import styles from "./Searchbar.module.scss";
import { useCallback } from "react";
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
        value={query.q}
        spellCheck="false"
      />
    </>
  );
}

// export function SearchBar({ setQ }: { setQ: any }) {
//   const handleTextEnter = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setQ(e.target.value);
//     },
//     [setQ]
//   );

//   return (
//     <>
//       <label htmlFor="searchbar"></label>
//       <input
//         type="search"
//         className={styles.searchbar}
//         name="searchbar"
//         placeholder="Search by:"
//         autoComplete="off"
//         spellCheck="false"
//         onChange={handleTextEnter}
//       />
//     </>
//   );
// }
