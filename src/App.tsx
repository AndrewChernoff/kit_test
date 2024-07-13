import { useEffect } from "react";
import "./App.css";
import { Router } from "./routes";
import { useAppDispatch } from "./redux/hooks";
import { authMe } from "./features/auth/auth";

function App() {
 /*  const dispatch = useAppDispatch();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
   dispatch(authMe())
  }, [dispatch, token]); */
  return (
    <>
      <Router />
    </>
  );
}

export default App;
