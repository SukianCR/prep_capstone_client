import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration";
import Home from "./components/Home";
import store from "./app/store.js";
import { Provider } from "react-redux";
import Protected from "./components/Protected.jsx";


// uncomment home page
function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Protected />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>   
          <Route path="/registration" element={<Registration />}></Route>
          
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
