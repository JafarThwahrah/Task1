import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
import getCookie from "./GetCookie";
import axios from "axios";
const useLogout = () => {
  const myContextValue = useContext(MyContext);
  const navigate = useNavigate();
  const logout = () => {
    const token = getCookie("token");
    const headers = { Authorization: `${token}` };
    const req = async () => {
      try {
        const response = await axios.get(
          "https://staging-blockchain-payment.livaat.com/api/admins/logout",
          { headers }
        );
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        myContextValue.setIsLoggedIn(!myContextValue.isLoggedIn);
        navigate(`/`);
      } catch (err) {
        console.error(err);
      }
    };
    req();
  };

  return { logout };
};

export default useLogout;
