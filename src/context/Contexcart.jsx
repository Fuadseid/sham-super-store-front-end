import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { useGetCartQuery } from "../stores/apiSlice";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const CartProviderr  = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const { 
    data: carts, 
    isLoading, 
    isError, 
    error,
    refetch: refetchCartQuery 
  } = useGetCartQuery();

  // Update cart items when data changes
  useEffect(() => {
    if (carts?.data?.items) {
      dispatch({ type: "SET_CART_ITEMS", payload: carts.data.items });
    } else if (carts?.items) {
      dispatch({ type: "SET_CART_ITEMS", payload: carts.items });
    }
  }, [carts]);

  // Update loading state
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, [isLoading]);

  // Update error state
  useEffect(() => {
    if (isError) {
      dispatch({ 
        type: "SET_ERROR", 
        payload: error?.data?.message || "Failed to load cart" 
      });
    }
  }, [isError, error]);

  // Enhanced refetchCart function with proper error handling
  const refetchCart = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "CLEAR_ERROR" });
      
      console.log("Refetching cart data...");
      const result = await refetchCartQuery();
      console.log("Cart refetch result:", result);
      
      if (result.data) {
        const items = result.data.data?.items || result.data.items || [];
        dispatch({ type: "SET_CART_ITEMS", payload: items });
        return { success: true, data: items };
      } else {
        throw new Error("Failed to refetch cart");
      }
    } catch (err) {
      console.error("Error refetching cart:", err);
      dispatch({ 
        type: "SET_ERROR", 
        payload: err.message || "Failed to refetch cart" 
      });
      return { success: false, error: err.message };
    }
  }, [refetchCartQuery]);

  const value = {
    cartItems: state.items,
    isLoading: state.isLoading,
    error: state.error,
    refetchCart,
    clearError: () => dispatch({ type: "CLEAR_ERROR" }),
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