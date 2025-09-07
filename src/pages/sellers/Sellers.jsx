import { ExternalLink, Store } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Sellers.scss';

const Sellers = () => {
    const { t } = useLanguage();

    return (
        <div className="sellers-page">
            <div className="sellers-container">
                <div className="sellers-content">
                    <div className="sellers-icon">
                        <Store size={80} />
                    </div>

                    <h1>{t('sellers.heading')}</h1>

                    <p>
                        {t('sellers.description')}
                    </p>

                    <a
                        href={t('sellers.dashboardUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dashboard-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.dashboardButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sellers;