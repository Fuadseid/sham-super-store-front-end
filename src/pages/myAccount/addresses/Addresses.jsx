import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './Addresses.scss';

const Addresses = ({
    billingAddress = null,
    shippingAddress = null,
    onEditAddress,
    onSaveAddress
}) => {
    const { t } = useLanguage();
    const [showAddForm, setShowAddForm] = useState(false);
    const [addressType, setAddressType] = useState('billing');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        street: '',
        buildingNumber: '',
        floor: '',
        city: '',
        phone: '',
        description: '',
        setAsDefault: false
    });
    const [errors, setErrors] = useState({});

    const formatAddress = (address) => {
        if (!address) return null;

        const parts = [
            address.firstName && address.lastName ? `${address.firstName} ${address.lastName}` : '',
            address.company || '',
            address.street || '',
            address.buildingNumber || '',
            address.floor ? `Floor: ${address.floor}` : '',
            [address.city].filter(Boolean).join(', '),
            address.country || '',
            address.phone ? `${t('myAccount.addresses.form.phone')}: ${address.phone}` : '',
            address.description || ''
        ].filter(Boolean);

        return parts;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['firstName', 'lastName', 'country', 'street', 'city', 'phone'];

        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = t('myAccount.addresses.validation.required');
            }
        });

        if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
            newErrors.phone = t('myAccount.addresses.validation.invalidPhone');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (onSaveAddress) {
            onSaveAddress(addressType, formData);
        }

        setFormData({
            firstName: '',
            lastName: '',
            company: '',
            country: '',
            street: '',
            buildingNumber: '',
            floor: '',
            city: '',
            phone: '',
            description: '',
            setAsDefault: false
        });
        setShowAddForm(false);
    };

    const handleAddAddress = (type) => {
        setAddressType(type);
        setShowAddForm(true);
        setErrors({});
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setFormData({
            firstName: '',
            lastName: '',
            company: '',
            country: '',
            street: '',
            buildingNumber: '',
            floor: '',
            city: '',
            phone: '',
            description: '',
            setAsDefault: false
        });
        setErrors({});
    };

    const AddressCard = ({ type, address, title }) => {
        const formattedAddress = formatAddress(address);

        return (
            <div className="address-card">
                <div className="address-header">
                    <h4>{title}</h4>
                    <a
                        href="#"
                        className="edit-link"
                        onClick={(e) => {
                            e.preventDefault();
                            if (address) {
                                onEditAddress && onEditAddress(type, address);
                            } else {
                                handleAddAddress(type);
                            }
                        }}
                    >
                        {address ? t('myAccount.addresses.actions.edit') : t('myAccount.addresses.actions.edit')}
                    </a>
                </div>
                <div className="address-info">
                    {formattedAddress && formattedAddress.length > 0 ? (
                        <div className="address-details">
                            {formattedAddress.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                            {address.isDefault && (
                                <span className="default-badge">
                                    {t('myAccount.addresses.actions.setDefault')}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="empty-address">
                            <p>{t('myAccount.addresses.emptyState.message')}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="addresses-content">
            <h3>{t('myAccount.addresses.title')}</h3>
            <p>{t('myAccount.addresses.description')}</p>

            <div className="address-cards">
                <AddressCard
                    type="billing"
                    address={billingAddress}
                    title={t('myAccount.addresses.types.billing')}
                />
                <AddressCard
                    type="shipping"
                    address={shippingAddress}
                    title={t('myAccount.addresses.types.shipping')}
                />
            </div>

            {showAddForm && (
                <div className="add-address-form">
                    <h4>{t('myAccount.addresses.form.title')}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName">
                                    {t('myAccount.addresses.form.firstName')}
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && (
                                    <span className="error-message">{errors.firstName}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">
                                    {t('myAccount.addresses.form.lastName')}
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && (
                                    <span className="error-message">{errors.lastName}</span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="company">
                                    {t('myAccount.addresses.form.company')}
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">
                                    {t('myAccount.addresses.form.country')}
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className={errors.country ? 'error' : ''}
                                />
                                {errors.country && (
                                    <span className="error-message">{errors.country}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="street">
                                    {t('myAccount.addresses.form.street')}
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className={errors.street ? 'error' : ''}
                                />
                                {errors.street && (
                                    <span className="error-message">{errors.street}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="buildingNumber">
                                    {t('myAccount.addresses.form.buildingNumber')}
                                </label>
                                <input
                                    type="text"
                                    id="buildingNumber"
                                    name="buildingNumber"
                                    value={formData.buildingNumber}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="floor">
                                    {t('myAccount.addresses.form.floor')}
                                </label>
                                <input
                                    type="text"
                                    id="floor"
                                    name="floor"
                                    value={formData.floor}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">
                                    {t('myAccount.addresses.form.city')}
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && (
                                    <span className="error-message">{errors.city}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">
                                    {t('myAccount.addresses.form.phone')}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && (
                                    <span className="error-message">{errors.phone}</span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="description">
                                    {t('myAccount.addresses.form.description')}
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="setAsDefault"
                                        checked={formData.setAsDefault}
                                        onChange={handleInputChange}
                                    />
                                    {t('myAccount.addresses.form.setAsDefault')}
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn">
                                {t('myAccount.addresses.actions.save')}
                            </button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                {t('myAccount.addresses.actions.cancel')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Addresses;