import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Truck, Package, Mail, Phone, MapPin, ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useVerifyStripeOrderMutation } from '../../stores/apiSlice'; // Import your API hook

const OrderSuccess = () => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');

    // Use the mutation hook
    const [verifyStripeOrder] = useVerifyStripeOrderMutation();

    useEffect(() => {
        const verifyOrder = async () => {
            if (!sessionId || !orderId) {
                setError('Missing order information');
                setLoading(false);
                return;
            }

            try {
                // Call your backend to verify the Stripe session and get order details
                const response = await verifyStripeOrder({
                    session_id: sessionId,
                    order_id: parseInt(orderId)
                }).unwrap();

                if (response.success) {
                    setOrderDetails(response.order);
                } else {
                    setError(response.message || 'Failed to verify order');
                }
            } catch (err) {
                console.error('Error verifying order:', err);
                setError('Failed to verify order. Please contact support.');
            } finally {
                setLoading(false);
            }
        };

        verifyOrder();
    }, [sessionId, orderId, verifyStripeOrder]);

    const handleContinueShopping = () => {
        navigate('/shop');
    };

    const handleViewOrder = () => {
        if (orderDetails) {
            navigate(`/orders/${orderDetails.id}`);
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    // Loading State
    if (loading) {
        return (
            <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                        <div className="animate-pulse">
                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="text-2xl">❌</div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {t('checkout.error.title') || 'Order Verification Failed'}
                        </h1>
                        <p className="text-gray-600 mb-6 text-lg">
                            {error}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGoHome}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Go Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success State
    return (
        <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleGoHome}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Success Header */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {t('checkout.success.title') || 'Order Successful!'}
                            </h1>
                            <p className="text-gray-600 mb-6 text-lg">
                                {t('checkout.success.message') || 'Thank you for your purchase. Your order has been confirmed and will be shipped soon.'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-600 mb-1">Order Number</div>
                                    <div className="font-semibold text-gray-900">{orderDetails.id}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                                    <div className="font-semibold text-gray-900">${orderDetails.total?.toFixed(2)}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-600 mb-1">Status</div>
                                    <div className="font-semibold text-green-600 capitalize">{orderDetails.payment_status}</div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                            <div className="flex items-center mb-6">
                                <Package className="w-6 h-6 text-blue-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                            </div>
                            <div className="space-y-4">
                                {orderDetails.items?.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-gray-900">
                                                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                ${(item.price || 0).toFixed(2)} each
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex items-center mb-6">
                                <Truck className="w-6 h-6 text-blue-600 mr-3" />
                                <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-gray-900">{orderDetails.shipping_address?.name}</p>
                                                <p className="text-gray-600">{orderDetails.shipping_address?.address_line1}</p>
                                                <p className="text-gray-600">
                                                    {orderDetails.shipping_address?.city}, {orderDetails.shipping_address?.country} {orderDetails.shipping_address?.zip_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Delivery Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Estimated Delivery</span>
                                            <span className="font-medium text-gray-900">
                                                {orderDetails.estimated_delivery ? 
                                                    new Date(orderDetails.estimated_delivery).toLocaleDateString() : 
                                                    'To be confirmed'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Tracking Number</span>
                                            <span className="font-medium text-gray-900">
                                                {orderDetails.tracking_number || 'Not available yet'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Shipping Method</span>
                                            <span className="font-medium text-gray-900">Standard Shipping</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Mail className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Order Confirmation</p>
                                        <p className="text-sm text-gray-600">
                                            We've sent a confirmation email to {orderDetails.customer_email}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Package className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Order Processing</p>
                                        <p className="text-sm text-gray-600">
                                            Your order is being prepared for shipment
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Truck className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Shipping</p>
                                        <p className="text-sm text-gray-600">
                                            You'll receive tracking information once shipped
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleViewOrder}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    View Order Details
                                </button>
                                <button
                                    onClick={handleContinueShopping}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleGoHome}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Go to Homepage
                                </button>
                            </div>

                            {/* Support Section */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">support@example.com</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">+1 (555) 123-4567</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                        
                        {/* Steps */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-green-600">Order Placed</span>
                            <span className="text-xs text-gray-500 mt-1">Just now</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                <Package className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Processing</span>
                            <span className="text-xs text-gray-500 mt-1">Next</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                <Truck className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Shipped</span>
                            <span className="text-xs text-gray-500 mt-1">
                                {orderDetails.estimated_delivery ? 
                                    new Date(orderDetails.estimated_delivery).toLocaleDateString() : 
                                    'Soon'}
                            </span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Delivered</span>
                            <span className="text-xs text-gray-500 mt-1">Estimated</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;