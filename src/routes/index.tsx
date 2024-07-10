import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { useAppSelector } from "../redux/hooks";

const privateRoutes = [
    {
        path: "/",
        element: <Home />,
      },
    ]

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const PrivateRoute = () => {


    const isAuth = useAppSelector(state => state.auth.isAuth)
  
    return !isAuth ? <Navigate to="/login" /> : <Outlet />
  }


const router = createBrowserRouter([
    {
        element: <PrivateRoute />,
        children: privateRoutes,
      },
      ...publicRoutes,
  ]);

  export const Router = () => {
    return <RouterProvider router={router} />
  }