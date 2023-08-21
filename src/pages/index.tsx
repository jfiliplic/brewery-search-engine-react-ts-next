import styles from "../styles/Page.module.scss";
import {
  KeywordRadioBtnGroup,
  FilterKeywords,
} from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { SearchBar } from "@/components/SearchBar/Searchbar";
import { ResultCards } from "@/components/ResultCards/ResultCards";
import { useState, useCallback } from "react";

export const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";

export default function Home() {
  const [filterKeyword, setFilterKeyword] = useState("name");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [shouldShowEmpty, setShouldShowEmpty] = useState(true);
  const [resultPageNumber, setResultPageNumber] = useState(0);

  const fetchBreweries = useCallback(
    async (url: string, _filterKeyword: string) => {
      const response = await fetch(url);
      const unfilteredData = await response.json();

      if (_filterKeyword === FilterKeywords.country) {
        return unfilteredData.filter((breweryData: any) =>
          breweryData.country.toLowerCase().includes(query.toLowerCase())
        );
      }

      return unfilteredData;
    },
    [query]
  );

  const handleFilterKeywords = useCallback(
    async (query: string, _filterKeyword: string) => {
      let url = baseEndpoint;
      if (_filterKeyword === FilterKeywords.country) {
        url = url + `/search?query=${query}`;
      } else if (_filterKeyword === FilterKeywords.any) {
        url = url + `/search?query=${query}`;
      } else {
        url = url + `?by_${_filterKeyword}=${query}`;
      }

      url = url + `&per_page=200`;

      return fetchBreweries(url, _filterKeyword);
    },
    [fetchBreweries]
  );

  const fetchData = useCallback(
    async (query: string, _filterKeyword: string) => {
      const breweriesData = await handleFilterKeywords(query, _filterKeyword);
      setShouldShowEmpty(false);
      setQueryResults(breweriesData);
      // setTotalResults(breweriesData.length);
    },
    [handleFilterKeywords]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const _filterKeyword = e.target.value;
      setFilterKeyword(_filterKeyword);
      if (!query) {
        return;
      }
      fetchData(query, _filterKeyword);
    },
    [fetchData, query]
  );

  const handleSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query) {
        return;
      }
      fetchData(query, filterKeyword);
    },
    [query, fetchData, filterKeyword]
  );

  return (
    <>
      <main>
        <form className={styles.search} onSubmit={handleSearchbarSubmit}>
          <SearchBar setQuery={setQuery} />
          <KeywordRadioBtnGroup
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            onFilterChange={handleFilterChange}
          />
        </form>
        <ResultCards
          queryResults={queryResults}
          shouldShowEmpty={shouldShowEmpty}
          resultPageNumber={resultPageNumber}
        />
      </main>
    </>
  );
}
