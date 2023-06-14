import styles from "./Searchbar.module.scss";

export const Searchbar = () => {
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
      />
    </>
  );
};
