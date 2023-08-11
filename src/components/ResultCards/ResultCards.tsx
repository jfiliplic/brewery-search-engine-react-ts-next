import Link from "next/link";
import styles from "./ResultCards.module.scss";

export function ResultCards({
  queryResults,
  shouldShowEmpty,
  resultPageNumber,
}: {
  queryResults: any[];
  shouldShowEmpty: boolean;
  resultPageNumber: number;
}) {
  let resultsPerPage = 10;
  const totalResults = queryResults.length;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  const resultsBehind = resultPageNumber * resultsPerPage;
  const resultsCurrentAhead = totalResults - resultsBehind;
  if (totalResults - resultsBehind < resultsPerPage) {
    resultsPerPage = totalResults - resultsBehind;
  }

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

  // return (
  //   <tbody>
  //     {(() => {
  //       const rows = [];
  //       for (let i = 0; i < objectRows.length; i++) {
  //         rows.push(<ObjectRow key={i} data={objectRows[i]} />);
  //       }
  //       return rows;
  //     })()}
  //   </tbody>
  // );
  return (
    <div className={styles.resultCards}>
      {(() => {
        let htmlResultCards = [];
        for ( let i = 0 + resultsBehind;
      resultsCurrentAhead > resultsPerPage
      ? i < resultsPerPage + resultsBehind
      : i < totalResults;
      i++) {
      const htmlResultCard = [queryResults[i]].map((id, name, city, country) => (
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
      htmlResultCards.push(htmlResultCard);
    }
    </div>
  );
      

  // return (
  //   <div className={styles.resultCards}>
  //     {queryResults.map((result) => (
  //       <Link
  //         key={result.id}
  //         className={styles.singleResultLink}
  //         href={`/brewery/${result.id}`}
  //       >
  //         <div className={styles.singleCard}>
  //           <h2>
  //             {result.name}
  //             <span>/</span>
  //           </h2>
  //           <h2>
  //             {result.city}
  //             <span>/</span>
  //           </h2>
  //           <h2>{result.country}</h2>
  //         </div>
  //       </Link>
  //     ))}
  //   </div>
  // );
}
