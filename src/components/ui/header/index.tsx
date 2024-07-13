import { Link, useLocation } from "react-router-dom";
import { logoutThunk } from "../../../features/auth/auth";
import { useAppDispatch } from "../../../redux/hooks";
import s from "./header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__content}>
        {pathname === "/" ? (
          <Link to={"/media"}>Media</Link>
        ) : (
          <Link to={"/"}>Upload</Link>
        )}

        <button
          onClick={() => {
            dispatch(logoutThunk({}));
          }}
        >
          Logout
        </button>
      </div>
      </div>
    </header>
  );
};
