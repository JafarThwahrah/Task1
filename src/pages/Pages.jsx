import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import CountryDetails from "./CountryDetails";
import Err from "./Err";
import Unauthorized from "./Unauthorized";
const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/countries/view/:id" element={<CountryDetails />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </>
  );
};

export default Pages;
