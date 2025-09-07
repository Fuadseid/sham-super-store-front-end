import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartReducer';
import './FloatingCart.scss';

const FloatingCart = () => {
    const { toggleCart, getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <button
            className="floating-cart"
            onClick={toggleCart}
            aria-label={`Shopping cart with ${totalItems} items`}
        >
            <div className="floating-cart-icon">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="floating-cart-badge">
                        {totalItems > 99 ? '99+' : totalItems}
                    </span>
                )}
            </div>
        </button>
    );
};

export default FloatingCart;