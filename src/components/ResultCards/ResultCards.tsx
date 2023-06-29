import Link from "next/link";
import styles from "./ResultCards.module.scss";

// če še ni bilo nobenega iskanja, gre po prvem pogoju. takoj ko vnesemo prvo črko, gre po zadnjem pogoju (le da ne prikaže nič, ker je queryResults prazen). Če je prvi pogoj brez drugega dela, potem po prvem uspešnem iskanju: če izbrišemo iskalni pojem, izginejo rezultati - ker gre po prvem pogoju takoj, ko je prazno search polje, in ne šele takrat, ko je obenem prazno search polje in tudi ni rezultatov (čim vpišemo 1 črko, se stari rezultati spet pojavijo, ker gre spet po zadnjem pogoju).

export function ResultCards({
  queryResults,
  shouldShowEmpty,
  query,
}: {
  queryResults: any[];
  shouldShowEmpty: boolean;
  query: string;
}) {
  if (!query && !(queryResults.length > 0)) {
    return null;
  } else if (!shouldShowEmpty) {
    return (
      <div className={styles.resultCards}>
        <h3 className={styles.noMatch}>
          Sorry, no brewery matches your search!
        </h3>
      </div>
    );
  } else {
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
}
