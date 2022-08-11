import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/products");

    dispatch({ type: actionTypes.GET_PRODUCTS_REQ });

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCTS_REQ,
    });

    dispatch({
      type: actionTypes.GET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetailsReset = () => (dispatch) => {
  dispatch({
    type: actionTypes.RESET_DETAILS,
  });
};
