import { useState } from 'react';
import { Phone, Mail, Building, Facebook, Instagram, MessageCircle, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './ContactUs.scss';

const ContactUs = () => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-info-section">
                    <div className="contact-info-grid">
                        <a href={`tel:${t('contact.contactInfo.phone.number')}`} className="contact-info-card">
                            <div className="info-icon">
                                <Phone size={40} />
                            </div>
                            <h3 className="info-title">{t('contact.contactInfo.phone.number')}</h3>
                            <p className="info-subtitle">{t('contact.contactInfo.phone.hours')}</p>
                        </a>

                        <div className="contact-info-card">
                            <div className="info-icon">
                                <Mail size={40} />
                            </div>
                            <h3 className="info-title">{t('contact.contactInfo.email.address')}</h3>
                            <p className="info-subtitle">{t('contact.contactInfo.email.description')}</p>
                        </div>

                        <div className="contact-info-card">
                            <div className="info-icon">
                                <Building size={40} />
                            </div>
                            <h3 className="info-title">{t('contact.contactInfo.address.location')}</h3>
                            <p className="info-subtitle">{t('contact.contactInfo.address.description')}</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section">
                    <div className="form-header">
                        <h2 className="form-title">{t('contact.form.title')}</h2>
                        <p className="form-description">
                            {t('contact.form.description')}
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                {t('contact.form.fields.name.label')}
                                {t('contact.form.fields.name.required') && (
                                    <span className="required">{t('contact.form.requiredField')}</span>
                                )}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={t('contact.form.fields.name.placeholder')}
                                className="form-input"
                                required={t('contact.form.fields.name.required')}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('contact.form.fields.email.label')}
                                {t('contact.form.fields.email.required') && (
                                    <span className="required">{t('contact.form.requiredField')}</span>
                                )}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t('contact.form.fields.email.placeholder')}
                                className="form-input"
                                required={t('contact.form.fields.email.required')}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                {t('contact.form.fields.message.label')}
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={t('contact.form.fields.message.placeholder')}
                                className="form-textarea"
                                rows="6"
                            />
                        </div>

                        <button type="submit" className="form-submit-btn">
                            {t('contact.form.submitButton')}
                        </button>
                    </form>
                </div>

                <div className="social-media-section">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook" title={t('contact.socialMedia.facebook')}>
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="social-icon instagram" title={t('contact.socialMedia.instagram')}>
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="social-icon whatsapp" title={t('contact.socialMedia.whatsapp')}>
                            <MessageCircle size={24} />
                        </a>
                        <a href={`tel:${t('contact.contactInfo.phone.number')}`} className="social-icon phone" title={t('contact.socialMedia.phone')}>
                            <PhoneCall size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;