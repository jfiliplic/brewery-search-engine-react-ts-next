import styles from "../styles/Page.module.scss";
import {
  KeywordRadioBtnGroup,
  SearchKeywords,
} from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { SearchBar } from "@/components/SearchBar/Searchbar";
import { ResultCards } from "@/components/ResultCards/ResultCards";
import { useState, useCallback } from "react";

export const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";

export default function Home() {
  const [keyword, setKeyword] = useState("name");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [shouldShowEmpty, setShouldShowEmpty] = useState(true);

  const fetchBreweries = useCallback(
    async (url: string, keyword: string) => {
      const response = await fetch(url);
      const unfilteredData = await response.json();

      if (keyword === SearchKeywords.country) {
        return unfilteredData.filter((breweryData: any) =>
          breweryData.country.toLowerCase().includes(query.toLowerCase())
        );
      }

      return unfilteredData;
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
      if (breweriesData.length === 0) {
        setShouldShowEmpty(false);
        // clearing queryResults after previous successful search
        setQueryResults([]);
      } else {
        setQueryResults(breweriesData);
      }
    },
    [handleKeywords]
  );

  const onSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query) {
        return;
      }
      fetchData(query, keyword);
    },
    [query, fetchData, keyword]
  );

  return (
    <>
      <main>
        <form className={styles.search} onSubmit={onSearchbarSubmit}>
          <SearchBar setQuery={setQuery} />
          <KeywordRadioBtnGroup keyword={keyword} setKeyword={setKeyword} />
        </form>
        <ResultCards
          queryResults={queryResults}
          shouldShowEmpty={shouldShowEmpty}
        />
      </main>
    </>
  );
}
