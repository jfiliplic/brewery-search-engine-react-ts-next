import styles from "../styles/Page.module.scss";
import { KeywordRadioBtnGroup } from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { ModeToggleBtn } from "@/components/ModeToggleBtn/ModeToggleBtn";
import { Logo } from "@/components/Logo/Logo";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { useState, useCallback } from "react";

export default function Home() {
  // const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
  const [keyword, setKeyword] = useState("name");
  const [query, setQuery] = useState("");
  // const [submitted, setSubmitted] = useState("");

  // const searchByCountry = useCallback(
  //   async (submitted: string) => {
  //     const responseCountry = await fetch(
  //       `${baseEndpoint}/search?query=${query}&per_page=200`
  //     );
  //     const unfilteredData = await responseCountry.json();
  //     const dataCountry = [];
  //     for (const breweryData of unfilteredData) {
  //       if (breweryData.country.toLowerCase().includes(query.toLowerCase())) {
  //         dataCountry.push(breweryData);
  //       }
  //     }
  //     return dataCountry;
  //   },
  //   [query]
  // );

  // const searchByAny = useCallback(async (query: string) => {
  //   console.log(query);
  //   const responseAny = await fetch(
  //     `${baseEndpoint}/search?query=${query}&per_page=200`
  //   );
  //   const dataAny = await responseAny.json();
  //   return dataAny;
  // }, []);

  // const searchByNameOrCity = useCallback(
  //   async (submitted: String, keyword: string) => {
  //     const responseNameOrCity = await fetch(
  //       `${baseEndpoint}?by_${keyword}=${submitted}&per_page=200`
  //     );
  //     const dataNameOrCity = await responseNameOrCity.json();
  //     return dataNameOrCity;
  //   },
  //   []
  // );

  // const handleKeywords = useCallback(
  //   async (query: string) => {
  //     if (keyword === "country") {
  //       return searchByCountry(query);
  //     } else if (keyword === "any") {
  //       console.log(keyword);
  //       return searchByAny(query);
  //     } else return searchByNameOrCity(query, keyword);
  //   },
  //   [keyword, searchByAny, searchByCountry, searchByNameOrCity]
  // );

  const fetchBreweries = useCallback(async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  }, []);

  const handleKeywords = useCallback(
    async (query: string, keyword: string) => {
      let url = "https://api.openbrewerydb.org/v1/breweries";
      if (keyword === "country") {
        url = url + `/search?query=${query}&per_page=200`;
      } else if (keyword === "any keyword") {
        url = url + `/search?query=${query}&per_page=200`;
      } else {
        url = url + `?by_${keyword}=${query}&per_page=200`;
      }
      return fetchBreweries(url);
    },
    [fetchBreweries]
  );

  const fetchData = useCallback(
    async (query: string, keyword: string) => {
      const breweriesData = await handleKeywords(query, keyword);
      if (!(breweriesData.length > 0)) {
        console.log("no data");
        return;
      } else {
        console.log("your results");
      }
    },
    [handleKeywords]
  );

  const onSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // setSubmitted(query);
      // setQuery("");
      // if (!submitted) {
      //   return;
      if (!query) {
        return;
      }
      fetchData(query, keyword);
    },
    [query, fetchData, keyword]
  );

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
          <Searchbar query={query} setQuery={setQuery} />
          <KeywordRadioBtnGroup keyword={keyword} setKeyword={setKeyword} />
        </form>
      </main>
    </>
  );
}
