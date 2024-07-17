import React from "react";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";

const Dashboard = () => {
  const { data } = useProfileQuery();
  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
