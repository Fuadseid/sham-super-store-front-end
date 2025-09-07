import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './FourthHighlights.scss';

export const FourthHighlights = () => {
    const { t, isRTL } = useLanguage();

    // This data will come from backend later - keeping structure ready
    const highlightsData = {
        leftSection: {
            title: "Up to 50% off",
            subtitle: "Items on Sale",
            backgroundImage: "left.jpg" // This will be full URL from backend
        },
        rightSection: {
            title: "Up to 50% off",
            subtitle: "Items on Sale",
            backgroundImage: "right.jpg" // This will be full URL from backend
        }
    };

    return (
        <div className={`fourthHighlights-out-container ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="fourthHighlights-container">
                <div className="product-out-container left-section">
                    <div className="content-overlay left-content">
                        <h2>{highlightsData.leftSection.title}</h2>
                        <h3>{highlightsData.leftSection.subtitle}</h3>
                        <button>
                            {t('home.fourthHighlights.shopNow')}
                        </button>
                    </div>
                </div>
                <div className="product-out-container right-section">
                    <div className="content-overlay right-content">
                        <h2>{highlightsData.rightSection.title}</h2>
                        <h3>{highlightsData.rightSection.subtitle}</h3>
                        <button>
                            {t('home.fourthHighlights.shopNow')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthHighlights;