import styles from "./NavBtns.module.scss";

export function NavBtns({
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
          className={styles.navBtn}
          disabled={resultsBehind ? false : true}
        >
          &lt;&lt;
        </button>
      </label>
      <label htmlFor="forward">
        <button
          type="button"
          id="forward"
          className={styles.navBtn}
          disabled={resultsCurrentAhead > resultsPerPage ? false : true}
        >
          &gt;&gt;
        </button>
      </label>
    </div>
  );
}
