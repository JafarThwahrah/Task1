import "../../styles/AdminInfo.css";
const AdminInfo = ({ info }) => {
  return (
    <>
      <div className="adminInfo">
        <h4>
          Username : <span className="nameAndEmail">{info.name} </span>
        </h4>
        <h4>
          Email: <span className="nameAndEmail">{info.email} </span>
        </h4>
      </div>
    </>
  );
};

export default AdminInfo;
