import styles from "./KeywordRadioBtn.module.scss";

export function KeywordRadioBtn({ id, value }: { id: string; value: string }) {
  return (
    <>
      <input type="radio" id={id} value={value} name="keyword" />
    </>
  );
}
