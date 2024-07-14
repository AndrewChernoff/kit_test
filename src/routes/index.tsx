import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { UploadPage } from "../pages/upload";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { MediaPage } from "../pages/media";
import { NotFound } from "../pages/not-found";

const privateRoutes = [
      {
        path: "/upload",
        element: <UploadPage />,
      },
      {
        path: "/",
        element: <MediaPage />,
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
  {
    path: "/*",
    element: <NotFound />,
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