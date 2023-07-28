import Link from "next/link";
import styles from "./ResultCards.module.scss";

export function ResultCards({
  queryResults,
  shouldShowEmpty,
}: {
  queryResults: any[];
  shouldShowEmpty: boolean;
}) {
  if (shouldShowEmpty) {
    return null;
  }
  if (queryResults.length === 0) {
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
      {queryResults.map((result) => (
        <Link
          key={result.id}
          className={styles.singleResultLink}
          href={`/brewery/${result.id}`}
        >
          <div className={styles.singleCard}>
            <h2>
              {result.name}
              <span>/</span>
            </h2>
            <h2>
              {result.city}
              <span>/</span>
            </h2>
            <h2>{result.country}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
