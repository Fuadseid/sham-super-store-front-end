import { Link } from 'react-router-dom';
import { ExternalLink, Crown, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './VendorMembership.scss';

const VendorMembership = () => {
    const { t } = useLanguage();

    return (
        <div className="vendor-membership-page">
            <div className="vendor-membership-container">
                <Link to="/sellers" className="back-link">
                    <ArrowLeft size={20} />
                    {t('sellers.vendorMembership.backLink')}
                </Link>

                <div className="membership-content">
                    <div className="membership-icon">
                        <Crown size={80} />
                    </div>

                    <h1>{t('sellers.vendorMembership.heading')}</h1>

                    <p>
                        {t('sellers.vendorMembership.description')}
                    </p>

                    <a
                        href={t('sellers.vendorMembership.membershipUrl')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="membership-btn"
                    >
                        <ExternalLink size={20} />
                        {t('sellers.vendorMembership.membershipButton')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorMembership;