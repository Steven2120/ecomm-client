import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ imageUrl, name, price, description, productId }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__details">
        <Link to={`/product/${productId}`}>
          <p className="details__name">{name.substring(0, 41)}...</p>
        </Link>
        <p className="details__description">
          {description.substring(0, 101)}...
        </p>
        <p className="details__price">${price}</p>

        <Link to={`/product/${productId}`} className="details__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
