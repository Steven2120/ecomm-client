import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import {
  addToCart,
  removeFromCart,
} from "../components/Redux/actions/cartActions";
import "./CartInfoScreen.css";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  return (
    <div className="cart__info__screen">
      <div className="cart__info__left">
        <h2 className="cart__title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty__message">
            Your cart is empty <Link to="/">Return to Shop</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>
      <div className="cart__info__right">
        <div>
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartSubTotal().toFixed(2)}</p>
        </div>
        <div className="proceed__to__checkout__btn__div">
          <Link to="/checkout">
            <button>Proceed To Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
