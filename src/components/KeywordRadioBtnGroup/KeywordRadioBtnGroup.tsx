import styles from "./KeywordRadioBtnGroup.module.scss";

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
          selected={filterKeyword}
        />
      ))}
    </fieldset>
  );
}
