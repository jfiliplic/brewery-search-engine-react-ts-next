import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./NavBtns.module.scss";

export function NavBtns({
  queryResults,
  resultPageNumber,
  setResultPageNumber,
}: {
  queryResults: any[];
  resultPageNumber: number;
  setResultPageNumber: any;
}) {
  let resultsPerPage = 10;
  const totalResults = queryResults.length;
  const resultsBehind = resultPageNumber * resultsPerPage;
  const resultsCurrentAhead = totalResults - resultsBehind;
  // const { push, query } = useRouter();

  if (totalResults - resultsBehind < resultsPerPage) {
    resultsPerPage = totalResults - resultsBehind;
  }

  const handleNavBtnClick = useCallback(
    (direction: "forward" | "back") => {
      const numberOfSteps = Math.floor(totalResults / resultsPerPage);

      if (direction === "forward") {
        if (resultPageNumber < numberOfSteps) {
          setResultPageNumber(
            (prevResultPageNumber: number) => prevResultPageNumber + 1
          );
        }
      } else {
        if (resultPageNumber > 0) {
          setResultPageNumber(
            (prevResultPageNumber: number) => prevResultPageNumber - 1
          );
        }
      }
    },
    [resultPageNumber, resultsPerPage, setResultPageNumber, totalResults]
  );

  // const handleNavBtnClick = useCallback(
  //   (direction: "forward" | "back") => {
  //     const numberOfSteps = Math.floor(totalResults / resultsPerPage);

  //     if (direction === "forward") {
  //       if (resultPageNumber < numberOfSteps) {
  //         setResultPageNumber((prevResultPageNumber: number) => {
  //           const newResultPageNumber = prevResultPageNumber + 1;
  //           push({ query: { ...query, p: newResultPageNumber } }, undefined, {
  //             shallow: true,
  //           });
  //           return newResultPageNumber;
  //         });
  //       }
  //     } else {
  //       if (resultPageNumber > 0) {
  //         setResultPageNumber((prevResultPageNumber: number) => {
  //           const newResultPageNumber = prevResultPageNumber - 1;
  //           push({ query: { ...query, p: newResultPageNumber } }, undefined, {
  //             shallow: true,
  //           });
  //           return newResultPageNumber;
  //         });
  //       }
  //     }
  //   },
  //   [
  //     push,
  //     query,
  //     resultPageNumber,
  //     resultsPerPage,
  //     setResultPageNumber,
  //     totalResults,
  //   ]
  // );

  return (
    <div className={styles.pagination} data-resultpagenumber={resultPageNumber}>
      <span>
        Showing {1 + resultsBehind} -{" "}
        {totalResults > resultsPerPage
          ? resultsPerPage + resultsBehind
          : totalResults}{" "}
        of {totalResults}
      </span>
      <label htmlFor="back">
        <button
          type="button"
          id="back"
          className={styles.back}
          disabled={resultsBehind ? false : true}
          onClick={() => handleNavBtnClick("back")}
        >
          &lt;&lt;
        </button>
      </label>
      <label htmlFor="forward">
        <button
          type="button"
          id="forward"
          className={styles.forward}
          disabled={resultsCurrentAhead > resultsPerPage ? false : true}
          onClick={() => handleNavBtnClick("forward")}
        >
          &gt;&gt;
        </button>
      </label>
    </div>
  );
}
