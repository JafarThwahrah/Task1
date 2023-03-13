import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";

const useLogout = () => {
  const myContextValue = useContext(MyContext);
  const navigate = useNavigate();
  const logout = () => {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    myContextValue.setIsLoggedIn(!myContextValue.isLoggedIn);
    navigate(`/`);
  };

  return { logout };
};

export default useLogout;
