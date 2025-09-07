import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './SupportTickets.scss';

const SupportTickets = ({
    tickets = [],
    onCreateTicket,
    onViewTicket,
    onReplyToTicket,
    onCloseTicket
}) => {
    const { t } = useLanguage();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        priority: 'medium',
        category: 'general',
        description: ''
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            open: 'status-open',
            pending: 'status-pending',
            resolved: 'status-resolved',
            closed: 'status-closed',
            waiting: 'status-waiting'
        };

        return (
            <span className={`status-badge ${statusClasses[status] || 'status-open'}`}>
                {t(`myAccount.supportTickets.status.${status}`)}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const priorityClasses = {
            low: 'priority-low',
            medium: 'priority-medium',
            high: 'priority-high',
            urgent: 'priority-urgent'
        };

        return (
            <span className={`priority-badge ${priorityClasses[priority] || 'priority-medium'}`}>
                {t(`myAccount.supportTickets.priority.${priority}`)}
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
        if (onCreateTicket) {
            onCreateTicket(formData);
        }
        setFormData({
            subject: '',
            priority: 'medium',
            category: 'general',
            description: ''
        });
        setShowCreateForm(false);
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setFormData({
            subject: '',
            priority: 'medium',
            category: 'general',
            description: ''
        });
    };

    return (
        <div className="support-tickets-content">
            <h3>{t('myAccount.supportTickets.title')}</h3>

            <div className="tickets-header">
                <button
                    className="new-ticket-btn"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    <span className="icon">🎫</span>
                    {t('myAccount.supportTickets.actions.createNewTicket')}
                </button>
            </div>

            {showCreateForm && (
                <div className="create-ticket-form">
                    <h4>{t('myAccount.supportTickets.form.createTicket.title')}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="subject">
                                    {t('myAccount.supportTickets.form.createTicket.subject')}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder={t('myAccount.supportTickets.form.createTicket.subjectPlaceholder')}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority">
                                    {t('myAccount.supportTickets.form.createTicket.priority')}
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="low">{t('myAccount.supportTickets.priority.low')}</option>
                                    <option value="medium">{t('myAccount.supportTickets.priority.medium')}</option>
                                    <option value="high">{t('myAccount.supportTickets.priority.high')}</option>
                                    <option value="urgent">{t('myAccount.supportTickets.priority.urgent')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">
                                {t('myAccount.supportTickets.form.createTicket.category')}
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="technical">{t('myAccount.supportTickets.categories.technical')}</option>
                                <option value="billing">{t('myAccount.supportTickets.categories.billing')}</option>
                                <option value="account">{t('myAccount.supportTickets.categories.account')}</option>
                                <option value="orders">{t('myAccount.supportTickets.categories.orders')}</option>
                                <option value="general">{t('myAccount.supportTickets.categories.general')}</option>
                                <option value="feature">{t('myAccount.supportTickets.categories.feature')}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                {t('myAccount.supportTickets.form.createTicket.description')}
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder={t('myAccount.supportTickets.form.createTicket.descriptionPlaceholder')}
                                rows="5"
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                {t('myAccount.supportTickets.form.createTicket.submitButton')}
                            </button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>
                                {t('myAccount.supportTickets.form.createTicket.cancelButton')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="tickets-table">
                {tickets.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.supportTickets.table.headers.ticketId')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.subject')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.status')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.priority')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.lastUpdated')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className="ticket-id">#{ticket.id}</td>
                                    <td className="ticket-subject">{ticket.subject}</td>
                                    <td>{getStatusBadge(ticket.status)}</td>
                                    <td>{getPriorityBadge(ticket.priority)}</td>
                                    <td>{formatDate(ticket.lastUpdated)}</td>
                                    <td>
                                        <div className="ticket-actions">
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => onViewTicket && onViewTicket(ticket.id)}
                                                title={t('myAccount.supportTickets.actions.viewTicket')}
                                            >
                                                <span className="icon">👁</span>
                                                {t('myAccount.supportTickets.actions.viewTicket')}
                                            </button>
                                            {ticket.status !== 'closed' && (
                                                <button
                                                    className="action-btn reply-btn"
                                                    onClick={() => onReplyToTicket && onReplyToTicket(ticket.id)}
                                                    title={t('myAccount.supportTickets.actions.replyToTicket')}
                                                >
                                                    <span className="icon">💬</span>
                                                    {t('myAccount.supportTickets.actions.replyToTicket')}
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
                        <h4>{t('myAccount.supportTickets.emptyState.title')}</h4>
                        <p>{t('myAccount.supportTickets.emptyState.description')}</p>
                    </div>
                )}

                {tickets.length === 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.supportTickets.table.headers.ticketId')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.subject')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.status')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.priority')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.lastUpdated')}</th>
                                <th>{t('myAccount.supportTickets.table.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="6">{t('myAccount.supportTickets.emptyState.message')}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SupportTickets;