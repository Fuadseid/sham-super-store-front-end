import { useState } from 'react';
import {
    Eye,
    RotateCcw,
    X,
    ShoppingBag,
    Package,
    Calendar,
    DollarSign,
    AlertCircle
} from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';
import './Orders.scss';

const Orders = ({ onBrowseProducts, onViewOrder, onCancelOrder, onRefundOrder }) => {

    // Mock data for orders with comprehensive details
    const [orders] = useState([
        {
            id: '001',
            date: '2025-06-20',
            status: 'completed',
            total: 224.97,
            subtotal: 224.97,
            tax: 0,
            shippingCost: 0,
            items: [
                {
                    id: 1,
                    name: 'Wireless Bluetooth Headphones',
                    quantity: 2,
                    price: 99.99,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center',
                    sku: 'WBH-001'
                },
                {
                    id: 2,
                    name: 'Premium Phone Case',
                    quantity: 1,
                    price: 24.99,
                    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop&crop=center',
                    sku: 'PPC-002'
                }
            ],
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main Street',
                street2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'United States'
            },
            billingAddress: {
                name: 'John Doe',
                street: '123 Main Street',
                street2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'United States'
            },
            payment: {
                method: 'Credit Card',
                cardLast4: '4242',
                cardBrand: 'Visa'
            },
            shippingDetails: {
                method: 'Standard Shipping',
                carrier: 'FedEx',
                trackingNumber: 'FX123456789',
                estimatedDelivery: '2025-06-25'
            },
            files: [
                { name: 'Order Receipt', type: 'PDF', url: '#', icon: 'receipt' },
                { name: 'Shipping Label', type: 'PDF', url: '#', icon: 'shipping' }
            ]
        },
        {
            id: '002',
            date: '2025-06-19',
            status: 'completed',
            total: 89.97,
            subtotal: 89.97,
            tax: 0,
            shippingCost: 0,
            items: [
                {
                    id: 3,
                    name: 'Organic Cotton T-Shirt',
                    quantity: 3,
                    price: 29.99,
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center',
                    sku: 'OCT-003'
                }
            ],
            shippingAddress: {
                name: 'Jane Smith',
                street: '456 Oak Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210',
                country: 'United States'
            },
            billingAddress: {
                name: 'Jane Smith',
                street: '456 Oak Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210',
                country: 'United States'
            },
            payment: {
                method: 'Credit Card',
                cardLast4: '5555',
                cardBrand: 'Mastercard'
            },
            shippingDetails: {
                method: 'Express Shipping',
                carrier: 'UPS',
                trackingNumber: 'UPS987654321',
                estimatedDelivery: '2025-06-22'
            },
            files: [
                { name: 'Order Receipt', type: 'PDF', url: '#', icon: 'receipt' }
            ]
        },
        {
            id: '003',
            date: '2025-06-21',
            status: 'processing',
            total: 339.97,
            subtotal: 339.97,
            tax: 0,
            shippingCost: 0,
            items: [
                {
                    id: 4,
                    name: 'Smart Watch',
                    quantity: 1,
                    price: 299.99,
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center',
                    sku: 'SW-004'
                },
                {
                    id: 5,
                    name: 'Watch Band',
                    quantity: 2,
                    price: 19.99,
                    image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=100&h=100&fit=crop&crop=center',
                    sku: 'WB-005'
                }
            ],
            shippingAddress: {
                name: 'Mike Johnson',
                street: '789 Pine Street',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                country: 'United States'
            },
            billingAddress: {
                name: 'Mike Johnson',
                street: '789 Pine Street',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                country: 'United States'
            },
            payment: {
                method: 'PayPal',
                cardLast4: null,
                cardBrand: 'PayPal'
            },
            shippingDetails: {
                method: 'Standard Shipping',
                carrier: 'USPS',
                trackingNumber: null,
                estimatedDelivery: '2025-06-28'
            },
            files: []
        },
        {
            id: '004',
            date: '2025-06-18',
            status: 'cancelled',
            total: 79.95,
            subtotal: 79.95,
            tax: 0,
            shippingCost: 0,
            items: [
                {
                    id: 6,
                    name: 'Coffee Mug Set',
                    quantity: 5,
                    price: 15.99,
                    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=100&h=100&fit=crop&crop=center',
                    sku: 'CMS-006'
                }
            ],
            shippingAddress: {
                name: 'Sarah Wilson',
                street: '321 Elm Street',
                city: 'Seattle',
                state: 'WA',
                zip: '98101',
                country: 'United States'
            },
            billingAddress: {
                name: 'Sarah Wilson',
                street: '321 Elm Street',
                city: 'Seattle',
                state: 'WA',
                zip: '98101',
                country: 'United States'
            },
            payment: {
                method: 'Credit Card',
                cardLast4: '1234',
                cardBrand: 'American Express'
            },
            shippingDetails: {
                method: 'Standard Shipping',
                carrier: 'FedEx',
                trackingNumber: null,
                estimatedDelivery: null
            },
            files: []
        },
        {
            id: '005',
            date: '2025-06-22',
            status: 'pending',
            total: 149.99,
            subtotal: 149.99,
            tax: 0,
            shippingCost: 0,
            items: [
                {
                    id: 7,
                    name: 'Gaming Keyboard',
                    quantity: 1,
                    price: 149.99,
                    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop&crop=center',
                    sku: 'GK-007'
                }
            ],
            shippingAddress: {
                name: 'Alex Chen',
                street: '555 Tech Boulevard',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102',
                country: 'United States'
            },
            billingAddress: {
                name: 'Alex Chen',
                street: '555 Tech Boulevard',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102',
                country: 'United States'
            },
            payment: {
                method: 'Credit Card',
                cardLast4: '9876',
                cardBrand: 'Visa'
            },
            shippingDetails: {
                method: 'Express Shipping',
                carrier: 'UPS',
                trackingNumber: null,
                estimatedDelivery: '2025-06-24'
            },
            files: []
        }
    ]);

    const [showRefundModal, setShowRefundModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [refundReason, setRefundReason] = useState('');
    const [refundDescription, setRefundDescription] = useState('');

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'pending', icon: <AlertCircle size={12} />, text: 'Pending' },
            processing: { class: 'processing', icon: <Package size={12} />, text: 'Processing' },
            completed: { class: 'completed', icon: <Package size={12} />, text: 'Completed' },
            cancelled: { class: 'cancelled', icon: <X size={12} />, text: 'Cancelled' }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`status-badge ${config.class}`}>
                {config.icon}
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    const formatAddress = (address) => {
        return `${address.street}${address.street2 ? ', ' + address.street2 : ''}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
    };

    const handleRefundRequest = (order) => {
        setSelectedOrder(order);
        setShowRefundModal(true);
    };

    const submitRefund = () => {
        if (!refundReason || !refundDescription.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const refundRequest = {
            orderId: selectedOrder.id,
            reason: refundReason,
            description: refundDescription,
            amount: selectedOrder.total,
            requestDate: new Date().toISOString()
        };

        // Call the callback function
        if (onRefundOrder) {
            onRefundOrder(refundRequest);
        }

        // Reset form and close modal
        setRefundReason('');
        setRefundDescription('');
        setShowRefundModal(false);
        setSelectedOrder(null);

        alert('Refund request submitted successfully! We will review it within 24-48 hours.');
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);

        // Also call the callback if provided
        if (onViewOrder) {
            onViewOrder(order);
        }
    };

    const canRefund = (order) => {
        return order.status === 'completed';
    };

    const canCancel = (order) => {
        return order.status === 'pending';
    };

    const getOrderItemsSummary = (items) => {
        if (items.length === 1) {
            return `${items[0].quantity}x ${items[0].name}`;
        }
        return `${items.length} items (${items.reduce((total, item) => total + item.quantity, 0)} qty)`;
    };

    return (
        <div className="orders-content">
            <div className="orders-header">
                <h3>
                    <Package size={24} />
                    My Orders
                </h3>
                <div className="orders-count">
                    {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span className="header-content">
                                        <Package size={16} />
                                        Order
                                    </span>
                                </th>
                                <th>
                                    <span className="header-content">
                                        <Calendar size={16} />
                                        Date
                                    </span>
                                </th>
                                <th>
                                    <span className="header-content">
                                        <AlertCircle size={16} />
                                        Status
                                    </span>
                                </th>
                                <th>
                                    <span className="header-content">
                                        <DollarSign size={16} />
                                        Total
                                    </span>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="order-row">
                                    <td>
                                        <div className="order-info">
                                            <span className="order-id">#{order.id}</span>
                                            <span className="order-items">{getOrderItemsSummary(order.items)}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <span className="date-value">{formatDate(order.date)}</span>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(order.status)}</td>
                                    <td>
                                        <div className="price-info">
                                            <span className="price-value">{formatPrice(order.total)}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="order-actions">
                                            <button
                                                className="action-btn view"
                                                onClick={() => handleViewOrder(order)}
                                                title="View Order Details"
                                            >
                                                <Eye size={16} />
                                                <span>View</span>
                                            </button>

                                            {canCancel(order) && (
                                                <button
                                                    className="action-btn cancel"
                                                    onClick={() => onCancelOrder && onCancelOrder(order.id)}
                                                    title="Cancel Order"
                                                >
                                                    <X size={16} />
                                                    <span>Cancel</span>
                                                </button>
                                            )}

                                            {canRefund(order) && (
                                                <button
                                                    className="action-btn refund"
                                                    onClick={() => handleRefundRequest(order)}
                                                    title="Request Refund"
                                                >
                                                    <RotateCcw size={16} />
                                                    <span>Refund</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-content">
                        <Package size={64} className="empty-icon" />
                        <h4>No Orders Yet</h4>
                        <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
                        <button
                            className="browse-products"
                            onClick={() => onBrowseProducts && onBrowseProducts()}
                        >
                            <ShoppingBag size={20} />
                            Browse Products
                        </button>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            <OrderDetailsModal
                show={showViewModal}
                order={selectedOrder}
                onClose={() => {
                    setShowViewModal(false);
                    setSelectedOrder(null);
                }}
                onRefundRequest={handleRefundRequest}
                formatDate={formatDate}
                formatPrice={formatPrice}
                formatAddress={formatAddress}
                getStatusBadge={getStatusBadge}
                canRefund={canRefund}
            />

            {/* Refund Modal */}
            {showRefundModal && (
                <div className="modal-overlay">
                    <div className="refund-modal">
                        <div className="modal-header">
                            <h3>
                                <RotateCcw size={24} />
                                Request Refund
                            </h3>
                            <button
                                className="close-btn"
                                onClick={() => {
                                    setShowRefundModal(false);
                                    setSelectedOrder(null);
                                    setRefundReason('');
                                    setRefundDescription('');
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="refund-reason">
                                    <AlertCircle size={16} />
                                    Reason for Refund *
                                </label>
                                <select
                                    id="refund-reason"
                                    value={refundReason}
                                    onChange={(e) => setRefundReason(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Select a reason</option>
                                    <option value="damaged_product">Product arrived damaged</option>
                                    <option value="not_as_described">Item not as described</option>
                                    <option value="defective">Product is defective</option>
                                    <option value="wrong_item">Received wrong item</option>
                                    <option value="changed_mind">Changed my mind</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="refund-description">
                                    Description *
                                </label>
                                <textarea
                                    id="refund-description"
                                    value={refundDescription}
                                    onChange={(e) => setRefundDescription(e.target.value)}
                                    placeholder="Please provide more details about your refund request..."
                                    className="form-textarea"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowRefundModal(false);
                                    setSelectedOrder(null);
                                    setRefundReason('');
                                    setRefundDescription('');
                                }}
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                className="submit-btn"
                                onClick={submitRefund}
                                disabled={!refundReason || !refundDescription.trim()}
                            >
                                <RotateCcw size={16} />
                                Submit Refund Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;