import { useState, useEffect } from 'react';
import { X, Star, Heart, MessageCircle, Send, Check } from 'lucide-react';
import './ReviewPopup.scss';
import { useLanguage } from '../../context/LanguageContext';

const ReviewPopup = ({ isOpen, onClose, orderNumber }) => {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState('review');
    const [formData, setFormData] = useState({
        platformRating: 0,
        comment: '',
        recommendScore: 0,
        recommendReason: '',
        feelingResponse: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [hoveredRecommend, setHoveredRecommend] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleStarClick = (rating) => {
        setFormData(prev => ({ ...prev, platformRating: rating }));
        if (errors.platformRating) {
            setErrors(prev => ({ ...prev, platformRating: '' }));
        }
    };

    const handleRecommendClick = (score) => {
        setFormData(prev => ({ ...prev, recommendScore: score }));
        if (errors.recommendScore) {
            setErrors(prev => ({ ...prev, recommendScore: '' }));
        }
    };

    const handleCommentChange = (e) => {
        setFormData(prev => ({ ...prev, comment: e.target.value }));
        if (errors.comment) {
            setErrors(prev => ({ ...prev, comment: '' }));
        }
    };

    const handleRecommendReasonChange = (e) => {
        setFormData(prev => ({ ...prev, recommendReason: e.target.value }));
        if (errors.recommendReason) {
            setErrors(prev => ({ ...prev, recommendReason: '' }));
        }
    };

    const handleFeelingResponseChange = (value) => {
        setFormData(prev => ({ ...prev, feelingResponse: value }));
        if (errors.feelingResponse) {
            setErrors(prev => ({ ...prev, feelingResponse: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.platformRating) {
            newErrors.platformRating = t('reviewPopup.validation.platformRating');
        }

        if (!formData.recommendScore) {
            newErrors.recommendScore = t('reviewPopup.validation.recommendRating');
        }

        if (formData.comment && formData.comment.length < 10) {
            newErrors.comment = t('reviewPopup.validation.commentTooShort');
        }

        if (!formData.recommendReason || formData.recommendReason.trim().length < 5) {
            newErrors.recommendReason = t('reviewPopup.validation.recommendReason');
        }

        if (!formData.feelingResponse) {
            newErrors.feelingResponse = t('reviewPopup.validation.feelingResponse');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setCurrentStep('thankyou');

            setTimeout(() => {
                onClose();
            }, 3000);
        }, 1500);
    };

    const handleSkip = () => {
        onClose();
    };

    const feelingOptions = [
        { value: 'very_disappointed', label: t('reviewPopup.feelingQuestion.options.veryDisappointed') },
        { value: 'somewhat_disappointed', label: t('reviewPopup.feelingQuestion.options.somewhatDisappointed') },
        { value: 'not_disappointed', label: t('reviewPopup.feelingQuestion.options.notDisappointed') },
        { value: 'na_no_longer_use', label: t('reviewPopup.feelingQuestion.options.naNoLongerUse') }
    ];

    if (!isOpen) return null;

    return (
        <div className="review-popup-overlay">
            <div className="review-popup">
                {currentStep === 'review' ? (
                    <>
                        <div className="popup-header">
                            <div className="header-content">
                                <div className="header-icon">
                                    <MessageCircle size={24} />
                                </div>
                                <div className="header-text">
                                    <h2>{t('reviewPopup.title')}</h2>
                                    <p>{t('reviewPopup.subtitle')}</p>
                                </div>
                            </div>
                            <button className="close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="popup-body">
                            <div className="question-section">
                                <h3>{t('reviewPopup.platformQuestion.title')}</h3>
                                {errors.platformRating && (
                                    <span className="error-message">{errors.platformRating}</span>
                                )}

                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            className={`star ${star <= (hoveredStar || formData.platformRating) ? 'active' : ''}`}
                                            onClick={() => handleStarClick(star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                        >
                                            <Star size={32} />
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    className="comment-input"
                                    placeholder={t('reviewPopup.platformQuestion.placeholder')}
                                    value={formData.comment}
                                    onChange={handleCommentChange}
                                    rows={3}
                                />
                                {errors.comment && (
                                    <span className="error-message">{errors.comment}</span>
                                )}
                            </div>

                            <div className="question-section">
                                <h3>{t('reviewPopup.recommendQuestion.title')}</h3>
                                <p className="question-subtitle">{t('reviewPopup.recommendQuestion.subtitle')}</p>
                                {errors.recommendScore && (
                                    <span className="error-message">{errors.recommendScore}</span>
                                )}

                                <div className="recommend-scale">
                                    <div className="scale-numbers">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                                            <button
                                                key={score}
                                                className={`scale-btn ${score <= (hoveredRecommend || formData.recommendScore) ? 'active' : ''}`}
                                                onClick={() => handleRecommendClick(score)}
                                                onMouseEnter={() => setHoveredRecommend(score)}
                                                onMouseLeave={() => setHoveredRecommend(0)}
                                            >
                                                {score}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="reason-input-section">
                                    <label className="reason-label">
                                        {t('reviewPopup.recommendQuestion.reasonLabel')}
                                    </label>
                                    <input
                                        type="text"
                                        className="reason-input"
                                        placeholder={t('reviewPopup.recommendQuestion.reasonPlaceholder')}
                                        value={formData.recommendReason}
                                        onChange={handleRecommendReasonChange}
                                    />
                                    {errors.recommendReason && (
                                        <span className="error-message">{errors.recommendReason}</span>
                                    )}
                                </div>
                            </div>

                            <div className="question-section">
                                <h3>{t('reviewPopup.feelingQuestion.title')}</h3>
                                <p className="question-subtitle">{t('reviewPopup.feelingQuestion.subtitle')}</p>
                                {errors.feelingResponse && (
                                    <span className="error-message">{errors.feelingResponse}</span>
                                )}

                                <div className="feeling-options">
                                    {feelingOptions.map((option, index) => (
                                        <button
                                            key={option.value}
                                            className={`feeling-option ${formData.feelingResponse === option.value ? 'selected' : ''}`}
                                            onClick={() => handleFeelingResponseChange(option.value)}
                                        >
                                            <span className="option-number">{index + 1}</span>
                                            <span className="option-text">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="popup-footer">
                            <button className="skip-btn" onClick={handleSkip}>
                                {t('reviewPopup.buttons.skip')}
                            </button>
                            <button
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="spinner"></div>
                                        {t('reviewPopup.buttons.submitting')}
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        {t('reviewPopup.buttons.submit')}
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="thankyou-content">
                            <div className="thankyou-icon">
                                <Check size={48} />
                            </div>
                            <h2>{t('reviewPopup.thankYouMessage.title')}</h2>
                            <p>{t('reviewPopup.thankYouMessage.message')}</p>
                            <button className="close-final-btn" onClick={onClose}>
                                {t('reviewPopup.thankYouMessage.close')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewPopup;