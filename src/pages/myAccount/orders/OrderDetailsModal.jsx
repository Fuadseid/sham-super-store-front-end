import React from 'react';
import {
    Eye,
    RotateCcw,
    X,
    Package,
    DollarSign,
    MapPin,
    CreditCard,
    Truck,
    FileText,
    Download,
    Clock
} from 'lucide-react';
import './OrderDetailsModal.scss';

const OrderDetailsModal = ({
    show,
    order,
    onClose,
    onRefundRequest,
    formatDate,
    formatPrice,
    formatAddress,
    getStatusBadge,
    canRefund
}) => {
    if (!show || !order) return null;

    const handleRefundClick = () => {
        onClose();
        onRefundRequest(order);
    };

    return (
        <div className="modal-overlay">
            <div className="view-modal">
                <div className="modal-header">
                    <h3>
                        <Eye size={24} />
                        Order Details #{order.id}
                    </h3>
                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <h4>
                            <Package size={18} />
                            Order Summary
                        </h4>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="label">Order Number:</span>
                                <span className="value">#{order.id}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Order Date:</span>
                                <span className="value">{formatDate(order.date)}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Status:</span>
                                <span className="value">{getStatusBadge(order.status)}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Total Amount:</span>
                                <span className="value price">{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="order-items-section">
                        <h4>
                            <Package size={18} />
                            Items ({order.items.length})
                        </h4>
                        <div className="items-list">
                            {order.items.map((item) => (
                                <div key={item.id} className="item-card">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h5>{item.name}</h5>
                                        <p className="item-sku">SKU: {item.sku}</p>
                                        <div className="item-meta">
                                            <span>Qty: {item.quantity}</span>
                                            <span>Price: {formatPrice(item.price)}</span>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        {formatPrice(item.quantity * item.price)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="payment-section">
                        <h4>
                            <DollarSign size={18} />
                            Payment Summary
                        </h4>
                        <div className="payment-details">
                            <div className="payment-method">
                                <CreditCard size={16} />
                                <span>{order.payment.method}</span>
                                {order.payment.cardLast4 && (
                                    <span className="card-info">•••• {order.payment.cardLast4}</span>
                                )}
                            </div>
                            <div className="payment-breakdown">
                                <div className="breakdown-item">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                {order.tax > 0 && (
                                    <div className="breakdown-item">
                                        <span>Tax</span>
                                        <span>{formatPrice(order.tax)}</span>
                                    </div>
                                )}
                                {order.shippingCost > 0 && (
                                    <div className="breakdown-item">
                                        <span>Shipping</span>
                                        <span>{formatPrice(order.shippingCost)}</span>
                                    </div>
                                )}
                                <div className="breakdown-item total">
                                    <span>Total</span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="shipping-section">
                        <h4>
                            <Truck size={18} />
                            Shipping Information
                        </h4>
                        <div className="shipping-details">
                            <div className="shipping-method">
                                <div className="method-info">
                                    <span className="method-name">{order.shippingDetails.method}</span>
                                    <span className="carrier">via {order.shippingDetails.carrier}</span>
                                </div>
                                {order.shippingDetails.trackingNumber && (
                                    <div className="tracking-info">
                                        <span className="tracking-label">Tracking:</span>
                                        <span className="tracking-number">{order.shippingDetails.trackingNumber}</span>
                                    </div>
                                )}
                                {order.shippingDetails.estimatedDelivery && (
                                    <div className="delivery-info">
                                        <Clock size={14} />
                                        <span>Estimated Delivery: {formatDate(order.shippingDetails.estimatedDelivery)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="addresses-section">
                        <h4>
                            <MapPin size={18} />
                            Addresses
                        </h4>
                        <div className="addresses-grid">
                            <div className="address-card">
                                <h5>
                                    <Truck size={16} />
                                    Shipping Address
                                </h5>
                                <div className="address-content">
                                    <p className="address-name">{order.shippingAddress.name}</p>
                                    <p className="address-details">{formatAddress(order.shippingAddress)}</p>
                                </div>
                            </div>
                            <div className="address-card">
                                <h5>
                                    <CreditCard size={16} />
                                    Billing Address
                                </h5>
                                <div className="address-content">
                                    <p className="address-name">{order.billingAddress.name}</p>
                                    <p className="address-details">{formatAddress(order.billingAddress)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="modal-actions">
                    <button
                        className="close-btn-action"
                        onClick={onClose}
                    >
                        <X size={16} />
                        Close
                    </button>

                    {canRefund(order) && (
                        <button
                            className="refund-btn-action"
                            onClick={handleRefundClick}
                        >
                            <RotateCcw size={16} />
                            Request Refund
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;