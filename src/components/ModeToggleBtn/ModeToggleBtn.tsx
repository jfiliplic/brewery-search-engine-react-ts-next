import styles from "./ModeToggleBtn.module.scss";
import { useCallback, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const ModeToggleBtn = () => {
  // const root = document.querySelector(":root");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const handleToggleBtn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsDark(e.target.checked);
    },
    []
  );

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => {
      setIsDark(isSystemDark);
      setIsDark(true); //??
    }
  );

  // useEffect(() => {
  //   if (isDark) {
  //     root.setAttribute("dark", "");
  //   } else {
  //     root.removeAttribute("dark");
  //   }
  // }, [isDark, root]);

  return (
    <>
      <label htmlFor="toggle" className={styles.toggle}>
        <input
          type="checkbox"
          id="toggle"
          className={styles.toggleInput}
          checked={!isDark} //??
          onChange={handleToggleBtn}
        />
        <span className={styles.toggleButton}></span>
      </label>
    </>
  );
};
