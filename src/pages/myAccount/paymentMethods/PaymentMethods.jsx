import { useLanguage } from '../../../context/LanguageContext';
import './PaymentMethods.scss';

const PaymentMethods = ({ savedPaymentMethods = [] }) => {
    const { t } = useLanguage();

    const availablePaymentMethods = [
        {
            id: 'cash',
            name: t('myAccount.paymentMethods.currentMethods.cash.name'),
            description: t('myAccount.paymentMethods.currentMethods.cash.description'),
            status: 'available',
            icon: '💵'
        }
    ];

    const comingSoonPaymentMethods = [
        {
            id: 'paysham',
            name: t('myAccount.paymentMethods.comingSoon.paySham.name'),
            description: t('myAccount.paymentMethods.comingSoon.paySham.description'),
            status: 'comingSoon',
            icon: '📱'
        },
        {
            id: 'visa',
            name: t('myAccount.paymentMethods.comingSoon.visaCard.name'),
            description: t('myAccount.paymentMethods.comingSoon.visaCard.description'),
            status: 'comingSoon',
            icon: '💳'
        },
        {
            id: 'mastercard',
            name: t('myAccount.paymentMethods.comingSoon.masterCard.name'),
            description: t('myAccount.paymentMethods.comingSoon.masterCard.description'),
            status: 'comingSoon',
            icon: '💳'
        }
    ];

    const PaymentMethodCard = ({ method }) => (
        <div className={`payment-method-card ${method.status}`}>
            <div className="payment-method-icon">
                <span className="icon">{method.icon}</span>
            </div>
            <div className="payment-method-info">
                <h4>{method.name}</h4>
                <p>{method.description}</p>
                <span className={`status-badge ${method.status}`}>
                    {method.status === 'available'
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
            <div className="payment-section">
                <h4 className="section-title">{t('myAccount.paymentMethods.currentMethods.title')}</h4>
                <div className="payment-methods-grid">
                    {availablePaymentMethods.map((method) => (
                        <PaymentMethodCard key={method.id} method={method} />
                    ))}
                </div>
            </div>

            {/* Coming Soon Payment Methods */}
            <div className="payment-section">
                <h4 className="section-title">{t('myAccount.paymentMethods.comingSoon.title')}</h4>
                <div className="payment-methods-grid">
                    {comingSoonPaymentMethods.map((method) => (
                        <PaymentMethodCard key={method.id} method={method} />
                    ))}
                </div>
            </div>

            {/* Saved Payment Methods */}
            {savedPaymentMethods.length > 0 ? (
                <div className="payment-section">
                    <h4 className="section-title">Saved Payment Methods</h4>
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