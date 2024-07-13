import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Result } from "../../common/result";
import { registerThunk } from "../../../features/auth/auth";
import s from "../../../utils/styles/forms-styles.module.scss";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const status = useAppSelector(state => state.auth.status)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerThunk({ email, password, name })).unwrap()
      .catch(() => alert('Email is already taken!'))

  };

  const isDisabled = email.trim().length === 0 || password.trim().length === 0 || name.trim().length === 0;


  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1>Register</h1>
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

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
        <Link to="/login">Sign in</Link>

      <button disabled={isDisabled} type="submit">Register</button>

      <Result status={status} />
    </form>
  );
};
