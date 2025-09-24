import { useLanguage } from '../../../context/LanguageContext';
import './AuthSection.scss';

const AuthSection = ({ formData,registerData,handleInputChangeforreg, handleInputChange, handleLogin, handleRegister, isLoading = false }) => {
    const { t } = useLanguage();

    return (
        <div className="auth-section">
            <div className="auth-container">
                <div className="auth-forms">
                    <div className="login-form">
                        <h2>{t('myAccount.auth.login.title')}</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">{t('myAccount.auth.login.emailLabel')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={t('myAccount.auth.login.emailPlaceholder')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">{t('myAccount.auth.login.passwordLabel')}</label>
                                <div className="password-input">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder={t('myAccount.auth.login.passwordPlaceholder')}
                                        required
                                    />
                                    <span className="password-toggle">👁</span>
                                </div>
                            </div>
                            <button type="submit" className="login-btn">
                                {t('myAccount.auth.login.loginButton')}
                            </button>
                            <div className="form-footer">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    {t('myAccount.auth.login.rememberMe')}
                                </label>
                                <a href="#" className="forgot-password">
                                    {t('myAccount.auth.login.forgotPassword')}
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="register-form">
                        <h2>{t('myAccount.auth.register.title')}</h2>
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="reg-email">{t('myAccount.auth.register.emailLabel')}</label>
                                <input
                                    type="email"
                                    id="reg-email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleInputChangeforreg}
                                    placeholder={t('myAccount.auth.register.emailPlaceholder')}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <p className="register-info">
                                {t('myAccount.auth.register.infoText')}
                            </p>
                            <p className="privacy-info">
                                {t('myAccount.auth.register.privacyText')} <a href="#" className="privacy-link">{t('myAccount.auth.register.privacyLink')}</a>.
                            </p>
                            <button 
                                type="submit" 
                                className={`register-btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        {t('myAccount.auth.register.registering') || 'Registering...'}
                                    </>
                                ) : (
                                    t('myAccount.auth.register.registerButton')
                                )}
                            </button>
                        </form>
                        <div className="vendor-link">
                            {/* <a href="#" className="become-vendor">{t('myAccount.auth.register.becomeVendor')}</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSection;