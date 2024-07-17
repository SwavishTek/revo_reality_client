import React from "react";
import { Suspense } from "react";
// import Loader from "./Loader";

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
