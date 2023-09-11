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
  // const [q, setQ] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [shouldShowEmpty, setShouldShowEmpty] = useState(true);
  const [resultPageNumber, setResultPageNumber] = useState(0);
  const { push, query } = useRouter();
  console.log(query.q);

  // const [totalResults, setTotalResults] = useState(0);

  const fetchBreweries = useCallback(
    async (url: string, _filterKeyword: string) => {
      const response = await fetch(url);
      const unfilteredData = await response.json();

      if (_filterKeyword === FilterKeywords.country) {
        return unfilteredData.filter((breweryData: any) =>
          breweryData.country
            .toLowerCase()
            .includes((query.q as string).toLowerCase())
        );
      }

      return unfilteredData;
    },
    [query.q]
  );

  const handleFilterKeywords = useCallback(
    async (q: string, _filterKeyword: string) => {
      let url = baseEndpoint;
      if (
        _filterKeyword === FilterKeywords.country ||
        _filterKeyword === FilterKeywords.any
      ) {
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
      setResultPageNumber(query.p ? parseInt(query.p as string) : 0);
      // setTotalResults(breweriesData.length);
    },
    [handleFilterKeywords, query.p]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const _filterKeyword = e.target.value;
      setFilterKeyword(_filterKeyword);
      if (!query.q) {
        // setting q url param to enable filter change & query with existing search term after clicking back button from detailed result card
        return;
        // if (query.q) {
        //   setQ(query.q as string);
        // } else {
        //   return;
        // }
      }
      // fetchData(q, _filterKeyword);
      push({ query: { ...query, f: _filterKeyword, p: 0 } }, undefined, {
        shallow: true,
      });
    },
    [push, query]
  );

  const handleSearchbarSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log((e.target as any).searchbar.value);
      const q = (e.target as any).searchbar.value;
      if (!q) {
        return;
      }
      // fetchData(q, filterKeyword);
      push({ query: { ...query, q: q, f: filterKeyword, p: 0 } }, undefined, {
        shallow: true,
      });
    },
    [filterKeyword, push, query]
  );

  useEffect(() => {
    if (query.q) {
      console.log(query.q, query.f);
      fetchData(query.q as string, query.f as string);
    }

    // emptying result section when no params in url (when clicking back button until initial page)
    else {
      setShouldShowEmpty(true);
    }
  }, [fetchData, query.f, query.q]);

  return (
    <>
      <main>
        <form className={styles.search} onSubmit={handleSearchbarSubmit}>
          <SearchBar />
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
