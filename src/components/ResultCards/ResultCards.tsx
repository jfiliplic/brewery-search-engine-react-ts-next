import Link from "next/link";
import { NavBtns } from "../NavBtns/NavBtns";
import styles from "./ResultCards.module.scss";

function SingleCard({
  queryResults,
  resultPageNumber,
}: {
  queryResults: any[];
  resultPageNumber: number;
}) {
  let resultsPerPage = 10;
  const totalResults = queryResults.length;
  const resultsBehind = resultPageNumber * resultsPerPage;
  const resultsCurrentAhead = totalResults - resultsBehind;

  if (totalResults - resultsBehind < resultsPerPage) {
    resultsPerPage = totalResults - resultsBehind;
  }

  console.log(totalResults);

  return (
    <>
      {(() => {
        const singleCardHtml = queryResults
          .slice(
            resultsBehind,
            resultsCurrentAhead > resultsPerPage
              ? resultsPerPage + resultsBehind
              : totalResults
          )
          .map(({ id, name, city, country }) => (
            <Link
              key={id}
              className={styles.singleResultLink}
              href={`/brewery/${id}`}
            >
              <div className={styles.singleCard}>
                <h2>
                  {name}
                  <span>/</span>
                </h2>
                <h2>
                  {city}
                  <span>/</span>
                </h2>
                <h2>{country}</h2>
              </div>
            </Link>
          ));
        return singleCardHtml;
      })()}
    </>
  );
}

export function ResultCards({
  queryResults,
  shouldShowEmpty,
  resultPageNumber,
}: {
  queryResults: any[];
  shouldShowEmpty: boolean;
  resultPageNumber: number;
}) {
  const totalResults = queryResults.length;

  if (shouldShowEmpty) {
    return null;
  }
  if (totalResults === 0) {
    return (
      <div className={styles.resultCards}>
        <h3 className={styles.noMatch}>
          Sorry, no brewery matches your search!
        </h3>
      </div>
    );
  }

  return (
    <div className={styles.resultCards}>
      <NavBtns
        queryResults={queryResults}
        resultPageNumber={resultPageNumber}
      />
      <SingleCard
        queryResults={queryResults}
        resultPageNumber={resultPageNumber}
      />
    </div>
  );
}