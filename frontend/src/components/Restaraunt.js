import { Link } from "react-router-dom";
import DishesPage from "../pages/RestarauntPage";
const Restaraunt = (props) => {
  const { restarauntInfo, handleDelete } = props;

  return (
    <div key={restarauntInfo.idRestaraunt} className="card">
      <img
        className="resto-img"
        alt={restarauntInfo.name}
        src={restarauntInfo.image}
      ></img>
      <h3 className="resto-name">{restarauntInfo.name}</h3>
      <div class="divider"></div>
      <p className="resto-address">{restarauntInfo.address}</p>
      <div class="divider"></div>
      <div className="link-box">
        <Link className="link dishes" to="/restaraunt/">
          View Dishes
        </Link>
        <Link
          onClick={() => handleDelete(restarauntInfo.idRestaraunt)}
          className="link delete"
          to="/"
        >
          Delete Restaraunt
        </Link>
      </div>
    </div>
  );
};
export default Restaraunt;
