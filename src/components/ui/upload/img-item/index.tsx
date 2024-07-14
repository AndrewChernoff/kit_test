import s from "./img-item.module.scss";

type PropsType = {
  img: string;
  alt: string
};

export const ImgItem = ({ img, alt }: PropsType) => {
  return (
    <>
    <img
      className={s.imgs__previews_item}
      src={img}
      alt={alt}
    />
    </>
  );
};
