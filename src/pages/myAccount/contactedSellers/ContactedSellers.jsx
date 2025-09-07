import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './ContactedSellers.scss';

const ContactedSellers = ({
    conversations = [],
    onViewConversation,
    onReplyToSeller,
    onContactSeller,
    onMarkAsRead,
    onDeleteConversation
}) => {
    const { t } = useLanguage();
    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            read: 'status-read',
            unread: 'status-unread',
            replied: 'status-replied',
            pending: 'status-pending'
        };

        return (
            <span className={`status-badge ${statusClasses[status] || 'status-unread'}`}>
                {t(`myAccount.contactedSellers.status.${status}`)}
            </span>
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onContactSeller) {
            onContactSeller(formData);
        }
        setFormData({ subject: '', message: '' });
        setShowContactForm(false);
    };

    const handleCancel = () => {
        setShowContactForm(false);
        setFormData({ subject: '', message: '' });
    };

    return (
        <div className="inquiries-content">
            <div className="inquiries-header">
                <h3>{t('myAccount.contactedSellers.title')}</h3>
                <button
                    className="contact-seller-btn"
                    onClick={() => setShowContactForm(!showContactForm)}
                >
                    {t('myAccount.contactedSellers.actions.contactSeller')}
                </button>
            </div>

            {showContactForm && (
                <div className="contact-seller-form">
                    <h4>{t('myAccount.contactedSellers.form.contactSeller.title')}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="subject">
                                {t('myAccount.contactedSellers.form.contactSeller.subject')}
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder={t('myAccount.contactedSellers.form.contactSeller.subjectPlaceholder')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                {t('myAccount.contactedSellers.form.contactSeller.message')}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={t('myAccount.contactedSellers.form.contactSeller.messagePlaceholder')}
                                rows="5"
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                {t('myAccount.contactedSellers.form.contactSeller.submitButton')}
                            </button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                {t('myAccount.contactedSellers.form.contactSeller.cancelButton')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="inquiries-table">
                {conversations.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.contactedSellers.table.headers.seller')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.subject')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.date')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversations.map((conversation) => (
                                <tr key={conversation.id} className={conversation.status === 'unread' ? 'unread-row' : ''}>
                                    <td className="seller-info">
                                        <div className="seller-details">
                                            <span className="seller-name">{conversation.sellerName}</span>
                                            {conversation.sellerRating && (
                                                <span className="seller-rating">⭐ {conversation.sellerRating}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="conversation-subject">
                                        <div className="subject-content">
                                            <span className="subject-text">{conversation.subject}</span>
                                            {getStatusBadge(conversation.status)}
                                        </div>
                                    </td>
                                    <td>{formatDate(conversation.lastMessageDate)}</td>
                                    <td>
                                        <div className="conversation-actions">
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => onViewConversation && onViewConversation(conversation.id)}
                                                title={t('myAccount.contactedSellers.actions.viewConversation')}
                                            >
                                                <span className="icon">👁</span>
                                                {t('myAccount.contactedSellers.actions.viewConversation')}
                                            </button>
                                            <button
                                                className="action-btn reply-btn"
                                                onClick={() => onReplyToSeller && onReplyToSeller(conversation.id)}
                                                title={t('myAccount.contactedSellers.actions.reply')}
                                            >
                                                <span className="icon">💬</span>
                                                {t('myAccount.contactedSellers.actions.reply')}
                                            </button>
                                            {conversation.status === 'unread' && (
                                                <button
                                                    className="action-btn read-btn"
                                                    onClick={() => onMarkAsRead && onMarkAsRead(conversation.id)}
                                                    title={t('myAccount.contactedSellers.actions.markAsRead')}
                                                >
                                                    <span className="icon">✓</span>
                                                    {t('myAccount.contactedSellers.actions.markAsRead')}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <h4>{t('myAccount.contactedSellers.emptyState.title')}</h4>
                        <p>{t('myAccount.contactedSellers.emptyState.description')}</p>
                    </div>
                )}

                {conversations.length === 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.contactedSellers.table.headers.seller')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.subject')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.date')}</th>
                                <th>{t('myAccount.contactedSellers.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4">{t('myAccount.contactedSellers.emptyState.message')}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ContactedSellers;