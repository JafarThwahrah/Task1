import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import CountryDetails from "./CountryDetails";
const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/countries/view/:id" element={<CountryDetails />} />
      </Routes>
    </>
  );
};

export default Pages;
