import { Link } from 'react-router-dom';
import { ExternalLink, TruckIcon, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './VendorsDriversManager.scss';

const VendorsDriversManager = () => {
    const { t } = useLanguage();

    return (
        <div className="vendors-drivers-manager-page">
            <div className="vendors-drivers-manager-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('sellers.vendorsDriversManager.backLink')}
                </Link>

                <div className="vendors-drivers-manager-content">
                    <div className="vendors-drivers-manager-icon">
                        <TruckIcon size={80} />
                    </div>

                    <h1>{t('sellers.vendorsDriversManager.heading')}</h1>

                    <p>
                        {t('sellers.vendorsDriversManager.description')}
                    </p>

                    <a
                        href={t('sellers.vendorsDriversManager.driversManagerUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vendors-drivers-manager-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.vendorsDriversManager.driversManagerButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorsDriversManager;