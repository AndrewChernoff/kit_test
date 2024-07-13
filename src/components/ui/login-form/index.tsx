import { FormEvent, useState } from "react";
import { loginThunk } from "../../../features/auth/auth";
import { useAppDispatch } from "../../../redux/hooks";
import {  useNavigate } from "react-router-dom";
import s from '../../../utils/styles/forms-styles.module.scss'

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        setEmail("")
        setPassword("")
        navigate("/");
    });
    };
  
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
  