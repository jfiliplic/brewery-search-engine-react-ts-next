"use client";

import { useState } from "react";

import styles from "./KeywordRadioBtnGroup.module.scss";

function RadioBtn({
  value,
  onChange,
  selected,
}: {
  value: string;
  onChange: Function;
  selected: string;
}) {
  return (
    <div className={styles.radioWrapper}>
      <input
        type="radio"
        id={value}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export function KeywordRadioBtnGroup() {
  const [keyword, setKeyword] = useState("name");

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.radioGroupWrapper}>
      {["name", "city", "country", "any"].map((value) => (
        <RadioBtn
          key={value}
          value={value}
          onChange={onOptionChange}
          selected={keyword}
        />
      ))}
    </div>
  );
}
