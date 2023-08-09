import styles from "./ModeToggleBtn.module.scss";
import { useCallback, useState, useEffect } from "react";

export const ModeToggleBtn = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("prefersDarkMode");
    if (storedPreference) {
      setIsDark(JSON.parse(storedPreference));
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("prefersDarkMode", "true");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("prefersDarkMode", "false");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const handleModeToggleBtn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsDark(e.target.checked);
    },
    []
  );

  return (
    <>
      <label htmlFor="toggle" className={styles.toggle}>
        <input
          type="checkbox"
          id="toggle"
          className={styles.toggleInput}
          checked={isDark} //??
          onChange={handleModeToggleBtn}
        />
        <span className={styles.toggleButton}></span>
      </label>
    </>
  );
};
