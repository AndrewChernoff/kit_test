
import saveAs from 'file-saver';
import { api } from '../../../../api/api';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { convertDate } from '../../../../utils/functions/convert_date'
import s from './media-item.module.scss'
import { removeMediaItemThunk } from '../../../../features/media/media';
import { MediaItemType } from '../../../../api/types';

export const MediaItem = ({id, name, createdAt, fileName, mimeType}: MediaItemType) => {
  const dispatch = useAppDispatch();
  const  deletedIds  = useAppSelector(state => state.media.deletedIds);


  const downloadHandler = (id: string, fileName: string) => {
    api
      .getMediaItem(id)
      .then((res) => {
        saveAs(res.data, fileName);
      })
      .catch(() => {
        alert('Failed to load file!')
      });
  };

  const deleteHandler = (id: string) => {
    dispatch(removeMediaItemThunk(id))
  };

  const isDisabled = (id: string) => {  
    return deletedIds.some((el: string) => el === id)
  }

  return (
    <div className={s.mediaItem} key={id}>
                <div className={s.details}>
                  <div className={s.details__header}>
                    <h3 className={s.name}>{name}</h3>
                    <button className={s.button} disabled={isDisabled(id)} onClick={() => deleteHandler(id)}>delete</button>
                  </div>
                  <p className={s.createdAt}>
                    Created at: {convertDate(createdAt)}
                  </p>
                  <p className={s.fileName}>File name: {fileName}</p>
                  <p className={s.mimeType}>Mime type: {mimeType}</p>

                  <a
                    download
                    onClick={() => downloadHandler(id, fileName)}
                  >
                    download
                  </a>
                </div>
              </div>
  )
}
