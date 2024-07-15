import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Registration from "./components/Registration";
import store from "./app/store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
