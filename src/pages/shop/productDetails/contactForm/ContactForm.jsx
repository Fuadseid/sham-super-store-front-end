import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import './ContactForm.scss';

export const ContactForm = () => {
    const { productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        productName: '',
        sku: '',
        customerName: '',
        customerEmail: '',
        subject: '',
        message: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Pre-populate form with product information from navigation state
    useEffect(() => {
        if (location.state) {
            setFormData(prev => ({
                ...prev,
                productName: location.state.productName || '',
                sku: location.state.sku || ''
            }));
        }
    }, [location.state]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Name is required';
        }
        
        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
            newErrors.customerEmail = 'Please enter a valid email address';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Inquiry submitted:', formData);
            
            setIsSubmitted(true);
            
            // Reset form after successful submission
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData(prev => ({
                    ...prev,
                    customerName: '',
                    customerEmail: '',
                    subject: '',
                    message: ''
                }));
            }, 3000);
            
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setErrors({ submit: 'Failed to submit inquiry. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        if (productId) {
            navigate(`/shop/product/${productId}`);
        } else {
            navigate('/shop');
        }
    };

    if (isSubmitted) {
        return (
            <div className="inquiry-form">
                <div className="inquiry-container">
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Inquiry Submitted Successfully!</h2>
                        <p>Thank you for your inquiry. We'll get back to you within 24 hours.</p>
                        <div className="success-actions">
                            <button className="back-btn" onClick={handleGoBack}>
                                Back to Product
                            </button>
                            <button className="new-inquiry-btn" onClick={() => setIsSubmitted(false)}>
                                New Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="inquiry-form">
            <div className="inquiry-container">
                <div className="inquiry-header">
                    <h1>Product Inquiry</h1>
                    <p>Have questions about this product? We're here to help!</p>
                </div>

                <form onSubmit={handleSubmit} className="inquiry-form-content">
                    {/* Product Information Section */}
                    <div className="product-info-section">
                        <h3>Product Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    readOnly
                                    className="readonly-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sku">SKU Number</label>
                                <input
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    value={formData.sku}
                                    readOnly
                                    className="readonly-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Customer Information Section */}
                    <div className="customer-info-section">
                        <h3>Your Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="customerName">
                                    Your Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    className={errors.customerName ? 'error' : ''}
                                    placeholder="Enter your full name"
                                />
                                {errors.customerName && (
                                    <span className="error-message">{errors.customerName}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerEmail">
                                    Email Address <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="customerEmail"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleInputChange}
                                    className={errors.customerEmail ? 'error' : ''}
                                    placeholder="Enter your email address"
                                />
                                {errors.customerEmail && (
                                    <span className="error-message">{errors.customerEmail}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Details Section */}
                    <div className="inquiry-details-section">
                        <h3>Inquiry Details</h3>
                        <div className="form-group">
                            <label htmlFor="subject">
                                Subject <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={errors.subject ? 'error' : ''}
                                placeholder="Brief description of your inquiry"
                            />
                            {errors.subject && (
                                <span className="error-message">{errors.subject}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">
                                Message <span className="required">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={errors.message ? 'error' : ''}
                                placeholder="Please provide detailed information about your inquiry..."
                                rows="6"
                            />
                            {errors.message && (
                                <span className="error-message">{errors.message}</span>
                            )}
                            <div className="character-count">
                                {formData.message.length} characters (minimum 10)
                            </div>
                        </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="submit-error">
                            {errors.submit}
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleGoBack}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Inquiry'
                            )}
                        </button>
                    </div>
                </form>

                {/* Help Section */}
                <div className="help-section">
                    <h4>Need immediate assistance?</h4>
                    <div className="contact-options">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Phone size={24} />
                            </div>
                            <div>
                                <strong>Call us:</strong>
                                <p>1-800-SUPPORT (24/7)</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <strong>Live Chat:</strong>
                                <p>Available Mon-Fri 9AM-6PM</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <strong>Email:</strong>
                                <p>support@shamsuperstore.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;