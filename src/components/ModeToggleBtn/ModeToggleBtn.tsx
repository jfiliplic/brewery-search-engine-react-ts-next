import styles from "./ModeToggleBtn.module.scss";

export const ModeToggleBtn = () => {
  return (
    <div className={styles.themeToggle}>
      <label htmlFor="toggle" className={styles.toggle}>
        <input type="checkbox" id="toggle" className={styles.toggleInput} />
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
};
