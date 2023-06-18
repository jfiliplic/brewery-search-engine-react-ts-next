import styles from "./Searchbar.module.scss";

export function Searchbar({ text, setText }: { text: string; setText: any }) {
  const onTextEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

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
