import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, Users, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './About.scss';
import logo from '../../assets/images/shamSuperStoreLogo.jpg'
import woman from '../../assets/images/about/woman.png'
import payment from '../../assets/images/about/payment.png'

const About = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleShopClick = () => {
        navigate('/shop');
    };

    const handleBecomeSellerClick = () => {
        navigate('/sellers');
    };

    const handleContactClick = () => {
        navigate('/contact');
    };

    const handleJoinDeliveryClick = () => {
        navigate('/delivery-drivers');
    };

    return (
        <div className="about-page">
            <div className="about-container">
                <div className="about-section">
                    <div className="about-cards-grid">
                        <div className="card-wrapper">
                            <h2 className="external-card-title">{t('about.cards.shoppers.title')}</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <ShoppingCart size={48} />
                                </div>
                                <h3 className="card-subtitle">{t('about.cards.shoppers.subtitle')}</h3>
                                <p className="card-description">
                                    {t('about.cards.shoppers.description')}
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleShopClick}>
                                        {t('about.cards.shoppers.button')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper">
                            <h2 className="external-card-title">{t('about.cards.sellers.title')}</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Store size={48} />
                                </div>
                                <h3 className="card-subtitle">{t('about.cards.sellers.subtitle')}</h3>
                                <p className="card-description">
                                    {t('about.cards.sellers.description')}
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleBecomeSellerClick} >
                                        {t('about.cards.sellers.button')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper">
                            <h2 className="external-card-title">{t('about.cards.team.title')}</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Users size={48} />
                                </div>
                                <h3 className="card-subtitle">{t('about.cards.team.subtitle')}</h3>
                                <p className="card-description">
                                    {t('about.cards.team.description')}
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleContactClick} >
                                        {t('about.cards.team.button')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper">
                            <h2 className="external-card-title">{t('about.cards.delivery.title')}</h2>
                            <div className="about-card">
                                <div className="card-icon">
                                    <Truck size={48} />
                                </div>
                                <h3 className="card-subtitle">{t('about.cards.delivery.subtitle')}</h3>
                                <p className="card-description">
                                    {t('about.cards.delivery.description')}
                                </p>
                                <div>
                                    <button className="card-button" onClick={handleJoinDeliveryClick} >
                                        {t('about.cards.delivery.button')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-section">
                    <div className="service-content">
                        <div className="service-illustration">
                            <img src={woman} alt="Woman Image" />
                        </div>
                        <div className="service-info">
                            <div className="brand-logo">
                                <img src={logo} alt="Logo" />
                            </div>
                            <h2 className="service-title">{t('about.service.title')}</h2>
                            <p className="service-description">
                                {t('about.service.description')}
                            </p>
                            <div className="payment-methods">
                                <img src={payment} alt="Payment Methods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;