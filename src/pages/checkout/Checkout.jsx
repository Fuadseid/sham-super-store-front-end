import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Check } from 'lucide-react';
import './Checkout.scss';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';
import ReviewPopup from '../../components/reviewPopup/ReviewPopup';
import { useGetCartQuery } from '../../stores/apiSlice';

const Checkout = () => {
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
    const { data: carts, isLoading, isError } = useGetCartQuery(); 
    const [cartData,setCartData] = useState();
    const [errors, setErrors] = useState({});
      useEffect(() => {
        if (carts) {
          setCartData(carts);
        }
      }, [carts]);
const cartItems = carts?.data.debug.processed_items;
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
                    <div className="">
                      
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