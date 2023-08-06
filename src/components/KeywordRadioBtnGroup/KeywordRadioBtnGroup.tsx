import styles from "./KeywordRadioBtnGroup.module.scss";

export const SearchKeywords = {
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
  keyword,
  setKeyword,
  onFilterChange,
}: {
  keyword: string;
  setKeyword: any;
  onFilterChange: any;
}) {
  return (
    <fieldset className={styles.radioGroupWrapper}>
      {[
        SearchKeywords.name,
        SearchKeywords.city,
        SearchKeywords.country,
        SearchKeywords.any,
      ].map((value) => (
        <RadioBtn
          key={value}
          value={value}
          onChange={onFilterChange}
          selected={keyword}
        />
      ))}
    </fieldset>
  );
}
