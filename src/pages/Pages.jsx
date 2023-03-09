import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import CountryDetails from "./CountryDetails";
import Err from "./Err";
import Unauthorized from "./Unauthorized";
import RequiredAuth from "../customHooks/RequiredAuth";
const Pages = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<RequiredAuth />}>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/countries/view/:id"
            element={<CountryDetails />}
          />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Err />} />
      </Routes>
    </>
  );
};

export default Pages;
