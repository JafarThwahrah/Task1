import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table1 from "../components/admin/AdminConfigList";
import AdminInfo from "../components/admin/AdminInfo";
import Table2 from "../components/admin/CountriesList";
import getCookie from "../customHooks/GetCookie";
const Admin = () => {
  const [info, setInfo] = useState({
    id: getCookie("id"),
    email: getCookie("email"),
    name: getCookie("name"),
    token: getCookie("token"),
  });

  const [checklogOut, setCheckLogOut] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!info.id) {
      navigate(`/`);
    }
  }, [checklogOut]);

  return (
    <>
      <h1 style={{ fontStyle: "oblique", textAlign: "center" }}>Admin Page</h1>
      <AdminInfo
        info={info}
        setCheckLogOut={setCheckLogOut}
        setInfo={setInfo}
      />
      <div className="infoAndBtnContainer">
        <Table1 token={info.token} />
        <Table2 token={info.token} />
      </div>
    </>
  );
};

export default Admin;
