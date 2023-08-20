import Link from "next/link";
import styles from "./ResultCards.module.scss";

function SingleCard({
  queryResults,
  resultPageNumber,
  totalResults,
}: {
  queryResults: any[];
  resultPageNumber: number;
  totalResults: number;
}) {
  let resultsPerPage = 10;
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
  totalResults,
}: {
  queryResults: any[];
  shouldShowEmpty: boolean;
  resultPageNumber: number;
  totalResults: number;
}) {

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
      <SingleCard
        queryResults={queryResults}
        resultPageNumber={resultPageNumber}
        totalResults={totalResults}
      />
    </div>
  );
}

//   return (
//     <div className={styles.resultCards}>
//       {(() => {
//         const htmlResultCard = queryResults
//           .slice(
//             resultsBehind,
//             resultsCurrentAhead > resultsPerPage
//               ? resultsPerPage + resultsBehind
//               : totalResults
//           )
//           .map(({ id, name, city, country }) => (
//             <Link
//               key={id}
//               className={styles.singleResultLink}
//               href={`/brewery/${id}`}
//             >
//               <div className={styles.singleCard}>
//                 <h2>
//                   {name}
//                   <span>/</span>
//                 </h2>
//                 <h2>
//                   {city}
//                   <span>/</span>
//                 </h2>
//                 <h2>{country}</h2>
//               </div>
//             </Link>
//           ));
//         return htmlResultCard;
//       })()}
//     </div>
//   );
// }

//   return (
//     <div className={styles.resultCards}>
//       {queryResults.map((result) => (
//         <Link
//           key={result.id}
//           className={styles.singleResultLink}
//           href={`/brewery/${result.id}`}
//         >
//           <div className={styles.singleCard}>
//             <h2>
//               {result.name}
//               <span>/</span>
//             </h2>
//             <h2>
//               {result.city}
//               <span>/</span>
//             </h2>
//             <h2>{result.country}</h2>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
