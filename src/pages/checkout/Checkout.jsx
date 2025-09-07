import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Check } from 'lucide-react';
import './Checkout.scss';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';
import ReviewPopup from '../../components/reviewPopup/ReviewPopup';

const Checkout = () => {
    const { items, getTotalPrice, clearCart } = useCart();
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();

    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postcode: '',
        phone: '',
        email: '',
        createAccount: false,
        password: '',
        orderNotes: ''
    });

    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        postcode: ''
    });

    const [shippingToBilling, setShippingToBilling] = useState(true);
    const [shippingMethod, setShippingMethod] = useState('free');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({});

    const shippingOptions = {
        free: { price: 0, label: t('checkout.order.freeShipping') || 'Free Shipping' },
        standard: { price: 5.99, label: t('checkout.order.standardShipping') || 'Standard Shipping' },
        express: { price: 15.99, label: t('checkout.order.expressShipping') || 'Express Shipping' }
    };

    const handleBillingChange = (field, value) => {
        setBillingDetails(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleShippingChange = (field, value) => {
        setShippingDetails(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postcode'];

        requiredFields.forEach(field => {
            if (!billingDetails[field]) {
                newErrors[field] = t(`checkout.validation.${field}`) || `${field} is required`;
            }
        });

        if (!paymentMethod) {
            newErrors.paymentMethod = t('checkout.validation.paymentMethod') || 'Please select a payment method';
        }

        if (billingDetails.email && !/\S+@\S+\.\S+/.test(billingDetails.email)) {
            newErrors.email = t('checkout.validation.email') || 'Valid email is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const newOrderNumber = 'ORD-' + Date.now();
            setOrderNumber(newOrderNumber);
            setIsProcessing(false);
            setOrderComplete(true);

            setTimeout(() => {
                setShowReviewPopup(true);
            }, 2000);
        }, 3000);
    };

    const handleContinueShopping = () => {
        navigate('/shop');
    };

    const testReviewPopup = () => {
        console.log('Testing review popup...');
        setShowReviewPopup(true);
    };

    const subtotal = getTotalPrice();
    const shippingCost = shippingOptions[shippingMethod].price;
    const total = subtotal + shippingCost;

    if (items.length === 0 && !orderComplete) {
        return (
            <div className={`checkout-page ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="checkout-container">
                    <div className="empty-checkout">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to your cart before checkout.</p>
                        <button
                            className="continue-shopping-btn"
                            onClick={() => navigate('/shop')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className={`checkout-page ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="checkout-container">
                    <div className="order-success">
                        <div className="success-icon">
                            <Check size={48} />
                        </div>
                        <h1>{t('checkout.success.title') || 'Order Successful!'}</h1>
                        <p>{t('checkout.success.message') || 'Thank you for your purchase. Your order has been placed successfully.'}</p>
                        <div className="order-info">
                            <span>{t('checkout.success.orderNumber') || 'Order Number'}: </span>
                            <strong>{orderNumber}</strong>
                        </div>

                        <button
                            className="continue-shopping-btn"
                            onClick={handleContinueShopping}
                        >
                            {t('checkout.success.continueShopping') || 'Continue Shopping'}
                        </button>
                    </div>
                </div>

                {showReviewPopup && (
                    <ReviewPopup
                        isOpen={showReviewPopup}
                        onClose={() => {
                            setShowReviewPopup(false);
                        }}
                        orderNumber={orderNumber}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={`checkout-page ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="checkout-container">
                <h1 className="checkout-title">{t('checkout.title') || 'Checkout'}</h1>

                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="checkout-content">
                        <div className="checkout-main">
                            <div className="billing-section">
                                <h2><CreditCard size={20} /> {t('checkout.billing.title') || 'Billing Details'}</h2>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('checkout.billing.firstName') || 'First Name'} *</label>
                                        <input
                                            type="text"
                                            value={billingDetails.firstName}
                                            onChange={(e) => handleBillingChange('firstName', e.target.value)}
                                            className={errors.firstName ? 'error' : ''}
                                        />
                                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('checkout.billing.lastName') || 'Last Name'} *</label>
                                        <input
                                            type="text"
                                            value={billingDetails.lastName}
                                            onChange={(e) => handleBillingChange('lastName', e.target.value)}
                                            className={errors.lastName ? 'error' : ''}
                                        />
                                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t('checkout.billing.company') || 'Company Name (Optional)'}</label>
                                    <input
                                        type="text"
                                        value={billingDetails.company}
                                        onChange={(e) => handleBillingChange('company', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t('checkout.billing.email') || 'Email Address'} *</label>
                                    <input
                                        type="email"
                                        value={billingDetails.email}
                                        onChange={(e) => handleBillingChange('email', e.target.value)}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label>{t('checkout.billing.phone') || 'Phone'} *</label>
                                    <input
                                        type="tel"
                                        value={billingDetails.phone}
                                        onChange={(e) => handleBillingChange('phone', e.target.value)}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label>{t('checkout.billing.address') || 'Street Address'} *</label>
                                    <input
                                        type="text"
                                        value={billingDetails.address}
                                        onChange={(e) => handleBillingChange('address', e.target.value)}
                                        className={errors.address ? 'error' : ''}
                                    />
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('checkout.billing.city') || 'Town / City'} *</label>
                                        <input
                                            type="text"
                                            value={billingDetails.city}
                                            onChange={(e) => handleBillingChange('city', e.target.value)}
                                            className={errors.city ? 'error' : ''}
                                        />
                                        {errors.city && <span className="error-message">{errors.city}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('checkout.billing.postcode') || 'Postcode / ZIP'} *</label>
                                        <input
                                            type="text"
                                            value={billingDetails.postcode}
                                            onChange={(e) => handleBillingChange('postcode', e.target.value)}
                                            className={errors.postcode ? 'error' : ''}
                                        />
                                        {errors.postcode && <span className="error-message">{errors.postcode}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t('checkout.billing.orderNotes') || 'Order Notes (Optional)'}</label>
                                    <textarea
                                        value={billingDetails.orderNotes}
                                        onChange={(e) => handleBillingChange('orderNotes', e.target.value)}
                                        placeholder={t('checkout.billing.orderNotesPlaceholder') || 'Notes about your order, e.g. special notes for delivery.'}
                                        rows={4}
                                    />
                                </div>
                            </div>

                            {/* Shipping Methods */}
                            {/* <div className="shipping-methods-section">
                                <h2><Truck size={20} /> {t('checkout.order.shippingMethod') || 'Shipping Method'}</h2>
                                <div className="shipping-options">
                                    {Object.entries(shippingOptions).map(([key, option]) => (
                                        <label key={key} className="shipping-option">
                                            <input
                                                type="radio"
                                                value={key}
                                                checked={shippingMethod === key}
                                                onChange={(e) => setShippingMethod(e.target.value)}
                                            />
                                            <span className="option-content">
                                                <span className="option-label">{option.label}</span>
                                                <span className="option-price">
                                                    {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                                                </span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div> */}

                            <div className="payment-section">
                                <h2><CreditCard size={20} /> {t('checkout.order.paymentMethod') || 'Payment Method'}</h2>
                                {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}

                                <div className="payment-options">
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            value="direct_bank"
                                            checked={paymentMethod === 'direct_bank'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="option-content">
                                            <span className="option-title">{t('checkout.order.directBank') || 'Direct Bank Transfer'}</span>
                                            <p className="option-desc">{t('checkout.order.directBankDesc') || 'Make your payment directly into our bank account. Please use your Order ID as the payment reference.'}</p>
                                        </div>
                                    </label>

                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            value="cash_on_delivery"
                                            checked={paymentMethod === 'cash_on_delivery'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="option-content">
                                            <span className="option-title">{t('checkout.order.cashOnDelivery') || 'Cash on Delivery'}</span>
                                            <p className="option-desc">{t('checkout.order.cashOnDeliveryDesc') || 'Pay with cash upon delivery.'}</p>
                                        </div>
                                    </label>

                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="option-content">
                                            <span className="option-title">{t('checkout.order.paypal') || 'PayPal'}</span>
                                            <p className="option-desc">{t('checkout.order.paypalDesc') || 'Pay via PayPal; you can pay with your credit card if you don\'t have a PayPal account.'}</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="checkout-sidebar">
                            <div className="order-summary">
                                <h2>{t('checkout.order.title') || 'Your Order'}</h2>

                                <div className="order-items">
                                    {items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.name}</h4>
                                                <span className="quantity">Qty: {item.quantity}</span>
                                            </div>
                                            <div className="item-price">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-totals">
                                    <div className="total-row">
                                        <span>{t('checkout.order.subtotal') || 'Subtotal'}</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>{t('checkout.order.shipping') || 'Shipping'}</span>
                                        <span>
                                            {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="total-row final-total">
                                        <span>{t('checkout.order.total') || 'Total'}</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="privacy-notice">
                                    <p>
                                        {t('checkout.order.privacyPolicy') || 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our'} {' '}
                                        <a href="/privacy-policy" target="_blank">
                                            {t('checkout.order.privacyPolicyLink') || 'privacy policy'}
                                        </a>.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="place-order-btn"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (t('checkout.order.processing') || 'Processing Order...') : (t('checkout.order.placeOrder') || 'Place Order')}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;