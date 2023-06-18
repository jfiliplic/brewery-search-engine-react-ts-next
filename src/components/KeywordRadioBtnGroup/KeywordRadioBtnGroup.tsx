import styles from "./KeywordRadioBtnGroup.module.scss";

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
}: {
  keyword: string;
  setKeyword: any;
}) {
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <fieldset className={styles.radioGroupWrapper}>
      {["name", "city", "country", "any keyword"].map((value) => (
        <RadioBtn
          key={value}
          value={value}
          onChange={onOptionChange}
          selected={keyword}
        />
      ))}
    </fieldset>
  );
}
