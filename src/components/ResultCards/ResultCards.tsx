import Link from "next/link";
import styles from "./ResultCards.module.scss";

function ResultCards({ breweries }: { breweries: any[] }) {
  return (
    <ul className={styles["results-cards"]}>
      {breweries.map((b) => (
        <li key={b.id}>
          <Link href={`/brewery/${b.id}`}>{b.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ResultCards;
