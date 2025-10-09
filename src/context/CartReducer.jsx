import { createContext, useContext, useReducer } from 'react';
import { useGetCartQuery } from '../stores/apiSlice';

const CartContext = createContext();

const cartReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                        : item
                ).filter(item => item.quantity > 0)
            };

        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen
            };

        case 'CLOSE_CART':
            return {
                ...state,
                isOpen: false
            };

        default:
            return state;
    }
};

const initialState = {
    items: [
        // Mock data for demonstration
        {
            id: 1,
            name: 'Neque porro',
            price: 800.00,
            image: '/api/placeholder/60/60'
        },
        {
            id: 2,
            name: 'Phasellus molestie id mi sit amet',
            price: 340.00,
            image: '/api/placeholder/60/60'
        },
        {
            id: 3,
            name: 'Aliquam erat volutpat',
            price: 450.00,
            image: '/api/placeholder/60/60'
        }
    ],
    isOpen: false
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    const getTotalItems = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getSubtotal = () => {
        return getTotalPrice();
    };

    const value = {
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
        getSubtotal
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
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};