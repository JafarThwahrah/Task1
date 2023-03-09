import AdminConfigList from "../components/admin/AdminConfigList";
import AdminInfo from "../components/admin/AdminInfo";
import CountriesList from "../components/admin/CountriesList";
import getCookie from "../customHooks/GetCookie";

const Admin = () => {
  const Userinfo = {
    id: getCookie("id"),
    email: getCookie("email"),
    name: getCookie("name"),
    token: getCookie("token"),
  };

  return (
    <>
      <h1 style={{ fontStyle: "oblique", textAlign: "center" }}>Admin Page</h1>
      <div className="TablesContainerAndAdminInfo">
        <AdminInfo info={Userinfo} />
        <AdminConfigList token={Userinfo.token} />
        <CountriesList token={Userinfo.token} />
      </div>
    </>
  );
};

export default Admin;
