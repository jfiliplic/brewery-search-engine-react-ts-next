import styles from "./ModeToggleBtn.module.scss";

export const ModeToggleBtn = () => {
  return (
    <>
      <label htmlFor="toggle" className={styles.toggle}>
        <input type="checkbox" id="toggle" className={styles.toggleInput} />
        <span className={styles.toggleButton}></span>
      </label>
    </>
  );
};
