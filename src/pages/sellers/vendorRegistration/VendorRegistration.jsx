import { Link } from 'react-router-dom';
import { ExternalLink, UserPlus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './VendorRegistration.scss';

const VendorRegistration = () => {
    const { t } = useLanguage();

    return (
        <div className="vendor-registration-page">
            <div className="vendor-registration-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('sellers.vendorRegistration.backLink')}
                </Link>

                <div className="registration-content">
                    <div className="registration-icon">
                        <UserPlus size={80} />
                    </div>

                    <h1>{t('sellers.vendorRegistration.heading')}</h1>

                    <p>
                        {t('sellers.vendorRegistration.description')}
                    </p>

                    <a
                        href={t('sellers.vendorRegistration.registrationUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="registration-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.vendorRegistration.registrationButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorRegistration;