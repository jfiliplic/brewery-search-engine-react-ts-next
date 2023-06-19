import styles from "../styles/Page.module.scss";
import { KeywordRadioBtnGroup } from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { ModeToggleBtn } from "@/components/ModeToggleBtn/ModeToggleBtn";
import { Logo } from "@/components/Logo/Logo";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { useState, useCallback } from "react";

export default function Home() {
  const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
  const [keyword, setKeyword] = useState("name");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const onSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(text);
      if (!submitted) {
        return;
      } else {
        fetchData(submitted);
        setText("");
      }
    },
    [text, submitted, fetchData]
  );
  console.log(keyword, text, submitted);
  console.log(submitted);

  async function fetchData(submitted: string) {
    const breweriesData = await handleKeywords(submitted);
    console.log(breweriesData);
    if (!(breweriesData.length > 0)) {
      console.log("no data");
      return;
    } else {
      console.log("your results");
    }
  }

  async function handleKeywords(submitted: string) {
    if (keyword === "country") {
      return searchByCountry(submitted);
    } else if (keyword === "any") {
      return searchByAny(submitted);
    } else return searchByNameOrCity(submitted, keyword);
  }

  async function searchByCountry(submitted: string) {
    const capitalizedQuery = capitalizeFirstLetter(submitted);
    const responseCountry = await fetch(
      `${baseEndpoint}/search?query={${capitalizedQuery}}&per_page=200`
    );
    const unfilteredData = await responseCountry.json();
    const dataCountry = [];
    for (const breweryData of unfilteredData) {
      if (breweryData.country === capitalizedQuery) {
        dataCountry.push(breweryData);
      }
    }
    return dataCountry;
  }

  async function searchByAny(submitted: string) {
    const responseAny = await fetch(
      `${baseEndpoint}/search?query={${submitted}}&per_page=200`
    );
    const dataAny = await responseAny.json();
    return dataAny;
  }

  async function searchByNameOrCity(submitted: String, keyword: string) {
    const responseNameOrCity = await fetch(
      `${baseEndpoint}?by_${keyword}=${submitted}&per_page=200`
    );
    const dataNameOrCity = await responseNameOrCity.json();
    return dataNameOrCity;
  }

  function capitalizeFirstLetter(submitted: string) {
    const words = submitted.split(" ");
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
      })
      .join(" ");
  }

  return (
    <>
      <section>
        <ModeToggleBtn />
      </section>
      <header>
        <Logo />
      </header>
      <main>
        <form className={styles.search} onSubmit={onSearchbarSubmit}>
          <Searchbar text={text} setText={setText} />
          <KeywordRadioBtnGroup keyword={keyword} setKeyword={setKeyword} />
        </form>
      </main>
    </>
  );
}
