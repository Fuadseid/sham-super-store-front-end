import { useLanguage } from '../../../context/LanguageContext';
import './FifthHighlights.scss';
import kitchen from '../../../assets/images/home/fifthHighlights/kitchen.png'
import DIY from '../../../assets/images/home/fifthHighlights/DIY.png'
import girl from '../../../assets/images/home/fifthHighlights/girl.png'

const FifthHighlights = () => {
    const { t, isRTL } = useLanguage();

    // This data will come from backend later - keeping structure ready
    const highlightsData = {
        topLeft: {
            subtitle: "Smart Technology",
            title: "Latest Gadgets",
            image: kitchen,
            alt: "Smart Technology"
        },
        bottomLeft: {
            subtitle: "Home Essentials",
            title: "Comfort Living",
            image: DIY,
            alt: "Home Essentials"
        },
        rightLarge: {
            subtitle: "Premium Collection",
            title: "Luxury Fashion",
            image: girl,
            alt: "Premium Collection"
        }
    };

    return (
        <div className={`fifth-highlights-wrapper ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="fifth-highlights-main">
                <div className="fifth-left-column">
                    <div className="fifth-card-container fifth-top-left">
                        <div className="fifth-content-area">
                            <h5>{highlightsData.topLeft.subtitle}</h5>
                            <h3>{highlightsData.topLeft.title}</h3>
                            <button>{t('home.fifthHighlights.shop')}</button>
                        </div>
                        <div className="fifth-image-area">
                            <img
                                src={highlightsData.topLeft.image}
                                alt={highlightsData.topLeft.alt}
                                className="fifth-product-image"
                            />
                        </div>
                    </div>

                    <div className="fifth-card-container fifth-bottom-left">
                        <div className="fifth-content-area">
                            <h5>{highlightsData.bottomLeft.subtitle}</h5>
                            <h3>{highlightsData.bottomLeft.title}</h3>
                            <button>{t('home.fifthHighlights.shop')}</button>
                        </div>
                        <div className="fifth-image-area">
                            <img
                                src={highlightsData.bottomLeft.image}
                                alt={highlightsData.bottomLeft.alt}
                                className="fifth-product-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="fifth-card-container fifth-right-large">
                    <div className="fifth-content-area">
                        <h5>{highlightsData.rightLarge.subtitle}</h5>
                        <h3>{highlightsData.rightLarge.title}</h3>
                        <button>{t('home.fifthHighlights.shop')}</button>
                    </div>
                    <div className="fifth-image-area">
                        <img
                            src={highlightsData.rightLarge.image}
                            alt={highlightsData.rightLarge.alt}
                            className="fifth-product-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FifthHighlights;