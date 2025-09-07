import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './OurNews.scss';
import laptop from '../../../assets/images/home/ourNews/laptop.jpg';
import room from '../../../assets/images/home/ourNews/room.jpg';
import man from '../../../assets/images/home/ourNews/man.jpg';

const OurNews = () => {
    const { t, isRTL } = useLanguage();

    // This data will come from backend later - keeping as is
    const newsData = [
        {
            id: 1,
            image: laptop,
            description: "We're proud to bring you a wide variety of products from trusted vendors—new sellers join us daily, so there's always something fresh to discover!"
        },
        {
            id: 2,
            image: room,
            description: "To our valued vendors: our mission is to become a one-stop shop for shoppers everywhere, giving your products maximum exposure to a growing customer base."
        },
        {
            id: 3,
            image: man,
            description: "To our dedicated delivery drivers: join a thriving team and enjoy great opportunities as part of our growing family."
        }
    ];

    return (
        <section className={`our-news-section ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="container">
                <h2 className="section-title">{t('home.ourNews.title')}</h2>
                <div className="news-cards">
                    {newsData.map((news) => (
                        <div key={news.id} className="news-card">
                            <div className="card-image">
                                <img src={news.image} alt={news.description} />
                            </div>
                            <div className="card-content">
                                <p className="card-description">{news.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurNews;