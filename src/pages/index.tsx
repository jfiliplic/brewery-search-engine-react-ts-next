import styles from "../styles/Page.module.scss";
import {
  KeywordRadioBtnGroup,
  FilterKeywords,
} from "@/components/KeywordRadioBtnGroup/KeywordRadioBtnGroup";
import { SearchBar } from "@/components/SearchBar/Searchbar";
import { ResultSection } from "@/components/ResultSection/ResultSection";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";

export default function Home() {
  const [filterKeyword, setFilterKeyword] = useState("name");
  const [q, setQ] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [shouldShowEmpty, setShouldShowEmpty] = useState(true);
  const [resultPageNumber, setResultPageNumber] = useState(0);
  // const [totalResults, setTotalResults] = useState(0);
  const { push, query } = useRouter();

  useEffect(() => {
    if (q) {
      push({ query: { ...query, p: resultPageNumber } }, undefined, {
        shallow: true,
      });
    }
  }, [filterKeyword, push, q, query, resultPageNumber]);

  const fetchBreweries = useCallback(
    async (url: string, _filterKeyword: string) => {
      const response = await fetch(url);
      const unfilteredData = await response.json();

      if (_filterKeyword === FilterKeywords.country) {
        return unfilteredData.filter((breweryData: any) =>
          breweryData.country.toLowerCase().includes(q.toLowerCase())
        );
      }

      return unfilteredData;
    },
    [q]
  );

  const handleFilterKeywords = useCallback(
    async (q: string, _filterKeyword: string) => {
      let url = baseEndpoint;
      if (_filterKeyword === FilterKeywords.country) {
        url = url + `/search?query=${q}`;
      } else if (_filterKeyword === FilterKeywords.any) {
        url = url + `/search?query=${q}`;
      } else {
        url = url + `?by_${_filterKeyword}=${q}`;
      }

      url = url + `&per_page=200`;

      return fetchBreweries(url, _filterKeyword);
    },
    [fetchBreweries]
  );

  const fetchData = useCallback(
    async (q: string, _filterKeyword: string) => {
      const breweriesData = await handleFilterKeywords(q, _filterKeyword);
      setShouldShowEmpty(false);
      setQueryResults(breweriesData);
      setResultPageNumber(0);
      // setTotalResults(breweriesData.length);
    },
    [handleFilterKeywords]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const _filterKeyword = e.target.value;
      setFilterKeyword(_filterKeyword);
      if (!q) {
        return;
      }
      fetchData(q, _filterKeyword);
      push({ query: { ...query, f: _filterKeyword } }, undefined, {
        shallow: true,
      });
    },
    [fetchData, push, q, query]
  );

  const handleSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!q) {
        return;
      }
      fetchData(q, filterKeyword);
      push({ query: { ...query, q: q, f: filterKeyword } }, undefined, {
        shallow: true,
      });
    },
    [q, fetchData, filterKeyword, push, query]
  );

  return (
    <>
      <main>
        <form className={styles.search} onSubmit={handleSearchbarSubmit}>
          <SearchBar setQ={setQ} />
          <KeywordRadioBtnGroup
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            onFilterChange={handleFilterChange}
          />
        </form>
        <ResultSection
          queryResults={queryResults}
          shouldShowEmpty={shouldShowEmpty}
          resultPageNumber={resultPageNumber}
          setResultPageNumber={setResultPageNumber}
        />
      </main>
    </>
  );
}
