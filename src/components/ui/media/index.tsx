import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchMediaThunk, removeMediaItemThunk } from "../../../features/media/media";
import { convertDate } from "../../../utils/functions/convert_date";
import containerStyles from "../../../utils/styles/container.module.scss";
import { saveAs } from "file-saver";
import { api } from "../../../api/api";
import { Loader } from "../../common/loader";
import s from "./media.module.scss";

export const Media = () => {
  const dispatch = useAppDispatch();
  const {items, deletedIds } = useAppSelector(state => state.media);

  useEffect(() => {
    dispatch(fetchMediaThunk());
  }, [dispatch]);

  const downloadHandler = (id: string, fileName: string) => {
    api
      .getMediaItem(id)
      .then((res) => {
        saveAs(res.data, fileName);
      });
  };

  const deleteHandler = (id: string) => {
    dispatch(removeMediaItemThunk(id))
  };

  if(!items) {
    return <Loader />
  }

  if(items.length === 0) {
    return <h1 className={s.subtitle}>No items</h1>
  }

const isDisabled = (id: string) => {  
  return deletedIds.some((el: string) => el === id)
}

  return (
    <div className={s.media}>
      <div className={containerStyles.container}>
        <h1>Media</h1>

        <div className={s.media__items}>
          {items?.map((el) => {
            return (
              <div className={s.mediaItem} key={el.id}>
                <div className={s.details}>
                  <div className={s.details__header}>
                    <h3 className={s.name}>{el.name}</h3>
                    <button className={s.button} disabled={isDisabled(el.id)} onClick={() => deleteHandler(el.id)}>delete</button>
                  </div>
                  <p className={s.createdAt}>
                    Created at: {convertDate(el.createdAt)}
                  </p>
                  <p className={s.fileName}>File name: {el.fileName}</p>
                  <p className={s.mimeType}>Mime type: {el.mimeType}</p>

                  <a
                    download
                    onClick={() => downloadHandler(el.id, el.fileName)}
                  >
                    download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

