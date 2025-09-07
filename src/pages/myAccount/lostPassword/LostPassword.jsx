import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './LostPassword.scss';

const LostPassword = ({ setShowLogin, onResetPassword }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        usernameEmail: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [resetStatus, setResetStatus] = useState(null); // null, 'success', 'error'
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear status messages when user starts typing
        if (resetStatus) {
            setResetStatus(null);
            setMessage('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.usernameEmail.trim()) {
            newErrors.usernameEmail = t('myAccount.lostPassword.messages.fieldRequired');
        } else if (formData.usernameEmail.includes('@') && !/\S+@\S+\.\S+/.test(formData.usernameEmail)) {
            newErrors.usernameEmail = t('myAccount.lostPassword.messages.invalidEmail');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setResetStatus(null);
        setMessage('');

        try {
            if (onResetPassword) {
                const result = await onResetPassword(formData.usernameEmail);
                if (result.success) {
                    setResetStatus('success');
                    setMessage(t('myAccount.lostPassword.messages.successMessage'));
                } else {
                    setResetStatus('error');
                    setMessage(result.message || t('myAccount.lostPassword.messages.errorMessage'));
                }
            } else {
                // Simulate API call for demo
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Simulate success
                setResetStatus('success');
                setMessage(t('myAccount.lostPassword.messages.successMessage'));
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setResetStatus('error');
            setMessage(t('myAccount.lostPassword.messages.errorMessage'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    const handleTryAgain = () => {
        setResetStatus(null);
        setMessage('');
        setFormData({ usernameEmail: '' });
        setErrors({});
    };

    return (
        <div className="lost-password-content">
            <div className="lost-password-header">
                <h3>{t('myAccount.lostPassword.title')}</h3>
                <p>{t('myAccount.lostPassword.description')}</p>
            </div>

            {resetStatus === 'success' ? (
                <div className="success-message">
                    <h4>{t('myAccount.lostPassword.messages.successTitle')}</h4>
                    <p>{message}</p>
                    <div className="instructions">
                        <ol>
                            <li>{t('myAccount.lostPassword.instructions.checkEmail')}</li>
                            <li>{t('myAccount.lostPassword.instructions.followLink')}</li>
                        </ol>
                        <p className="spam-notice">{t('myAccount.lostPassword.instructions.checkSpam')}</p>
                    </div>
                    <div className="success-actions">
                        <button
                            type="button"
                            className="try-again-btn"
                            onClick={handleTryAgain}
                        >
                            {t('myAccount.lostPassword.actions.resendLink')}
                        </button>
                        {/* <a href="#" onClick={handleBackToLogin} className="back-login">
                            {t('myAccount.lostPassword.actions.backToLogin')}
                        </a> */}
                    </div>
                </div>
            ) : (
                <>
                    <form className="lost-password-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username-email">
                                {t('myAccount.lostPassword.form.usernameEmailLabel')}
                            </label>
                            <input
                                type="text"
                                id="username-email"
                                name="usernameEmail"
                                value={formData.usernameEmail}
                                onChange={handleInputChange}
                                placeholder={t('myAccount.lostPassword.form.usernameEmailPlaceholder')}
                                className={errors.usernameEmail ? 'error' : ''}
                                disabled={isLoading}
                            />
                            {errors.usernameEmail && (
                                <span className="error-message">{errors.usernameEmail}</span>
                            )}
                        </div>

                        {resetStatus === 'error' && (
                            <div className="error-message-box">
                                <p>{message}</p>
                                <button
                                    type="button"
                                    className="try-again-btn"
                                    onClick={handleTryAgain}
                                >
                                    {t('myAccount.lostPassword.actions.tryAgain')}
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`reset-password-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    {t('myAccount.lostPassword.form.submitting')}
                                </>
                            ) : (
                                t('myAccount.lostPassword.form.resetPasswordButton')
                            )}
                        </button>
                    </form>

                    {/* <a href="#" onClick={handleBackToLogin} className="back-login">
                        {t('myAccount.lostPassword.actions.backToLogin')}
                    </a> */}
                </>
            )}
        </div>
    );
};

export default LostPassword;