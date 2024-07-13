import { ChangeEvent, useEffect, useState } from "react";
import containerStyles from "../../../utils/styles/container.module.scss";
import { Result } from "../../common/result";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setStatus, uploadMediaThunk } from "../../../features/media/media";
import s from "./home.module.scss";

export const Home = () => {
  const dispatch = useAppDispatch();
  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
  const [images, setImages] = useState<FileList | null>(null);

  const [files, setFiles] = useState<FileList | null>(null);

  const { status } = useAppSelector((state) => state.media);

  useEffect(() => {
    return () => {
      dispatch(setStatus("initial"));
    };
  }, []);

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images: Array<string> = [];
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }

      setImages(files);
      setImagePreviews(images);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUploadFiles = async () => {
    if (files) {
      const filesSize = Array.from(files).reduce(
        (acc, curr) => acc + curr.size,
        0
      );

      if (filesSize > 1048576) {
        alert("Files exceed 1MB size");
        setFiles(null);
        return;
      }

      dispatch(uploadMediaThunk(files))
        .unwrap()
        .then(() => {
          setFiles(null);
        })
        .catch(() => {
          setFiles(null);
        });
    }
  };

  const handleUploadImages = async () => {
    if (images) {
      const imgsSize = Array.from(images).reduce(
        (acc, curr) => acc + curr.size,
        0
      );

      if (imgsSize > 1048576) {
        alert("Files exceed 1MB size");
        setImagePreviews([]);
        setImages(null);
        return;
      }

      dispatch(uploadMediaThunk(images))
        .unwrap()
        .then(() => {
          setImagePreviews([]);
          setImages(null);
        })
        .catch(() => {
          setImagePreviews([]);
          setImages(null);
        });
    }
  };

  return (
    <div className={s.home}>
      <div className={containerStyles.container}>
        <div className={s.btns}>
          {files && (
            <button className={s.uploadButton} onClick={handleUploadFiles}>
              Upload files
            </button>
          )}
          {images && (
            <button className={s.uploadButton} onClick={handleUploadImages}>
              Upload images
            </button>
          )}
        </div>
        <div className={s.home__content}>
          <div className={s.imgs}>
            <div className={s.imgs__input}>
              <label htmlFor="img">Choose img</label>

              <input
                accept="image/*"
                multiple
                id="img"
                type="file"
                onChange={(e) => {
                  onSelectImage(e);
                }}
              />
            </div>
            {imagePreviews && (
              <div className={s.imgs__previews}>
                {imagePreviews.map((img, i) => {
                  return (
                    <img
                      className={s.imgs__previews_item}
                      src={img}
                      alt={"image-" + i}
                      key={i}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className={s.files}>
            <div className={s.files__input}>
              <label htmlFor="file">Choose files</label>
              <input
                id="file"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {files && (
              <div className={s.fileList}>
                {[...files].map((file, index) => (
                  <div key={file.name} className={s.fileList__item}>
                    File № {index + 1} details:
                    <ul>
                      <li>Name: {file.name}</li>
                      <li>Type: {file.type}</li>
                      <li>Size: {file.size} bytes</li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={s.status}>
          <Result status={status} />
        </div>
      </div>
    </div>
  );
};
