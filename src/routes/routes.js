import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Map from "../pages/Map";
import New from "../pages/New";
import About from "../pages/About";
import AdminPanel from "../pages/AdminPanel";
import Reg from "../pages/reg";
import Signup from "../pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/map" element={<Map />}></Route>
      <Route path="/news" element={<New />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/reg" element={<Signup />}></Route>
      <Route path="/admin" element={<AdminPanel />}></Route>
    </Routes>
  );
};

export default AppRoutes
