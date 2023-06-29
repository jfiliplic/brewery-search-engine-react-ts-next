import styles from "../styles/Page.module.scss";
import {
  KeywordRadioBtnGroup,
  SearchKeywords,
} from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { ModeToggleBtn } from "@/components/ModeToggleBtn/ModeToggleBtn";
import { Logo } from "@/components/Logo/Logo";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { ResultCards } from "@/components/ResultCards/ResultCards";
import { useState, useCallback } from "react";

const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";

export default function Home() {
  const [keyword, setKeyword] = useState("name");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [shouldShowEmpty, setShouldShowEmpty] = useState(true);

  const fetchBreweries = useCallback(
    async (url: string, keyword: string) => {
      const response = await fetch(url);

      if (keyword === SearchKeywords.country) {
        const unfilteredData = await response.json();
        return unfilteredData.filter((breweryData: any) =>
          breweryData.country.toLowerCase().includes(query.toLowerCase())
        );
      }

      return await response.json();
    },
    [query]
  );

  const handleKeywords = useCallback(
    async (query: string, keyword: string) => {
      let url = baseEndpoint;
      if (keyword === SearchKeywords.country) {
        url = url + `/search?query=${query}`;
      } else if (keyword === SearchKeywords.any) {
        url = url + `/search?query=${query}`;
      } else {
        url = url + `?by_${keyword}=${query}`;
      }

      url = url + `&per_page=200`;

      return fetchBreweries(url, keyword);
    },
    [fetchBreweries]
  );

  const fetchData = useCallback(
    async (query: string, keyword: string) => {
      const breweriesData = await handleKeywords(query, keyword);
      if (!(breweriesData.length > 0)) {
        setShouldShowEmpty(false); // to show alert msg for no hit search
        setQueryResults([]); // to prevent showing results of last successful search before no hit search while entering text for new search
      } else {
        setQueryResults(breweriesData);
        // setShouldShowEmpty(true);
      }
    },
    [handleKeywords]
  );

  const onSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!query) {
        // setShouldShowEmpty(true);
        setQueryResults([]); //submitting empty search form with "Enter" rerenders result section according to 1st condition
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
          <Searchbar
            query={query}
            setQuery={setQuery}
            setShouldShowEmpty={setShouldShowEmpty}
          />
          <KeywordRadioBtnGroup keyword={keyword} setKeyword={setKeyword} />
        </form>
        <ResultCards
          queryResults={queryResults}
          query={query}
          shouldShowEmpty={shouldShowEmpty}
        />
      </main>
    </>
  );
}
