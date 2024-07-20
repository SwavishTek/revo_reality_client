// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "./components/Loadable";
import { lazy } from "react";

const Login = Loadable(lazy(() => import("./pages/Auth/Login")));
const VerifyOTP = Loadable(lazy(() => import("./pages/Auth/VerifyOTP.jsx")));
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/index.js")));
const MainLayout = Loadable(
  lazy(() => import("./components/layout/MainLayout.jsx"))
);
const UserList = Loadable(lazy(() => import("./pages/User/UserList.jsx")));
const LeaveList = Loadable(lazy(() => import("./pages/Leave/LeaveList.jsx")));
const AttList = Loadable(lazy(() => import("./pages/Attendance/AttList.js")));
const AddEmployee = Loadable(lazy(() => import("./pages/User/AddEmployee.jsx")));

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/verifyOTP",
      element: <VerifyOTP />,
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "leaves",
          element: <LeaveList />,
        },
        {
          path: "users/addEmployee",
          element: <AddEmployee />,
        },
        {
          path: "attendance",
          element: <AttList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
