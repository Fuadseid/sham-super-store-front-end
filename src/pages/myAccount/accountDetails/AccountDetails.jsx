import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './AccountDetails.scss';

const AccountDetails = ({
    initialData = {
        firstName: '',
        lastName: '',
        displayName: '',
        email: ''
    },
    onSaveAccount
}) => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        displayName: initialData.displayName || '',
        email: initialData.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = t('myAccount.accountDetails.validation.firstNameRequired');
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = t('myAccount.accountDetails.validation.lastNameRequired');
        }

        if (!formData.displayName.trim()) {
            newErrors.displayName = t('myAccount.accountDetails.validation.displayNameRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('myAccount.accountDetails.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('myAccount.accountDetails.validation.emailInvalid');
        }

        if (formData.newPassword || formData.confirmPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = t('myAccount.accountDetails.validation.currentPasswordRequired');
            }

            if (formData.newPassword.length < 8) {
                newErrors.newPassword = t('myAccount.accountDetails.validation.passwordMinLength');
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = t('myAccount.accountDetails.validation.passwordMismatch');
            }
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

        try {
            if (onSaveAccount) {
                await onSaveAccount(formData);
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            alert(t('myAccount.accountDetails.messages.updateSuccess'));

            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

        } catch (error) {
            console.error('Error updating account:', error);
            alert(t('myAccount.accountDetails.messages.updateError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: initialData.firstName || '',
            lastName: initialData.lastName || '',
            displayName: initialData.displayName || '',
            email: initialData.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    return (
        <div className="account-details-content">
            <div className="section-header">
                <h3>{t('myAccount.accountDetails.title')}</h3>
                <p>{t('myAccount.accountDetails.description')}</p>
            </div>

            <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h4>{t('myAccount.accountDetails.sections.personalInfo')}</h4>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">
                                {t('myAccount.accountDetails.form.firstName.label')}
                            </label>
                            <input
                                type="text"
                                id="first-name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={errors.firstName ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.firstName.placeholder')}
                            />
                            {errors.firstName && (
                                <span className="error-message">{errors.firstName}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">
                                {t('myAccount.accountDetails.form.lastName.label')}
                            </label>
                            <input
                                type="text"
                                id="last-name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={errors.lastName ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.lastName.placeholder')}
                            />
                            {errors.lastName && (
                                <span className="error-message">{errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="display-name">
                            {t('myAccount.accountDetails.form.displayName.label')}
                        </label>
                        <input
                            type="text"
                            id="display-name"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            className={errors.displayName ? 'error' : ''}
                            placeholder={t('myAccount.accountDetails.form.displayName.placeholder')}
                        />
                        <small>{t('myAccount.accountDetails.form.displayName.helper')}</small>
                        {errors.displayName && (
                            <span className="error-message">{errors.displayName}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="account-email">
                            {t('myAccount.accountDetails.form.email.label')}
                        </label>
                        <input
                            type="email"
                            id="account-email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                            placeholder={t('myAccount.accountDetails.form.email.placeholder')}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                </div>

                <fieldset className="password-fieldset">
                    <legend>{t('myAccount.accountDetails.sections.passwordSecurity')}</legend>
                    <p className="fieldset-description">
                        {t('myAccount.accountDetails.passwordSection.description')}
                    </p>

                    <div className="form-group">
                        <label htmlFor="current-password">
                            {t('myAccount.accountDetails.form.currentPassword.label')}
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                id="current-password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={errors.currentPassword ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.currentPassword.placeholder')}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('current')}
                                aria-label={
                                    showPasswords.current
                                        ? t('myAccount.accountDetails.actions.hidePassword')
                                        : t('myAccount.accountDetails.actions.showPassword')
                                }
                            >
                                {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <span className="error-message">{errors.currentPassword}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-password">
                            {t('myAccount.accountDetails.form.newPassword.label')}
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                id="new-password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={errors.newPassword ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.newPassword.placeholder')}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('new')}
                                aria-label={
                                    showPasswords.new
                                        ? t('myAccount.accountDetails.actions.hidePassword')
                                        : t('myAccount.accountDetails.actions.showPassword')
                                }
                            >
                                {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <small>{t('myAccount.accountDetails.form.newPassword.helper')}</small>
                        {errors.newPassword && (
                            <span className="error-message">{errors.newPassword}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">
                            {t('myAccount.accountDetails.form.confirmPassword.label')}
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                id="confirm-password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={errors.confirmPassword ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.confirmPassword.placeholder')}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('confirm')}
                                aria-label={
                                    showPasswords.confirm
                                        ? t('myAccount.accountDetails.actions.hidePassword')
                                        : t('myAccount.accountDetails.actions.showPassword')
                                }
                            >
                                {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>
                </fieldset>

                <div className="form-actions">
                    <button
                        type="submit"
                        className={`save-changes-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                {t('myAccount.accountDetails.actions.saving')}
                            </>
                        ) : (
                            t('myAccount.accountDetails.actions.saveChanges')
                        )}
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        {t('myAccount.accountDetails.actions.resetForm')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;