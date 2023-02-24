import '../../styles/AdminInfo.css'
import axios from 'axios';
const AdminInfo = ({ info , setInfo , setCheckLogOut }) => {
    const handleLogOut = ()=>{
        setInfo({})
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setCheckLogOut(true)
        // const axiosAuth = "Bearer " + tokens;
        // axios.defaults.headers.common["Authorization"] = axiosAuth;
        // axios.get('https://staging-blockchain-payment.livaat.com/api/admins/logout').then((res)=>{
        //     console.log(res)
         
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }
  return (
    <>
      <div className='infoAndBtnContainer' >
        <div className="adminInfo">
        <h4> Your Name : <span className='nameAndEmail'>{info.name} </span></h4>
        <h4>Email: <span className='nameAndEmail'>{info.email} </span></h4>
      </div>
      <button onClick={handleLogOut} className='logOutBtn'>Logout</button>
      </div>

    </>
  );
};

export default AdminInfo;
