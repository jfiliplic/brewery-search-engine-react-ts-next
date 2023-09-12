import styles from "./KeywordRadioBtnGroup.module.scss";
import { useRouter } from "next/router";

export const FilterKeywords = {
  name: "name",
  city: "city",
  country: "country",
  any: "any keyword",
};

function RadioBtn({
  value,
  onChange,
  selected,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string;
}) {
  return (
    <div className={styles.radioWrapper}>
      <input
        type="radio"
        id={value}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export function KeywordRadioBtnGroup({
  filterKeyword,
  setFilterKeyword,
  onFilterChange,
}: {
  filterKeyword: string;
  setFilterKeyword: any;
  onFilterChange: any;
}) {
  const { query } = useRouter();

  return (
    <fieldset className={styles.radioGroupWrapper}>
      {[
        FilterKeywords.name,
        FilterKeywords.city,
        FilterKeywords.country,
        FilterKeywords.any,
      ].map((value) => (
        <RadioBtn
          key={value}
          value={value}
          onChange={onFilterChange}
          selected={(query.f as string) || filterKeyword}
        />
      ))}
    </fieldset>
  );
}
