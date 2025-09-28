import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './MyAccount.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all components
import AuthSection from './authSection/AuthSection';
import Dashboard from './dashboard/Dashboard';
import Orders from './orders/Orders';
import OrderTracking from './orderTracking/OrderTracking';
import Downloads from './downloads/Downloads';
import Addresses from './addresses/Addresses';
import PaymentMethods from './paymentMethods/PaymentMethods';
import AccountDetails from './accountDetails/AccountDetails';
import Wishlist from './wishlist/Wishlist';
import Following from './following/Following';
import LostPassword from './lostPassword/LostPassword';
import SupportTickets from './supportTickets/SupportTickets';
import ContactedSellers from './contactedSellers/ContactedSellers';
import { useRegisterMutation, useLoginMutation } from '../../stores/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, logoutUser } from '../../stores/authReducer';

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
const [registerData, setRegisterData] = useState({
    email: ''
});    
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { t } = useLanguage();
    
    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'email' && !type === 'checkbox') {
            setEmail(value);
        }
    };

    const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
        ...prev,
        [name]: value
    }));
};
    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error('Email and password are required');
            return;
        }
        
        try {
            const result = await login({
                email: formData.email,
                password: formData.password
            }).unwrap();
            
            // Dispatch the authenticateUser action with the user data
            dispatch(authenticateUser({
            ...result.data.user,
            token: result.data.token
        }));
            
            // Clear form
            setFormData({ email: '', password: '', rememberMe: false });
            
            toast.success('Login successful!');
            
        } catch (err) {
            console.error('Login failed:', err);
            toast.error(err.data?.message || 'Login failed. Please try again.');
        }
    };

   const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerData.email) {
        toast.error('Email is required');
        return;
    }

    try {
        const result = await register({ email: registerData.email }).unwrap();
        console.log('Registration successful:', result);
        dispatch(authenticateUser({
            ...result.data.user,
            token: result.data.token
        }));

        setRegisterData({ email: '' });
        toast.success('Registration successful! Check your email for the password.');
    } catch (err) {
        toast.error(err.data?.message || 'Registration failed.');
    }
};

    const handleLogout = () => {
        dispatch(logoutUser());
        setActiveTab('dashboard');
        setFormData({ email: '', password: '', rememberMe: false });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard handleLogout={handleLogout} setActiveTab={setActiveTab} />;
            case 'orders':
                return <Orders />;
            case 'order-tracking':
                return <OrderTracking />;
            case 'downloads':
                return <Downloads />;
            case 'addresses':
                return <Addresses />;
            case 'payment-methods':
                return <PaymentMethods />;
            case 'account-details':
                return <AccountDetails />;
            case 'wishlist':
                return <Wishlist />;
            case 'support-tickets':
                return <SupportTickets />;
            case 'inquiries':
                return <ContactedSellers />;
            case 'lost-password':
                return <LostPassword setShowLogin={() => setActiveTab('dashboard')} />;
            default:
                return <Dashboard handleLogout={handleLogout} setActiveTab={setActiveTab} />;
        }
    };

    if (!isAuthenticated) {
        return (
            <AuthSection
                formData={formData}
                handleInputChange={handleInputChange}
                handleInputChangeforreg={handleRegisterInputChange}
                registerData = {registerData}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                isLoading={isRegistering || isLoggingIn}
            />
        );
    }

    return (
        <div className="my-account">
            <div className="account-container">
                <div className="account-sidebar">
                    <div className="user-info">
                        <h3>{user?.username || user?.email || 'User'}</h3>
                        <button onClick={handleLogout} className="logout-btn">
                            {t('myAccount.actions.logout')}
                        </button>
                    </div>
                    <nav className="account-nav">
                        <ul>
                            <li className={activeTab === 'dashboard' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('dashboard')}>
                                    {t('myAccount.navigation.dashboard')}
                                </button>
                            </li>
                            <li className={activeTab === 'orders' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('orders')}>
                                    {t('myAccount.navigation.orders')}
                                </button>
                            </li>
                            <li className={activeTab === 'order-tracking' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('order-tracking')}>
                                    {t('myAccount.navigation.orderTracking')}
                                </button>
                            </li>
                            <li className={activeTab === 'downloads' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('downloads')}>
                                    {t('myAccount.navigation.downloads')}
                                </button>
                            </li>
                            <li className={activeTab === 'addresses' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('addresses')}>
                                    {t('myAccount.navigation.addresses')}
                                </button>
                            </li>
                            <li className={activeTab === 'payment-methods' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('payment-methods')}>
                                    {t('myAccount.navigation.paymentMethods')}
                                </button>
                            </li>
                            <li className={activeTab === 'account-details' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('account-details')}>
                                    {t('myAccount.navigation.accountDetails')}
                                </button>
                            </li>
                            <li className={activeTab === 'wishlist' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('wishlist')}>
                                    {t('myAccount.navigation.wishlist')}
                                </button>
                            </li>
                            <li className={activeTab === 'support-tickets' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('support-tickets')}>
                                    {t('myAccount.navigation.supportTickets')}
                                </button>
                            </li>
                            <li className={activeTab === 'inquiries' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('inquiries')}>
                                    {t('myAccount.navigation.contactedSellers')}
                                </button>
                            </li>
                            <li className={activeTab === 'lost-password' ? 'active' : ''}>
                                <button onClick={() => setActiveTab('lost-password')}>
                                    {t('myAccount.navigation.lostPassword')}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="account-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyAccount;