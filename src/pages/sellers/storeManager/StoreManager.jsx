import { Link } from 'react-router-dom';
import { ExternalLink, Store, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './StoreManager.scss';

const StoreManager = () => {
    const { t } = useLanguage();

    return (
        <div className="store-manager-page">
            <div className="store-manager-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('sellers.storeManager.backLink')}
                </Link>

                <div className="store-manager-content">
                    <div className="store-manager-icon">
                        <Store size={80} />
                    </div>

                    <h1>{t('sellers.storeManager.heading')}</h1>

                    <p>
                        {t('sellers.storeManager.description')}
                    </p>

                    <a
                        href={t('sellers.storeManager.storeManagerUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="store-manager-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.storeManager.storeManagerButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StoreManager;