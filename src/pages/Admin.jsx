import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table1 from "../components/admin/Table1";
import AdminInfo from "../components/admin/AdminInfo";
const Admin = () => {
  const [info, setInfo] = useState({
    id: getCookie("id"),
    email: getCookie("email"),
    name: getCookie("name"),
  });

  const[checklogOut , setCheckLogOut]=useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    if (!info.id) {
      navigate(`/`);
    }
  }, [checklogOut]);
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }
  console.log(info);
  return (
    <>
      <h1 style={{ fontStyle: "oblique", textAlign: "center" }}>Admin Page</h1>
      <AdminInfo info={info} setCheckLogOut={setCheckLogOut} setInfo={setInfo}/>
<Table1/>
    </>
  );
};

export default Admin;
