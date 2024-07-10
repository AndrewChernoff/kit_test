import { FormEvent, useState } from "react";
import { api } from "../../api/api";
import s from "../common/styles/forms-styles.module.scss";

export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь можно добавить логику для отправки данных на сервер или их обработки
    api.register({ email, password, name });
  };

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

      <button type="submit">Register</button>
    </form>
  );
};
