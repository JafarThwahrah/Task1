import "../../styles/AdminInfo.css";
import { useContext } from "react";
import { MyContext } from "../../App";
const AdminInfo = ({ info, setInfo, setCheckLogOut }) => {
  const myContextValue = useContext(MyContext);
  const handleLogOut = () => {
    setInfo({});
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCheckLogOut(true);
    myContextValue.setIsLoggedIn(!myContextValue.isLoggedIn);
  };
  return (
    <>
      <div className="infoAndBtnContainer">
        <div className="adminInfo">
          <h4>
            Your Name : <span className="nameAndEmail">{info.name} </span>
          </h4>
          <h4>
            Email: <span className="nameAndEmail">{info.email} </span>
          </h4>
        </div>
        <button onClick={handleLogOut} className="logOutBtn">
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminInfo;
