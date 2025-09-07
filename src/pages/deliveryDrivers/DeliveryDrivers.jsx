import { ExternalLink, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './DeliveryDrivers.scss';

const DeliveryDrivers = () => {
    const { t } = useLanguage();

    return (
        <div className="delivery-drivers-page">
            <div className="delivery-drivers-container">
                <div className="delivery-drivers-content">
                    <div className="drivers-icon">
                        <Truck size={80} />
                    </div>

                    <h1>{t('drivers.heading')}</h1>

                    <p>
                        {t('drivers.description')}
                    </p>

                    <a
                        href={t('drivers.dashboardUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dashboard-btn"
                    >
                        <ExternalLink size={20} />
                        {t('drivers.dashboardButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDrivers;