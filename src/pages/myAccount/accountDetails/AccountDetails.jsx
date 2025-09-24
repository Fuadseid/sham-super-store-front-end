import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './AccountDetails.scss';
import { useChangePasswordMutation, useGetUserDetailsQuery, useUpdateUserDetailsMutation } from '../../../stores/apiSlice';

const AccountDetails = () => {
    const { t } = useLanguage();
    const { data: userData, refetch } = useGetUserDetailsQuery();
    const [updateProfile] = useUpdateUserDetailsMutation();
    const [changePassword] = useChangePasswordMutation();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        profile: '',
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
    const [successMessage, setSuccessMessage] = useState('');
    const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'password'

    // Initialize form data when user data is loaded
    useEffect(() => {
        if (userData?.data) {
            const user = userData.data;
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                profile: user.profile || ''
            }));
        }
    }, [userData]);

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

        // Clear success message when form changes
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateProfileForm = () => {
        const newErrors = {};

        // Basic validation for required fields
        if (!formData.name.trim()) {
            newErrors.name = t('myAccount.accountDetails.validation.nameRequired');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('myAccount.accountDetails.validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('myAccount.accountDetails.validation.emailInvalid');
        }

        // Phone validation (optional but if provided, validate format)
        if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = t('myAccount.accountDetails.validation.phoneInvalid');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePasswordForm = () => {
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = t('myAccount.accountDetails.validation.currentPasswordRequired');
        }

        if (!formData.newPassword) {
            newErrors.newPassword = t('myAccount.accountDetails.validation.newPasswordRequired');
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = t('myAccount.accountDetails.validation.passwordMinLength');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('myAccount.accountDetails.validation.confirmPasswordRequired');
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = t('myAccount.accountDetails.validation.passwordMismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileUpdate = async () => {
        if (!validateProfileForm()) {
            return false;
        }

        try {
            // Prepare data for API call
            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                profile: formData.profile
            };

            // Remove empty fields to avoid sending null/empty values if not needed
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === '' || updateData[key] === null) {
                    delete updateData[key];
                }
            });

            // Call the update mutation
            const result = await updateProfile(updateData).unwrap();

            if (result.success) {
                setSuccessMessage(t('myAccount.accountDetails.messages.updateSuccess'));
                await refetch();
                return true;
            } else {
                throw new Error(result.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            
            // Handle API validation errors
            if (error.data && error.data.errors) {
                const apiErrors = error.data.errors;
                const formattedErrors = {};
                
                Object.keys(apiErrors).forEach(key => {
                    formattedErrors[key] = apiErrors[key][0];
                });
                
                setErrors(formattedErrors);
            } else {
                setErrors({ 
                    submit: error.data?.message || t('myAccount.accountDetails.messages.updateError') 
                });
            }
            return false;
        }
    };

    const handlePasswordChange = async () => {
        if (!validatePasswordForm()) {
            return false;
        }

        try {
            const passwordData = {
                current_password: formData.currentPassword,
                new_password: formData.newPassword
            };

            const result = await changePassword(passwordData).unwrap();

            if (result.success) {
                setSuccessMessage(t('myAccount.accountDetails.messages.passwordChangeSuccess'));
                
                // Reset password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
                return true;
            } else {
                throw new Error(result.message || 'Password change failed');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            
            // Handle specific password errors
            if (error.data?.message === 'Current password is incorrect') {
                setErrors({ 
                    currentPassword: t('myAccount.accountDetails.validation.incorrectCurrentPassword')
                });
            } else if (error.data && error.data.errors) {
                const apiErrors = error.data.errors;
                const formattedErrors = {};
                
                Object.keys(apiErrors).forEach(key => {
                    if (key === 'current_password') {
                        formattedErrors.currentPassword = apiErrors[key][0];
                    } else if (key === 'new_password') {
                        formattedErrors.newPassword = apiErrors[key][0];
                    } else {
                        formattedErrors[key] = apiErrors[key][0];
                    }
                });
                
                setErrors(formattedErrors);
            } else {
                setErrors({ 
                    submit: error.data?.message || t('myAccount.accountDetails.messages.passwordChangeError') 
                });
            }
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            let success = false;
            
            if (activeSection === 'profile') {
                success = await handleProfileUpdate();
            } else if (activeSection === 'password') {
                success = await handlePasswordChange();
            }

            if (success) {
                // Clear errors on success
                setErrors({});
            }

        } catch (error) {
            console.error('Error in form submission:', error);
            setErrors({ 
                submit: t('myAccount.accountDetails.messages.generalError') 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        // Reset form to original user data
        if (userData?.data) {
            const user = userData.data;
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                profile: user.profile || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        }
        setErrors({});
        setSuccessMessage('');
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setErrors({});
        setSuccessMessage('');
    };

    return (
        <div className="account-details-content">
            <div className="section-header">
                <h3>{t('myAccount.accountDetails.title')}</h3>
                <p>{t('myAccount.accountDetails.description')}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="account-sections-tabs">
                <button 
                    className={`tab-button ${activeSection === 'profile' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('profile')}
                >
                    {t('myAccount.accountDetails.sections.profile')}
                </button>
                <button 
                    className={`tab-button ${activeSection === 'password' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('password')}
                >
                    {t('myAccount.accountDetails.sections.password')}
                </button>
            </div>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {errors.submit && (
                <div className="error-message submit-error">
                    {errors.submit}
                </div>
            )}

            <form className="account-form" onSubmit={handleSubmit}>
                {/* Profile Section */}
                {activeSection === 'profile' && (
                    <div className="form-section">
                        <h4>{t('myAccount.accountDetails.sections.personalInfo')}</h4>

                        <div className="form-group">
                            <label htmlFor="name">
                                {t('myAccount.accountDetails.form.name.label')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.name.placeholder')}
                            />
                            {errors.name && (
                                <span className="error-message">{errors.name}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                {t('myAccount.accountDetails.form.email.label')}
                            </label>
                            <input
                                type="email"
                                id="email"
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

                        <div className="form-group">
                            <label htmlFor="phone">
                                {t('myAccount.accountDetails.form.phone.label')}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={errors.phone ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.phone.placeholder')}
                            />
                            {errors.phone && (
                                <span className="error-message">{errors.phone}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="profile">
                                {t('myAccount.accountDetails.form.profile.label')}
                            </label>
                            <input
                                type="text"
                                id="profile"
                                name="profile"
                                value={formData.profile}
                                onChange={handleInputChange}
                                className={errors.profile ? 'error' : ''}
                                placeholder={t('myAccount.accountDetails.form.profile.placeholder')}
                            />
                            <small>{t('myAccount.accountDetails.form.profile.helper')}</small>
                            {errors.profile && (
                                <span className="error-message">{errors.profile}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Password Section */}
                {activeSection === 'password' && (
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
                )}

                <div className="form-actions">
                    <button
                        type="submit"
                        className={`save-changes-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                {activeSection === 'profile' 
                                    ? t('myAccount.accountDetails.actions.saving')
                                    : t('myAccount.accountDetails.actions.changingPassword')
                                }
                            </>
                        ) : (
                            activeSection === 'profile'
                                ? t('myAccount.accountDetails.actions.saveChanges')
                                : t('myAccount.accountDetails.actions.changePassword')
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