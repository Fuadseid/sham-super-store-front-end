import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGetPaymentMethodsQuery } from '../../../stores/apiSlice';
import './PaymentMethods.scss';

const PaymentMethods = ({ savedPaymentMethods = [] }) => {
    const { data: paymentMethods } = useGetPaymentMethodsQuery();
    const [available, setAvailable] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const { t } = useLanguage();

    useEffect(() => {
        if (paymentMethods?.data) {
            const availableMethods = [];
            const comingSoonMethods = [];
            
            paymentMethods.data.forEach(method => {
                if (method.status === "active") {
                    availableMethods.push(method);
                } else if (method.status === "inactive") {
                    comingSoonMethods.push(method);
                }
            });
            
            setAvailable(availableMethods);
            setComingSoon(comingSoonMethods);
        }
    }, [paymentMethods]);

    const PaymentMethodCard = ({ method }) => (
        <div className={`payment-method-card ${method.status}`}>
            <div className="payment-method-icon">
                <span className="icon">{method.icon}</span>
            </div>
            <div className="payment-method-info">
                <h4>{method.name}</h4>
                <p>{method.description}</p>
                <span className={`status-badge ${method.status}`}>
                    {method.status === 'active'
                        ? t('myAccount.paymentMethods.status.available')
                        : t('myAccount.paymentMethods.status.comingSoon')
                    }
                </span>
            </div>
        </div>
    );

    return (
        <div className="payment-methods-content">
            <h3>{t('myAccount.paymentMethods.title')}</h3>
            <p>{t('myAccount.paymentMethods.description')}</p>

            {/* Available Payment Methods */}
            {available.length > 0 && (
                <div className="payment-section">
                    <h4 className="section-title">{t('myAccount.paymentMethods.currentMethods.title')}</h4>
                    <div className="payment-methods-grid">
                        {available.map((method) => (
                            <PaymentMethodCard key={method.id} method={method} />
                        ))}
                    </div>
                </div>
            )}

            {/* Coming Soon Payment Methods */}
            {comingSoon.length > 0 && (
                <div className="payment-section">
                    <h4 className="section-title">{t('myAccount.paymentMethods.comingSoon.title')}</h4>
                    <div className="payment-methods-grid">
                        {comingSoon.map((method) => (
                            <PaymentMethodCard key={method.id} method={method} />
                        ))}
                    </div>
                </div>
            )}

            {/* Saved Payment Methods */}
            {savedPaymentMethods.length > 0 ? (
                <div className="payment-section">
                    <h4 className="section-title">{t('myAccount.paymentMethods.savedMethods.title')}</h4>
                    <div className="saved-methods">
                        {savedPaymentMethods.map((method, index) => (
                            <div key={index} className="saved-method-card">
                                <span>{method.name}</span>
                                <span className="method-details">{method.details}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="payment-methods-list">
                    <p>{t('myAccount.paymentMethods.emptyState.message')}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentMethods;