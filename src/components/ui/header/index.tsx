import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../../features/auth/auth";
import { useAppDispatch } from "../../../redux/hooks";
import s from "./header.module.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__content}>
        {pathname === "/" ? (
          <Link to={"/upload"}>Media</Link>
        ) : (
          <Link to={"/"}>Upload</Link>
        )}

        <button
          onClick={() => {
            dispatch(logoutThunk({})).unwrap()
            .then(() => {
              navigate('/login')
            })
          }}
        >
          Logout
        </button>
      </div>
      </div>
    </header>
  );
};
