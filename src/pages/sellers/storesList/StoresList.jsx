import { Link } from 'react-router-dom';
import { ExternalLink, Building2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './StoresList.scss';

const StoresList = () => {
    const { t } = useLanguage();

    return (
        <div className="stores-list-page">
            <div className="stores-list-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('sellers.storesList.backLink')}
                </Link>

                <div className="stores-list-content">
                    <div className="stores-list-icon">
                        <Building2 size={80} />
                    </div>

                    <h1>{t('sellers.storesList.heading')}</h1>

                    <p>
                        {t('sellers.storesList.description')}
                    </p>

                    <a
                        href={t('sellers.storesList.storesListUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stores-list-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.storesList.storesListButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StoresList;