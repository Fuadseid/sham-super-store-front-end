import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './SixthHighlights.scss';
import laptop from '../../../assets/images/home/sixthHighlights/laptop.png';
import homeMade from '../../../assets/images/home/sixthHighlights/homeMade.png';
import baby from '../../../assets/images/home/sixthHighlights/baby.png';

export const SixthHighlights = () => {
    const { t, isRTL } = useLanguage();

    // This data will come from backend later - keeping structure ready
    const highlightsData = [
        {
            id: 1,
            title: "Best Sellers in Computers",
            image: laptop,
            alt: "Laptop",
            containerClass: "blue-container"
        },
        {
            id: 2,
            title: "Shop Homemade Products",
            image: homeMade,
            alt: "Homemade Products",
            containerClass: "orange-container"
        },
        {
            id: 3,
            title: "Baby Supplies",
            image: baby,
            alt: "Baby Supplies",
            containerClass: "blue-container"
        }
    ];

    return (
        <div className={`sixthHighlights-out-container ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className='sixthHighlights-container'>
                {highlightsData.map((item) => (
                    <div key={item.id} className={`product-out-container ${item.containerClass}`}>
                        <div className='product-left-container'>
                            <h3>{item.title}</h3>
                            <button>{t('home.sixthHighlights.shop')}</button>
                        </div>
                        <div className='product-right-container'>
                            <img
                                className='product-right-image'
                                src={item.image}
                                alt={item.alt}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SixthHighlights;