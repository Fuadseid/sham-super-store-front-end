import { useEffect } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';
import './SidebarCart.scss';

const SidebarCart = () => {
    const {
        items,
        isOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        getSubtotal,
        getTotalPrice
    } = useCart();

    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCart();
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleViewCart = () => {
        closeCart();
        navigate('/cart');
    };

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <>
            <div
                className={`sidebar-cart-overlay ${isOpen ? 'sidebar-cart-overlay-active' : ''}`}
                onClick={handleOverlayClick}
            />

            <div className={`sidebar-cart ${isOpen ? 'sidebar-cart-open' : ''}`}>
                <div className="sidebar-cart-header">
                    <h3>{t('sidebarCart.title')}</h3>
                    <button
                        className="sidebar-cart-close"
                        onClick={closeCart}
                        aria-label={t('sidebarCart.closeCart')}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-cart-content">
                    {items.length === 0 ? (
                        <div className="sidebar-cart-empty">
                            <p>{t('sidebarCart.empty')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="sidebar-cart-items">
                                {items.map((item) => (
                                    <div key={item.id} className="sidebar-cart-item">
                                        <div className="sidebar-cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="sidebar-cart-item-details">
                                            <h4 className="sidebar-cart-item-name">{item.name}</h4>
                                            <div className="sidebar-cart-item-price">${item.price.toFixed(2)}</div>

                                            <div className="sidebar-cart-item-controls">
                                                <div className="sidebar-cart-item-quantity">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        aria-label={t('sidebarCart.item.decreaseQuantity')}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="quantity-value">{item.quantity}</span>
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        aria-label={t('sidebarCart.item.increaseQuantity')}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="sidebar-cart-item-remove"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label={t('sidebarCart.item.removeItem')}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="sidebar-cart-summary">
                                <div className="sidebar-cart-subtotal">
                                    <span>{t('sidebarCart.summary.subtotal')}</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="sidebar-cart-shipping">
                                    <span>{t('sidebarCart.summary.shipping')}</span>
                                    <span>$0.00</span>
                                </div>

                                <div className="sidebar-cart-total">
                                    <span>{t('sidebarCart.summary.total')}</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>

                                <div className="sidebar-cart-promo">
                                    <input
                                        type="text"
                                        placeholder={t('sidebarCart.summary.promoPlaceholder')}
                                        className="promo-input"
                                    />
                                    <button className="promo-btn">
                                        {t('sidebarCart.summary.promoApply')}
                                    </button>
                                </div>

                                <div className="sidebar-cart-actions">
                                    <button
                                        className="view-cart-btn"
                                        onClick={handleViewCart}
                                    >
                                        {t('sidebarCart.actions.viewCart')}
                                    </button>
                                    <button
                                        className="checkout-btn"
                                        onClick={handleCheckout}
                                    >
                                        {t('sidebarCart.actions.checkout')}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarCart;