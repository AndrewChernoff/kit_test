import s from './file-item.module.scss'

type PropsType = {
    name: string;
    number: number;
    type: string;
    size: number
}

export const FileItem = ({name, number, type, size}:PropsType) => {
  return (
    <div key={name} className={s.fileList__item}>
      File № {number} details:
      <ul>
        <li>Name: {name}</li>
        <li>Type: {type}</li>
        <li>Size: {size} bytes</li>
      </ul>
    </div>
  );
};
