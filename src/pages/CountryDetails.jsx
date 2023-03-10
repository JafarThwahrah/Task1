import { useParams } from "react-router-dom";
import { useEffect } from "react";
import getCookie from "../customHooks/GetCookie";
import axios from "axios";
import { useState } from "react";
import "../styles/CountryDetails.css";
import { CircularProgress } from "@mui/material";
import useLogout from "../customHooks/Logout";

const CountryDetails = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useLogout();
  const token = getCookie("token");
  const params = useParams();
  useEffect(() => {
    const headers = { authorization: token };
    axios
      .post(
        `https://staging-blockchain-payment.livaat.com/api/countries/view`,
        { id: params.id },
        { headers: headers }
      )
      .then((res) => {
        setTimeout(() => {
          setCountryInfo(res.data.data);
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
        } else {
          console.log(err);
        }
      });
  }, [params.id, token]);
  return (
    <>
      {!isLoading && (
        <div className="countryDetails">
          <h1 className="countryDetailsTitle">Country Details</h1>
          <h3>
            Country ID :
            <span className="countryInfoLine"> {countryInfo?.id}</span>
          </h3>
          <h3>
            Country Name :
            <span className="countryInfoLine"> {countryInfo?.name}</span>
          </h3>
          <h3>
            Country Phone Code :
            <span className="countryInfoLine"> {countryInfo?.phone_code}</span>
          </h3>
          <h3>
            Country Code :
            <span className="countryInfoLine"> {countryInfo?.code}</span>
          </h3>
        </div>
      )}
      {isLoading && (
        <div className="CircularProgress">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default CountryDetails;
