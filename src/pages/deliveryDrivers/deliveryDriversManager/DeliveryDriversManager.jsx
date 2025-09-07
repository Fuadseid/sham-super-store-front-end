import { Link } from 'react-router-dom';
import { ExternalLink, Users, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './DeliveryDriversManager.scss';

const DeliveryDriversManager = () => {
    const { t } = useLanguage();

    return (
        <div className="delivery-drivers-manager-page">
            <div className="delivery-drivers-manager-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('drivers.deliveryDriversManager.backLink')}
                </Link>

                <div className="manager-content">
                    <div className="manager-icon">
                        <Users size={80} />
                    </div>

                    <h1>{t('drivers.deliveryDriversManager.heading')}</h1>

                    <p>
                        {t('drivers.deliveryDriversManager.description')}
                    </p>

                    <a
                        href={t('drivers.deliveryDriversManager.managerUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manager-btn"
                    >
                        <ExternalLink size={20} />
                        {t('drivers.deliveryDriversManager.managerButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDriversManager;