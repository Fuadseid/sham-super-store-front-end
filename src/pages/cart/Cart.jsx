import { useState } from 'react';
import { Minus, Plus, X, RefreshCw, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';

const Cart = () => {
    const {
        items,
        updateQuantity,
        removeFromCart,
        getSubtotal,
        getTotalPrice
    } = useCart();

    const { t } = useLanguage();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');
    const [savedItems, setSavedItems] = useState([]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleSaveForLater = (item) => {
        setSavedItems(prev => [...prev, item]);
        removeFromCart(item.id);
    };

    const handleMoveToCart = (item) => {
        setSavedItems(prev => prev.filter(savedItem => savedItem.id !== item.id));
    };

    const handleRemoveSaved = (itemId) => {
        setSavedItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleApplyCoupon = () => {
        console.log('Applying coupon:', couponCode);
    };

    const handleRefreshCart = () => {
        console.log('Refreshing cart...');
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    const shippingFee = 0;
    const totalAmount = getTotalPrice() + shippingFee;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-content">
                    <div className="cart-main">
                        <h1 className="cart-title">{t('cart.title')}</h1>

                        {items.length === 0 ? (
                            <div className="cart-empty">
                                <div className="empty-cart-icon">🛒</div>
                                <h2>{t('cart.empty.heading')}</h2>
                                <p>{t('cart.empty.description')}</p>
                                <button
                                    className="continue-shopping-btn"
                                    onClick={() => navigate('/shop')}
                                >
                                    {t('cart.empty.continueShoppingBtn')}
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-table">
                                    <div className="cart-table-header">
                                        <div className="header-product">{t('cart.table.headers.product')}</div>
                                        <div className="header-price">{t('cart.table.headers.price')}</div>
                                        <div className="header-quantity">{t('cart.table.headers.quantity')}</div>
                                        <div className="header-subtotal">{t('cart.table.headers.subtotal')}</div>
                                    </div>

                                    <div className="cart-table-body">
                                        {items.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <div className="item-product">
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                        aria-label={t('cart.item.removeItem')}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                    <div className="product-image">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="product-details">
                                                        <h3 className="product-name">{item.name}</h3>
                                                        <button
                                                            className="save-for-later-btn"
                                                            onClick={() => handleSaveForLater(item)}
                                                        >
                                                            <Heart size={14} />
                                                            <span>{t('cart.item.saveForLater')}</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="item-price">
                                                    ${item.price.toFixed(2)}
                                                </div>

                                                <div className="item-quantity">
                                                    <div className="quantity-controls">
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            aria-label={t('cart.item.decreaseQuantity')}
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="quantity-value">{item.quantity}</span>
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            aria-label={t('cart.item.increaseQuantity')}
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="item-subtotal">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <div className="coupon-section">
                                        <input
                                            type="text"
                                            placeholder={t('cart.actions.couponPlaceholder')}
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="coupon-input"
                                        />
                                        <button
                                            className="apply-coupon-btn"
                                            onClick={handleApplyCoupon}
                                        >
                                            {t('cart.actions.applyCouponBtn')}
                                        </button>
                                    </div>

                                    <button
                                        className="refresh-cart-btn"
                                        onClick={handleRefreshCart}
                                    >
                                        <RefreshCw size={16} />
                                        {t('cart.actions.refreshCartBtn')}
                                    </button>
                                </div>

                                {savedItems.length > 0 && (
                                    <div className="saved-items-section">
                                        <h2 className="saved-items-title">{t('cart.savedItems.title')}</h2>
                                        <div className="saved-items-grid">
                                            {savedItems.map((item) => (
                                                <div key={`saved-${item.id}`} className="saved-item">
                                                    <button
                                                        className="remove-saved-btn"
                                                        onClick={() => handleRemoveSaved(item.id)}
                                                        aria-label={t('cart.savedItems.removeFromSaved')}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <div className="saved-item-image">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="saved-item-details">
                                                        <h4 className="saved-item-name">{item.name}</h4>
                                                        <div className="saved-item-price">${item.price.toFixed(2)}</div>
                                                        <button
                                                            className="move-to-cart-btn"
                                                            onClick={() => handleMoveToCart(item)}
                                                        >
                                                            {t('cart.savedItems.moveToCartBtn')}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="cart-sidebar">
                            <div className="cart-totals">
                                <h2 className="totals-title">{t('cart.totals.title')}</h2>

                                <div className="totals-row">
                                    <span>{t('cart.totals.subtotal')}</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="shipping-section">
                                    <div className="shipping-header">
                                        <span>{t('cart.totals.shipping')}</span>
                                    </div>
                                    <div className="shipping-info">
                                        <p>{t('cart.totals.shippingMessage', { address: 'danaes, TX, 43243, Syria' })}</p>
                                        <button className="change-address-btn">
                                            <MapPin size={14} />
                                            {t('cart.totals.changeAddressBtn')}
                                        </button>
                                    </div>
                                </div>

                                <div className="totals-row total-row">
                                    <span>{t('cart.totals.total')}</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>

                                <button
                                    className="checkout-btn"
                                    onClick={handleProceedToCheckout}
                                >
                                    {t('cart.totals.checkoutBtn')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;