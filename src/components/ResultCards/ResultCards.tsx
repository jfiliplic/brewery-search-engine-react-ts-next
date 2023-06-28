import Link from "next/link";
import styles from "./ResultCards.module.scss";

export function ResultCards({ queryResults }: { queryResults: any[] }) {
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
      ;
    </div>
  );
}
