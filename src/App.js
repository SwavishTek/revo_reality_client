// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "./components/Loadable";
import { lazy } from "react";

const Login = Loadable(lazy(() => import("./pages/Auth/Login")));
const VerifyOTP = Loadable(lazy(() => import("./pages/Auth/VerifyOTP.jsx")));
const ResetPassword = Loadable(
  lazy(() => import("./pages/Auth/ResetPassword.jsx"))
);
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/index.js")));
const MainLayout = Loadable(
  lazy(() => import("./components/layout/MainLayout.jsx"))
);
const UserList = Loadable(lazy(() => import("./pages/User/UserList.jsx")));
const LeaveList = Loadable(lazy(() => import("./pages/Leave/LeaveList.jsx")));
const TeamList = Loadable(lazy(() => import("./pages/Team/TeamListing.jsx")));
const AttList = Loadable(lazy(() => import("./pages/Attendance/AttList.js")));
const AddEmployee = Loadable(
  lazy(() => import("./pages/User/AddEmployee.jsx"))
);
const EmployeeDetails = Loadable(
  lazy(() => import("./pages/User/EmployeeDetails.jsx"))
);
const LeaveForm = Loadable(lazy(() => import("./pages/Leave/LeaveForm.jsx")));
const LeaveDetails = Loadable(
  lazy(() => import("./pages/Leave/LeaveDetails.jsx"))
);
const ProfileSettings = Loadable(
  lazy(() => import("./pages/User/ProfileSettings.jsx"))
);
const ChangePasswords = Loadable(
  lazy(() => import("./pages/User/ChangePasswords.jsx"))
);
const GeneralChanges = Loadable(
  lazy(() => import("./pages/User/GeneralChanges.jsx"))
);

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
    {
      path: "/auth/resetpassword",
      element: <ResetPassword />,
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
          path: "teams",
          element: <TeamList />,
        },
        {
          path: "users/addEmployee",
          element: <AddEmployee />,
        },
        {
          path: "users/:id",
          element: <EmployeeDetails />,
        },
        {
          path: "users/profilesettings",
          element: <ProfileSettings />,
        },
        {
          path: "users/changepassword",
          element: <ChangePasswords />,
        },
        {
          path: "users/generalchanges",
          element: <GeneralChanges />,
        },
        {
          path: "attendance",
          element: <AttList />,
        },
        {
          path: "leaves/apply_leave",
          element: <LeaveForm />,
        },
        {
          path: "leaves/:id",
          element: <LeaveDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
