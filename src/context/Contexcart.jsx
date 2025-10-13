import { createContext, useContext, useEffect, useReducer } from "react";
import { useGetCartQuery } from "../stores/apiSlice";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "REFETCH_CART":
      return {
        ...state,
        items: [...action.payload],
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  isLoading: false,
};

export const CartProviderr = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { data: carts, isLoading, isError, refetch: refetchCart } = useGetCartQuery();

  // Update cart items when data changes
 useEffect(() => {
    if (carts?.data?.items) {
      dispatch({ type: "REFETCH_CART", payload: carts.data.items });
    }
  }, [carts]);

  // Update loading state
useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, [isLoading]);

  const value = {
    state,
    dispatch,
    refetchCart, // Expose the refetch function
    isLoading: state.isLoading,
    isError,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;