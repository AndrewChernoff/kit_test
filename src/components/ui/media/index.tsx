import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchMediaThunk, setdeletedIds, setError } from "../../../features/media/media";
import containerStyles from "../../../utils/styles/container.module.scss";
import { Loader } from "../../common/loader";
import { MediaItem } from "./media-item";
import s from "./media.module.scss";
import { ErrorBlock } from "../../common/error-block";

export const Media = () => {
  const dispatch = useAppDispatch();
  const {items, error} = useAppSelector(state => state.media);

  useEffect(() => {
    dispatch(fetchMediaThunk());

    return () => {
      if(error) { 
        dispatch(setError(null))
        dispatch(setdeletedIds(null))
      }
    }
  }, [dispatch]);

  if(!items) {
    return <Loader />
  }

  if(items.length === 0) {
    return <h1 className={s.subtitle}>No items</h1>
  }

  return (
    <div className={s.media}>
      <div className={containerStyles.container}>
        <h1>Media</h1>

        {error && <ErrorBlock errorMessage={error}/>}

        <div className={s.media__items}>
          {items?.map((el) => {
            return (
              <MediaItem key={el.id} {...el}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

