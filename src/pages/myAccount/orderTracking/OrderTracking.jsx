import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './OrderTracking.scss';
import OrderTrackingModal from './orderTrackingModal/OrderTrackingModal';
import { useFetchMyOrdersQuery } from '../../../stores/apiSlice';

const OrderTracking = () => {
    const { t } = useLanguage();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
       const {data:myorders} = useFetchMyOrdersQuery();
       const [orederdata,setOrderdata] = useState();
       console.log("track orders",myorders?.data.data);
       useEffect(()=>{
        if(myorders){
            setOrderdata(myorders?.data.data);
        }},[myorders])

    // Mock order data - replace with actual API call later
    const mockOrders = [
        {
            id: 'ORD-2025-001',
            status: 'processing',
            orderDate: '2025-01-15',
            totalAmount: 89.99,
            items: 3,
            driverLocation: {
                lat: 40.7128,
                lng: -74.0060,
                name: 'John Smith'
            },
            deliveryAddress: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001'
            }
        },
        {
            id: 'ORD-2025-002',
            status: 'delivered',
            orderDate: '2025-01-10',
            totalAmount: 156.50,
            items: 5,
            deliveredDate: '2025-01-12'
        },
        {
            id: 'ORD-2025-003',
            status: 'processing',
            orderDate: '2025-01-18',
            totalAmount: 45.00,
            items: 2,
            driverLocation: {
                lat: 40.7589,
                lng: -73.9851,
                name: 'Mike Johnson'
            },
            deliveryAddress: {
                street: '456 Broadway',
                city: 'New York',
                state: 'NY',
                zip: '10013'
            }
        },
        {
            id: 'ORD-2025-004',
            status: 'shipped',
            orderDate: '2025-01-20',
            totalAmount: 234.75,
            items: 7,
            estimatedDelivery: '2025-01-25'
        },
        {
            id: 'ORD-2025-005',
            status: 'cancelled',
            orderDate: '2025-01-12',
            totalAmount: 67.25,
            items: 4,
            cancelledDate: '2025-01-13'
        },
        {
            id: 'ORD-2025-006',
            status: 'processing',
            orderDate: '2025-01-22',
            totalAmount: 112.30,
            items: 4,
            driverLocation: {
                lat: 40.7488,
                lng: -73.9857,
                name: 'Sarah Wilson'
            },
            deliveryAddress: {
                street: '789 Fifth Ave',
                city: 'New York',
                state: 'NY',
                zip: '10022'
            }
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchOrders = async () => {
            setIsLoading(true);
            // Simulate network delay
            setTimeout(() => {
                setOrders(mockOrders);
                setIsLoading(false);
            }, 1000);
        };

        fetchOrders();
    }, []);

    const handleTrackOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            processing: 'status-processing',
            delivered: 'status-delivered',
            shipped: 'status-shipped',
            cancelled: 'status-cancelled'
        };

        return (
            <span className={`status-badge ${statusClasses[status]}`}>
                {t(`myAccount.orderTracking.status.${status}`)}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="order-tracking-content">
                <h3>{t('myAccount.orderTracking.title')}</h3>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>{t('myAccount.orderTracking.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-tracking-content">
            <h3>{t('myAccount.orderTracking.title')}</h3>

            {orederdata.length === 0 ? (
                <div className="no-orders">
                    <p>{t('myAccount.orderTracking.noOrders')}</p>
                </div>
            ) : (
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>{t('myAccount.orderTracking.table.orderNumber')}</th>
                                <th>{t('myAccount.orderTracking.table.orderDate')}</th>
                                <th>{t('myAccount.orderTracking.table.status')}</th>
                                <th>{t('myAccount.orderTracking.table.items')}</th>
                                <th>{t('myAccount.orderTracking.table.total')}</th>
                                <th>{t('myAccount.orderTracking.table.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orederdata.map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id">{order.id}</td>
                                    <td>{formatDate(order.created_at)}</td>
                                    <td>{getStatusBadge(order.delivery_status)}</td>
                                    <td>{order.orderitems?.length} {t('myAccount.orderTracking.table.itemsCount')}</td>
                                    <td className="total-amount">${Number(order.order_value).toFixed(2)}</td>
                                    <td className="actions">
                                        {order.delivery_status === 'pending' ? (
                                            <button
                                                className="track-btn"
                                                onClick={() => handleTrackOrder(order)}
                                            >
                                                {t('myAccount.orderTracking.trackButton')}
                                            </button>
                                        ) : (
                                            <span className="no-tracking">
                                                {order.delivery_status === 'delivered' && t('myAccount.orderTracking.completed')}
                                                {order.delivery_status === 'processing' && t('myAccount.orderTracking.inTransit')}
                                                {order.delivery_status === 'cancelled' && t('myAccount.orderTracking.cancelled')}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && selectedOrder && (
                <OrderTrackingModal
                    order={selectedOrder}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default OrderTracking;