import { FormEvent, useState } from "react";
import s from '../common/styles/forms-styles.module.scss'
import { isAuth, loginThunk } from "../../features/auth/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";


export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const isUserLoggedIn = useAppSelector(isAuth)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Здесь можно добавить логику для отправки данных на сервер или их обработки
      dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        setEmail("")
        setPassword("")
    });
    };

    if (isUserLoggedIn) {
        return <Navigate to="/" />
    }
  
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <button type="submit">Login</button>
      </form>
    );
  };
  