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
const AddEmployee = Loadable(
  lazy(() => import("./pages/User/AddEmployee.jsx"))
);
const EmployeeDetails = Loadable(
  lazy(() => import("./pages/User/EmployeeDetails.jsx"))
);

/* start Team */
const TeamList = Loadable(lazy(()=> import("./pages/Team/TeamList.jsx")))
const AddTeam = Loadable(lazy(()=> import("./pages/Team/TeamForm.jsx")))
const TeamDetails = Loadable(lazy(()=> import("./pages/Team/TeamDetails.jsx")))

/* end Team */


const LeaveForm = Loadable(lazy(() => import("./pages/Leave/LeaveForm.jsx")));
const LeaveDetails = Loadable(
  lazy(() => import("./pages/Leave/LeaveDetails.jsx"))
);

//sdsd
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
          path: "users/:id",
          element: <EmployeeDetails />,
        },

        /* start Team */
        {
          path: "teams",
          element: <TeamList/>
        },
        {
          path: "teams/add_team",
          element: <AddTeam/>
        },
        {
          path: "teams/:id",
          element: <TeamDetails/>
        },
        /* end Team */
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
