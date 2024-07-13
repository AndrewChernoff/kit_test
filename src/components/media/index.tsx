import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMediaThunk, mediaItems } from "../../features/media/media";
import file from "../../assets/imgs/file.png";
import { convertDate } from "../../utils/functions/convert_date";
import containerStyles from "../../utils/styles/container.module.scss";
import s from "./media.module.scss";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';

import { api } from "../../api/api";

export const Media = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(mediaItems);

  useEffect(() => {
    dispatch(fetchMediaThunk());
  }, [dispatch]);

  const downloadHandler = (id: string) => {
    api.getMediaItem(id)
    
    .then(blob => {
      
      console.log(blob);
      
        const url = `https://js-test.kitactive.ru/api/media/${id}`
        const blobUrl = window.URL.createObjectURL(new Blob([blob]))
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobUrl
        aTag.setAttribute("downLoad", fileName as string)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
        
    })
  }

  return (
    <div className={s.media}>
      <div className={containerStyles.container}>
        <h1>Media</h1>
        <div className={s.media__items}>
          {items?.map((el) => {
            return (
              <div className={s.mediaItem}>
               {/*  <Link to={`/media/${el.id}`}> */}
               <a download onClick={() => downloadHandler(el.id)}
                /* href={el.url} */> download</a>
                <img src={/* el.url || */ file} alt={el.name} />
                {/* </Link> */}
                <div className={s.details}>
                  <h3 className={s.name}>{el.name}</h3>
                  <p className={s.createdAt}>
                    Created at: {convertDate(el.createdAt)}
                  </p>
                  <p className={s.fileName}>File name: {el.fileName}</p>
                  <p className={s.mimeType}>Mime type: {el.mimeType}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
