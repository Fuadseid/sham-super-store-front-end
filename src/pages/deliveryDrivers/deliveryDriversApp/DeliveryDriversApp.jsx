import { Link } from 'react-router-dom';
import { ExternalLink, Smartphone, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './DeliveryDriversApp.scss';

const DeliveryDriversApp = () => {
    const { t } = useLanguage();

    return (
        <div className="delivery-drivers-app-page">
            <div className="delivery-drivers-app-container">
                <Link to="/delivery-drivers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('drivers.deliveryDriversApp.backLink')}
                </Link>

                <div className="delivery-drivers-app-content">
                    <div className="delivery-drivers-app-icon">
                        <Smartphone size={80} />
                    </div>

                    <h1>{t('drivers.deliveryDriversApp.heading')}</h1>

                    <p>
                        {t('drivers.deliveryDriversApp.description')}
                    </p>

                    <a
                        href={t('drivers.deliveryDriversApp.appUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="delivery-drivers-app-btn"
                    >
                        <ExternalLink size={20} />
                        {t('drivers.deliveryDriversApp.appButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDriversApp;