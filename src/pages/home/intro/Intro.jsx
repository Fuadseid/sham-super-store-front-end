import { useState, useEffect, useRef } from 'react';
import './Intro.scss';
import { useLanguage } from '../../../context/LanguageContext';
import intro1 from '../../../assets/images/home/intro/intro1.png';
import intro2 from '../../../assets/images/home/intro/intro2.png';
import intro3 from '../../../assets/images/home/intro/intro3.png';
import intro4 from '../../../assets/images/home/intro/intro4.png';
import { useGetMyintroBannerQuery } from '../../../stores/apiSlice';
import { useSelector } from 'react-redux';

export const Intro = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const totalSlides = 4;
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef(null);
  const {data:getBannerintro,isLoading:introLoading} = useGetMyintroBannerQuery();
  const {media_url} = useSelector((state)=>state.auth)
  const banner = getBannerintro?.data;
  const [intro, setIntro] =useState([]);
  

  useEffect(()=>{
    if(banner){
    setIntro(banner);
    }
  },[banner])

  // This data will come from backend later - keeping as is
  const slides = [
    {
      id: 1,
      type: 'orange',
      image: intro1,
      alt: 'Trendy Bag',
      label: 'Your Everyday Style and Comfort',
      title: 'Casual Collection'
    },
    {
      id: 2,
      type: 'blue',
      image: intro2,
      alt: 'Designer Handbag',
      label: 'Spring and Summer 2025',
      title: 'Men\'s Fashion'
    },
    {
      id: 3,
      type: 'orange',
      image: intro3,
      alt: 'Vintage Bag',
      label: 'Accessories Collection',
      title: 'New Trendy Bags'
    },
    {
      id: 4,
      type: 'blue',
      image: intro4,
      alt: 'Modern Bag',
      label: 'Spring and Summer 2025',
      title: 'Women\'s Fashion'
    }
  ];

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (autoplayEnabled) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    resetAutoplay();
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoplay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      previousSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (touchStartX.current === 0) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = 0;
      touchEndX.current = 0;
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      previousSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplayEnabled]);

  const handleMouseEnter = () => {
    setAutoplayEnabled(false);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setAutoplayEnabled(true);
    resetAutoplay();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div
      className="swiper-container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="swiper-slides">
        {intro.map((slide, index) => (
          <div
            key={slide.id}
            className={`swiper-slide ${currentSlide%2?'blue':'orange'} ${index === currentSlide ? 'active' : ''
              } ${index === currentSlide - 1 || (currentSlide === 0 && index === totalSlides - 1) ? 'prev' : ''}`}
          >
            <div className="slide-content">
              <div className="slide-image">
                <img src={slide.image_url?media_url+slide.image_url:"placeholder.png"} alt={slide.alt} />
              </div>
              <div className="slide-text">
                <div className="collection-label">{slide.short_description}</div>
                <h1 className="main-title">{slide.title}</h1>
                <button className="shop-button">
                  {t('home.intro.buttons.shopAccessories')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="swiper-nav swiper-nav-prev"
        onClick={previousSlide}
        aria-label={t('home.intro.navigation.previousSlide')}
      >
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
      <div
        className="swiper-nav swiper-nav-next"
        onClick={nextSlide}
        aria-label={t('home.intro.navigation.nextSlide')}
      >
        <svg viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>

      <div className="swiper-pagination">
        {intro.map((_, index) => (
          <div
            key={index}
            className={`pagination-bullet ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;