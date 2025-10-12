import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';
import './BestSellerGardenSupplies.scss';
import { useSelector } from 'react-redux';
import { useGetbestSellerQuery } from '../../../stores/apiSlice';
import { useNavigate } from 'react-router-dom';

const BestSellerGardenSupplies = () => {
    const { t, isRTL } = useLanguage();
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
  const { media_url } = useSelector((state) => state.auth);
  const [bestsellerdata, setBestSellerData] = useState([]);
  const navigate = useNavigate();
  const {
    data: bestselling,
    isLoading: loadbestselling,
    isError,
  } = useGetbestSellerQuery();
  const bestSeller = bestselling?.data.config[9]?.products;

  useEffect(() => {
    if (bestSeller) {
      setBestSellerData(bestSeller);
    }
  }, [bestSeller]);
  console.log("bestSeller", bestsellerdata);
    // This data will come from backend later - keeping as is
  /*   const products = [
        {
            id: 1,
            name: 'Designer Leather Handbag',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&h=150&fit=crop',
            oldPrice: 299.00,
            currentPrice: 199.00,
            isOnSale: true
        },
        {
            id: 2,
            name: 'Classic Running Shoes',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop',
            oldPrice: 150.00,
            currentPrice: 89.00,
            isOnSale: true
        },
        {
            id: 3,
            name: 'Elegant Diamond Earrings',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop',
            currentPrice: 450.00,
            isOnSale: false
        },
        {
            id: 4,
            name: 'Cotton Summer Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop',
            oldPrice: 120.00,
            currentPrice: 75.00,
            isOnSale: true
        },
        {
            id: 5,
            name: 'Luxury Watch',
            image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=150&h=150&fit=crop',
            currentPrice: 899.00,
            isOnSale: false
        },
        {
            id: 6,
            name: 'Casual Sneakers',
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150&h=150&fit=crop',
            oldPrice: 89.00,
            currentPrice: 59.00,
            isOnSale: true
        },
        {
            id: 7,
            name: 'Pearl Necklace',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop',
            currentPrice: 320.00,
            isOnSale: false
        },
        {
            id: 8,
            name: 'Leather Jacket',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop',
            oldPrice: 250.00,
            currentPrice: 180.00,
            isOnSale: true
        },
        {
            id: 9,
            name: 'High Heel Pumps',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop',
            currentPrice: 145.00,
            isOnSale: false
        }
    ]; */

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
        <div className="best-sellers-section">
            <div className={isRTL ? 'rtl' : 'ltr'}>
                <h2 className="section-title">{t('home.bestSellerGardenSupplies.title')}</h2>
            </div>

            <div className="products-swiper-container">
                <button
                    className="custom-nav-button prev-button"
                    onClick={handlePrevClick}
                    disabled={isBeginning}
                    aria-label={t('home.bestSellerGardenSupplies.navigation.previousSlide')}
                >
                    <ChevronLeft />
                </button>
                <button
                    className="custom-nav-button next-button"
                    onClick={handleNextClick}
                    disabled={isEnd}
                    aria-label={t('home.bestSellerGardenSupplies.navigation.nextSlide')}
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
                    {bestsellerdata.map((product) => (
                        <SwiperSlide
                        onClick={()=>navigate(`/shop/product/${product.id}`)}
                        key={product.id}>
                            <div className="product-item">
                                <div className="product-image-container">
                                    <img
                                        src={media_url+product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />

                                    {product.is_on_sale && (
                                        <div className="sale-banner">
                                            <span>{t('home.bestSellerGardenSupplies.sale')}</span>
                                        </div>
                                    )}

                                    <div className="store-icon-overlay">
                                        <StoreIcon />
                                    </div>
                                </div>

                                <div className="product-name">{product.name}</div>

                                <div className="product-pricing">
                                    {product.is_on_sale ? (
                                        <>
                                            <span className="old-price">
                                                {formatPrice(Number(product.regular_price))}
                                            </span>
                                            <span className="current-price">
                                                {formatPrice(Number(product.on_sale_price))}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="price-only">
                                            {formatPrice(Number(product.regular_price))}
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

export default BestSellerGardenSupplies;