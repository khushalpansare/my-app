import React from "react";
import RegisterPage from "../src/Pages/RegisterPage";
import LoginPage from "../src/Pages/LoginPage";
import Listpage from "../src/Pages/Listpage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useRoutes,
} from "react-router-dom";
import Profile from "./Component/Profile";
import NavigationBar from "./Component/NavigationBar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route exact path="/loginpage" element={<LoginPage />} />
          <Route
            exact
            path="/todolist"
            element={[<NavigationBar />, <Listpage />]}
          />
          <Route
            exact
            path="/setting"
            element={[<NavigationBar />, <Profile />]}
          />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
