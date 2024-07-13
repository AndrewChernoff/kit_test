import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { MediaPage } from "../pages/media";
import { MediaItemPage } from "../pages/media-item-page/media-item-page";

const privateRoutes = [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/media",
        element: <MediaPage />,
      },
      {
        path: "/media/:id",
        element: <MediaItemPage/>,
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


    const isAuth = localStorage.getItem('auth-token')

    return isAuth ? <Outlet /> : <Navigate to="/login" />
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