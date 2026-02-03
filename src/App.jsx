import React from "react";
import { lazy } from "react";
const NewProp = lazy(() => import("./NewProp"));

const App = () => {
  return (
    <div>
      <NewProp />
    </div>
  );
};

export default App;
