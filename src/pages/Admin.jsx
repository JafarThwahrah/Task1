import AdminConfigList from "../components/adminPageComponents/AdminConfigList";
import AdminInfo from "../components/adminPageComponents/AdminInfo";
import CountriesList from "../components/adminPageComponents/CountriesList";
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
