import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './LostPassword.scss';
import { useForgetpasswordMutation } from '../../../stores/apiSlice';

const LostPassword = ({ setShowLogin, onResetPassword }) => {
    const { t } = useLanguage();
    const [forgetpassword, { isLoading }] = useForgetpasswordMutation();
    const [formData, setFormData] = useState({
        email: '' // Changed from usernameEmail to email to match backend
    });
    const [errors, setErrors] = useState({});
    const [resetStatus, setResetStatus] = useState(null);
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

        if (!formData.email.trim()) {
            newErrors.email = t('myAccount.lostPassword.messages.fieldRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('myAccount.lostPassword.messages.invalidEmail');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setResetStatus(null);
        setMessage('');

        try {
            // Call the API mutation
            const result = await forgetpassword({ email: formData.email }).unwrap();

            if (result.success) {
                setResetStatus('success');
                setMessage(result.message || t('myAccount.lostPassword.messages.successMessage'));
            } else {
                setResetStatus('error');
                setMessage(result.message || t('myAccount.lostPassword.messages.errorMessage'));
            }
        } catch (error) {
            console.error('Error sending reset OTP:', error);
            setResetStatus('error');
            
            // Handle different error formats from API
            if (error.data?.message) {
                setMessage(error.data.message);
            } else if (error.data?.errors) {
                // Handle validation errors from backend
                const errorMessages = Object.values(error.data.errors).flat();
                setMessage(errorMessages.join(', '));
            } else {
                setMessage(t('myAccount.lostPassword.messages.errorMessage'));
            }
        }
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    const handleTryAgain = () => {
        setResetStatus(null);
        setMessage('');
        setFormData({ email: '' });
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
                            <li>{t('myAccount.lostPassword.instructions.enterOTP')}</li> {/* Updated for OTP flow */}
                        </ol>
                        <p className="spam-notice">{t('myAccount.lostPassword.instructions.checkSpam')}</p>
                    </div>
                    <div className="success-actions">
                        <button
                            type="button"
                            className="try-again-btn"
                            onClick={handleTryAgain}
                        >
                            {t('myAccount.lostPassword.actions.resendOTP')} {/* Updated for OTP flow */}
                        </button>
                        <button
                            type="button"
                            className="back-login-btn"
                            onClick={handleBackToLogin}
                        >
                            {t('myAccount.lostPassword.actions.backToLogin')}
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <form className="lost-password-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">
                                {t('myAccount.lostPassword.form.emailLabel')} {/* Updated label */}
                            </label>
                            <input
                                type="email" // Changed to email type for better validation
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t('myAccount.lostPassword.form.emailPlaceholder')}
                                className={errors.email ? 'error' : ''}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <span className="error-message">{errors.email}</span>
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
                                t('myAccount.lostPassword.form.sendOTPButton') 
                            )}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="back-login-btn"
                        onClick={handleBackToLogin}
                    >
                        {t('myAccount.lostPassword.actions.backToLogin')}
                    </button>
                </>
            )}
        </div>
    );
};

export default LostPassword;