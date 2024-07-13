import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import containerStyles from "../../utils/styles/container.module.scss";
import s from "./media-item.module.scss";

export const MediaItem = () => {
    const [smt, setSmt] = useState<string | null>(null)

  const { id } = useParams();

  useEffect(() => {
    id && api.getMediaItem(id)
    .then(res => res.data.blob())
    .then(blob => {
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

    
  }, []);

  return (
    <div className={s.media}>
      <div className={containerStyles.container}>
        {smt && <img src={smt}/>}
      </div>
    </div>
  );
};
