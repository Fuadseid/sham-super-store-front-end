import { useLanguage } from '../../../context/LanguageContext';
import './Dashboard.scss';

const Dashboard = ({ handleLogout, setActiveTab, username = 'yamanajlouni' }) => {
    const { t } = useLanguage();

    return (
        <div className="dashboard-content">
            <div className="welcome-message">
                <p>
                    {t('myAccount.dashboard.welcome.greeting')} <strong>{username}</strong> {t('myAccount.dashboard.welcome.notYou', { username })} <button onClick={handleLogout} className="logout-link">{t('myAccount.dashboard.welcome.logoutText')}</button>{t('myAccount.dashboard.welcome.closingParenthesis')}
                </p>
                <p>
                    {t('myAccount.dashboard.welcome.dashboardInfo')} <a href="#" onClick={() => setActiveTab('orders')}>{t('myAccount.dashboard.welcome.recentOrders')}</a>{t('myAccount.dashboard.welcome.manageText')} <a href="#" onClick={() => setActiveTab('addresses')}>{t('myAccount.dashboard.welcome.shippingAddresses')}</a>{t('myAccount.dashboard.welcome.andText')} <a href="#" onClick={() => setActiveTab('account-details')}>{t('myAccount.dashboard.welcome.accountDetails')}</a>{t('myAccount.dashboard.welcome.endingPeriod')}
                </p>
                {/* <p><a href="#" className="become-vendor-link">{t('myAccount.dashboard.welcome.becomeVendor')}</a></p> */}
            </div>

            <div className="quick-actions">
                <h4>{t('myAccount.dashboard.quickActions.title')}</h4>
                <div className="action-buttons">
                    <a href="#" onClick={() => setActiveTab('orders')} className="action-btn">
                        <span className="icon">📋</span>
                        {t('myAccount.dashboard.quickActions.viewOrders')}
                    </a>
                    <a href="#" onClick={() => setActiveTab('addresses')} className="action-btn">
                        <span className="icon">📍</span>
                        {t('myAccount.dashboard.quickActions.manageAddresses')}
                    </a>
                    <a href="#" onClick={() => setActiveTab('account-details')} className="action-btn">
                        <span className="icon">⚙️</span>
                        {t('myAccount.dashboard.quickActions.editAccount')}
                    </a>
                    <a href="#" onClick={() => setActiveTab('downloads')} className="action-btn">
                        <span className="icon">📄</span>
                        {t('myAccount.dashboard.quickActions.downloadInvoices')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;