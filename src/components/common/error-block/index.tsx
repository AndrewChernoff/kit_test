import s from "./error-block.module.scss";

type PropsType = {
  errorMessage: string;
};

export const ErrorBlock = ({ errorMessage }: PropsType) => {
  return (
    <>
      <div className={s.error}>{errorMessage}</div>
    </>
  );
};