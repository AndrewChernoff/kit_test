import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchMediaThunk, mediaItems } from "../../../features/media/media";
import { convertDate } from "../../../utils/functions/convert_date";
import containerStyles from "../../../utils/styles/container.module.scss";
import { saveAs } from "file-saver";
import { api } from "../../../api/api";
import s from "./media.module.scss";

export const Media = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(mediaItems);

  useEffect(() => {
    dispatch(fetchMediaThunk());
  }, [dispatch]);

  const downloadHandler = (id: string, fileName: string) => {
    api
      .getMediaItem(id)
      .then((blob) => {
        console.log(blob);
        saveAs(blob.data, fileName);
      });
  };

  return (
    <div className={s.media}>
      <div className={containerStyles.container}>
        <h1>Media</h1>

        <div className={s.media__items}>
          {items?.map((el) => {
            return (
              <div className={s.mediaItem}>
                <div className={s.details}>
                  <div className={s.details__header}>
                    <h3 className={s.name}>{el.name}</h3>

                    <button>delete</button>
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
                    {" "}
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

