import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.scss';
import logo from '../../assets/images/shamSuperStoreLogo.jpg';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiShoppingBag } from 'react-icons/hi2';
import { useLocation, Link } from 'react-router-dom';

const Footer = ({ toggleCartSidebar }) => {
    const { t, isRTL } = useLanguage();
    const location = useLocation();

    const handleCartClick = () => {
        if (toggleCartSidebar) {
            toggleCartSidebar();
        }
    };

    const isActiveLink = (path, contains = false) => {
        if (contains) {
            return location.pathname.includes(path);
        }
        return location.pathname === path;
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`footer ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="footer-content">
                <div className="footer-section logo-section">
                    <Link to="/" className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" />
                    </Link>

                    <div className="contact-info">
                        <Link to="/contact" className="email">support@shamsuperstore.com</Link>
                        <a href="tel:10012345678" className="phone">Phone: (000) 000-0000</a>
                    </div>

                    <div className="social-icons">
                        <a href="#" className="social-icon whatsapp">
                            <FaWhatsapp size={20} />
                        </a>
                        <a href="#" className="social-icon facebook">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="social-icon instagram">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="social-icon twitter">
                            <FaXTwitter size={20} />
                        </a>
                    </div>

                    <div className="shopping-bag" onClick={handleCartClick}>
                        <Link to='/cart'>
                            <HiShoppingBag size={40} />
                        </Link>
                    </div>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><Link to="/my-account" className={isActiveLink('/my-account') ? 'highlighted' : ''}>{t('footer.links.accountDetails')}</Link></li>
                        <li><Link to="/cart" className={isActiveLink('/cart') ? 'highlighted' : ''}>{t('footer.links.shoppingCart')}</Link></li>
                        <li><Link to="/checkout">{t('footer.links.checkout')}</Link></li>
                        <li><Link to="/orders">{t('footer.links.orders')}</Link></li>
                        <li><Link to="/order-tracking">{t('footer.links.orderTracking')}</Link></li>
                        <li><Link to="/save-for-later">{t('footer.links.saveForLater')}</Link></li>
                        <li><Link to="/wishlist">{t('footer.links.wishlist')}</Link></li>
                        <li><Link to="/downloads">{t('footer.links.downloads')}</Link></li>
                        <li><Link to="/my-account">{t('footer.links.addresses')}</Link></li>
                        <li><Link to="/my-account">{t('footer.links.lostPassword')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section links-section">
                    <ul>
                        <li><Link to="/store-manager" className={isActiveLink('/store-manager') ? 'highlighted' : ''}>{t('footer.links.storeManager')}</Link></li>
                        <li><Link to="/stores-list" className={isActiveLink('/stores-list') ? 'highlighted' : ''}>{t('footer.links.storesList')}</Link></li>
                        <li><Link to="/vendor-membership" className={isActiveLink('/vendor-membership') ? 'highlighted' : ''}>{t('footer.links.vendorMembership')}</Link></li>
                        <li><Link to="/contact">{t('footer.links.inquiries')}</Link></li>
                        <li><Link to="/vendor-registration" className={isActiveLink('/vendor-registration') ? 'highlighted' : ''}>{t('footer.links.vendorRegistration')}</Link></li>
                    </ul>
                    <div className="quick-links">
                        <ul>
                            <li><Link to="/" className={isActiveLink('/') ? 'highlighted' : ''}>{t('footer.quickLinks.home')}</Link></li>
                            <li><Link to="/shop" className={isActiveLink('/shop', true) ? 'highlighted' : ''}>{t('footer.quickLinks.shop')}</Link></li>
                            <li><Link to="/about" className={isActiveLink('/about', true) ? 'highlighted' : ''}>{t('footer.quickLinks.about')}</Link></li>
                            <li><Link to="/contact" className={isActiveLink('/contact') ? 'highlighted' : ''}>{t('footer.quickLinks.contactUs')}</Link></li>
                            <li><Link to="/contact">{t('footer.quickLinks.inquiries')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-section newsletter-section">
                    <div className="newsletter">
                        <h4>{t('footer.newsletter.title')}</h4>
                        <div className="newsletter-form">
                            <input type="email" placeholder={t('footer.newsletter.emailPlaceholder')} />
                            <button type="submit">{t('footer.newsletter.signUp')}</button>
                        </div>
                        <p className="newsletter-text">{t('footer.newsletter.description')}</p>
                    </div>

                    <div className="search-section">
                        <h4>{t('footer.search.title')}</h4>
                        <div className="search-form">
                            <input type="text" placeholder={t('footer.search.placeholder')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© {currentYear} Shamsuperstore. {t('footer.copyright.allRightsReserved')}</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy-policy">{t('footer.legal.privacyPolicy')}</Link>
                        <Link to="/terms-conditions">{t('footer.legal.termsConditions')}</Link>
                        <Link to="/return-and-refunds-policy">{t('footer.legal.returnRefunds')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;