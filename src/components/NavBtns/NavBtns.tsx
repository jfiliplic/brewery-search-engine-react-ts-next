import { useCallback } from "react";
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

  if (totalResults - resultsBehind < resultsPerPage) {
    resultsPerPage = totalResults - resultsBehind;
  }

  const handleNavBtnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const numberOfSteps = Math.floor(totalResults / resultsPerPage);
      const target = event.currentTarget;
      const changeType = target.getAttribute("data-change-type");
    //   const increasePageNumber = () =>
    //     setResultPageNumber(
    //       (prevResultPageNumber: number) => prevResultPageNumber + 1
    //     );
    //   const decreasePageNumber = () =>
    //     setResultPageNumber(
    //       (prevResultPageNumber: number) => prevResultPageNumber - 1
    //     );

      if (changeType === "forward") {
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
          data-change-type="back"
          onClick={handleNavBtnClick}
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
          data-change-type="forward"
          onClick={handleNavBtnClick}
        >
          &gt;&gt;
        </button>
      </label>
    </div>
  );
}
