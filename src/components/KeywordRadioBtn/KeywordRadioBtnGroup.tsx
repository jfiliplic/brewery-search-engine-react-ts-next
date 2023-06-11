"use client";

import { useState } from "react";

import styles from "./KeywordRadioBtnGroup.module.scss";

export function KeywordRadioBtnGroup() {
  const [keyword, setKeyword] = useState("name");
  // const onOptionChange = ({ e }: { e: ChangeEvent }) => {
  //   const element = e.target as HTMLInputElement;
  //   setKeyword(element.value);
  console.log(keyword);
  const onOptionChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  return (
    <div className="radioGroupWrapper">
      <div className="radioWrapper">
        <input
          type="radio"
          id="name"
          value="name"
          name="keyword"
          checked={keyword === "name"}
          onChange={onOptionChange}
        />
        <label htmlFor="name">name</label>
      </div>
      <div className="radioWrapper">
        <input
          type="radio"
          id="city"
          value="city"
          name="keyword"
          checked={keyword === "city"}
          onChange={onOptionChange}
        />
        <label htmlFor="city">city</label>
      </div>
      <div className="radioWrapper">
        <input
          type="radio"
          id="country"
          value="country"
          name="keyword"
          checked={keyword === "country"}
          onChange={onOptionChange}
        />
        <label htmlFor="country">country</label>
      </div>
      <div className="radioWrapper">
        <input
          type="radio"
          id="any"
          value="any"
          name="keyword"
          checked={keyword === "any"}
          onChange={onOptionChange}
        />
        <label htmlFor="any">any keyword</label>
      </div>
    </div>
  );
}
