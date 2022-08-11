import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="item">
      <div className="item__image">
        <Link to={`/product/${item.product}`} className="item__name">
          <img src={item.imageUrl} alt={item.name} />
        </Link>
      </div>

      <Link to={`/product/${item.product}`} className="item__name">
        <p>{item.name}</p>
      </Link>
      <p className="item__price">${item.price}</p>

      <select
        className="item__select"
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

      <button
        className="delete__item__button"
        onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
