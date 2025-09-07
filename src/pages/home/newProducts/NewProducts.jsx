import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';
import './NewProducts.scss';

const NewProducts = () => {
    const { t, isRTL } = useLanguage();
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // This data will come from backend later - keeping as is
    const products = [
        {
            id: 1,
            name: 'Sunt explicabo',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop',
            oldPrice: 700.00,
            currentPrice: 550.00
        },
        {
            id: 2,
            name: 'Architecto beatae',
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop',
            oldPrice: 400.00,
            currentPrice: 350.00
        },
        {
            id: 3,
            name: 'Neque porro',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
            currentPrice: 800.00
        },
        {
            id: 4,
            name: 'Morbi pulvinar augue lorem',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
            oldPrice: 78.00,
            currentPrice: 49.00
        },
        {
            id: 5,
            name: 'Gustone',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop',
            currentPrice: 400.00
        },
        {
            id: 6,
            name: 'Quisgqwe',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop',
            currentPrice: 800.00
        },
        {
            id: 7,
            name: 'Eratcelerisqu',
            image: 'https://images.unsplash.com/photo-1549298916-acc5c5f7b546?w=150&h=150&fit=crop',
            currentPrice: 310.00
        },
        {
            id: 8,
            name: 'Extra Product',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
            oldPrice: 120.00,
            currentPrice: 89.00
        },
        {
            id: 9,
            name: 'Another Product',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=150&fit=crop',
            currentPrice: 250.00
        }
    ];

    const StoreIcon = () => (
        <svg className="store-icon" viewBox="0 0 24 24">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
        </svg>
    );

    const ChevronLeft = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const ChevronRight = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    const handlePrevClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className="new-products-section">
            <div className={isRTL ? 'rtl' : 'ltr'}>
                <h2 className="section-title">{t('home.newProducts.title')}</h2>
            </div>

            <div className="products-swiper-container">
                {/* Custom Previous Button */}
                <button
                    className="custom-nav-button prev-button"
                    onClick={handlePrevClick}
                    disabled={isBeginning}
                    aria-label={t('home.newProducts.navigation.previousSlide')}
                >
                    <ChevronLeft />
                </button>

                {/* Custom Next Button */}
                <button
                    className="custom-nav-button next-button"
                    onClick={handleNextClick}
                    disabled={isEnd}
                    aria-label={t('home.newProducts.navigation.nextSlide')}
                >
                    <ChevronRight />
                </button>

                <Swiper
                    modules={[Navigation]}
                    slidesPerView={2}
                    spaceBetween={15}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        }
                    }}
                    loop={false}
                    watchOverflow={true}
                    className={`products-swiper ${isRTL ? 'rtl-swiper' : ''}`}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-item">
                                <div className="product-image-container">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="store-icon-overlay">
                                        <StoreIcon />
                                    </div>
                                </div>

                                <div className="product-name">{product.name}</div>

                                <div className="product-pricing">
                                    {product.oldPrice ? (
                                        <>
                                            <span className="old-price">
                                                {formatPrice(product.oldPrice)}
                                            </span>
                                            <span className="current-price">
                                                {formatPrice(product.currentPrice)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="price-only">
                                            {formatPrice(product.currentPrice)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NewProducts;